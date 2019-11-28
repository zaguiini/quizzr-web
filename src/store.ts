import { QuizDifficulty, transformQuizQuestion, fetchQuiz } from './service'
import {
  createStore,
  createTypedHooks,
  Thunk,
  Action,
  action,
  thunk,
  computed,
  Computed,
} from 'easy-peasy'
import axios from 'axios'
import get from 'lodash/get'
import noop from 'lodash/noop'
import setWith from 'lodash/setWith'
import map from 'lodash/map'

export interface QuizQuestion {
  id: string
  question: string
  answer?: boolean
  correctAnswer: boolean
}

export interface Quiz {
  data?: {
    difficulty: QuizDifficulty
    questions: QuizQuestion[]
  }
  error?: string
  isLoading: boolean
}

interface StoreData {
  currentQuizDifficulty: QuizDifficulty
  ongoingQuiz?: string
  currentQuestion: Computed<StoreData, number>
  rightAnswers: Computed<StoreData, number>
  totalQuestions: Computed<StoreData, number>
  quizzes: {
    history: {
      [id: string]: Quiz
    }
  }
}

interface StoreActions {
  setQuizDifficulty: Action<StoreData, QuizDifficulty>
  setOngoingQuiz: Action<StoreData, string | undefined>
  quizzes: {
    setLoading: Action<StoreData['quizzes'], { id: string; isLoading: boolean }>
    setError: Action<StoreData['quizzes'], { id: string; error?: string }>
    setQuiz: Action<
      StoreData['quizzes'],
      {
        id: string
        data: { questions: QuizQuestion[]; difficulty: QuizDifficulty }
      }
    >
    setAnswer: Action<
      StoreData['quizzes'],
      {
        quizId: string
        questionId: string
        answer: boolean
      }
    >
    deleteQuiz: Action<StoreData['quizzes'], { id: string }>
    fetchQuiz: Thunk<
      StoreData['quizzes'] & StoreActions['quizzes'],
      { id: string; difficulty: QuizDifficulty },
      any,
      StoreData['quizzes']
    >
  }
}

type StoreModel = StoreData & StoreActions

const model: StoreModel = {
  currentQuizDifficulty: QuizDifficulty.EASY,
  setQuizDifficulty: action((state, difficulty) => {
    state.currentQuizDifficulty = difficulty
  }),

  setOngoingQuiz: action((state, id) => {
    state.ongoingQuiz = id
  }),

  currentQuestion: computed((store) => {
    const quiz = get(
      store,
      `quizzes.history.${store.ongoingQuiz}.data.questions`
    ) as QuizQuestion[]

    if (!quiz) {
      return 0
    }

    return quiz.findIndex((question) => question.answer === undefined) + 1
  }),

  rightAnswers: computed((store) => {
    const quiz = get(
      store,
      `quizzes.history.${store.ongoingQuiz}.data.questions`,
      []
    ) as QuizQuestion[]

    if (!quiz) {
      return 0
    }

    return quiz.filter((i) => i.answer === i.correctAnswer).length
  }),

  totalQuestions: computed((store) => {
    const quiz = get(
      store,
      `quizzes.history.${store.ongoingQuiz}.data.questions`,
      []
    ) as QuizQuestion[]

    if (!quiz) {
      return 0
    }

    return quiz.length
  }),

  quizzes: {
    history: {},

    deleteQuiz: action((state, { id }) => {
      delete state.history[id]
    }),

    setAnswer: action((state, { quizId, questionId, answer }) => {
      setWith(
        state,
        `history.${quizId}.data.questions.${questionId}.answer`,
        answer,
        Object
      )
    }),

    setQuiz: action((state, { id, data }) => {
      setWith(state, `history.${id}.data.difficulty`, data.difficulty, Object)
      setWith(state, `history.${id}.data.questions`, data.questions, Object)
    }),

    setError: action((state, { id, error }) => {
      setWith(state, `history.${id}.error`, error, Object)
    }),

    setLoading: action((state, { id, isLoading }) => {
      setWith(state, `history.${id}.isLoading`, isLoading, Object)
    }),

    fetchQuiz: thunk((dispatch, { id, difficulty }, { getState }) => {
      const { history } = getState()

      if (get(history, id)) {
        return noop
      }

      dispatch.setQuiz({
        id,
        data: {
          difficulty,
          questions: [],
        },
      })

      const cancellationToken = axios.CancelToken.source()

      async function fetchData() {
        dispatch.setError({ id, error: undefined })
        dispatch.setLoading({ id, isLoading: true })

        try {
          const data = await fetchQuiz({ difficulty, cancellationToken })

          if (data.response_code !== 0) {
            throw new Error(
              `Invalid response code from API: ${data.response_code}`
            )
          }

          dispatch.setQuiz({
            id,
            data: {
              difficulty,
              // TODO: there's probably a better way to do that with normalizr
              // but my time here is short so i'm going to waste it with tat
              questions: map(data.results, transformQuizQuestion),
            },
          })
        } catch (e) {
          if (!get(e, 'token.reason.__CANCEL__')) {
            console.error(e)
            dispatch.setError({ id, error: 'Something wrong happened!' })
          }
        } finally {
          dispatch.setLoading({ id, isLoading: false })
        }
      }

      fetchData()

      return () => {
        cancellationToken.cancel()
      }
    }),
  },
}

export const store = createStore(model)

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState
