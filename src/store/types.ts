import { Thunk, Action } from 'easy-peasy'

export interface QuizQuestion {
  question: string
  answer?: boolean
  correctAnswer: boolean
}

export interface Quiz {
  data?: {
    questions: QuizQuestion[]
  }
  error?: string
  isLoading: boolean
}

interface StoreData {
  currentQuiz?: string
  quizzes: {
    history: {
      [id: string]: Quiz
    }
  }
}

interface StoreActions {
  setCurrentQuiz: Action<StoreData, string | undefined>
  quizzes: {
    setLoading: Action<StoreData['quizzes'], { id: string; isLoading: boolean }>
    setError: Action<StoreData['quizzes'], { id: string; error?: string }>
    setQuiz: Action<
      StoreData['quizzes'],
      {
        id: string
        data: { questions: QuizQuestion[] }
      }
    >
    setAnswer: Action<
      StoreData['quizzes'],
      {
        quizId: string
        questionId: number
        answer: boolean
      }
    >
    deleteQuiz: Action<StoreData['quizzes'], { id: string }>
    fetchQuiz: Thunk<
      StoreData['quizzes'] & StoreActions['quizzes'],
      { id: string },
      any,
      StoreData
    >
  }
}

export type StoreModel = StoreData & StoreActions
