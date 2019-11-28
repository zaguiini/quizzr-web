import { StoreModel } from './types'
import { transformQuizQuestion, fetchQuiz } from '../service'
import { createStore, createTypedHooks, action, thunk } from 'easy-peasy'
import axios from 'axios'
import get from 'lodash/get'
import noop from 'lodash/noop'
import setWith from 'lodash/setWith'
import map from 'lodash/map'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const model: StoreModel = {
  setCurrentQuiz: action((state, id) => {
    state.currentQuiz = id
  }),

  quizzes: {
    history: {},

    deleteQuiz: action((state, { id }) => {
      delete state.history[id]
    }),

    setAnswer: action((state, { quizId, questionId, answer }) => {
      state.history[quizId].data!.questions[questionId].answer = answer
    }),

    setQuiz: action((state, { id, data }) => {
      setWith(state, `history.${id}.data`, data, Object)
    }),

    setError: action((state, { id, error }) => {
      setWith(state, `history.${id}.error`, error, Object)
    }),

    setLoading: action((state, { id, isLoading }) => {
      setWith(state, `history.${id}.isLoading`, isLoading, Object)
    }),

    fetchQuiz: thunk((dispatch, { id }, { getState }) => {
      const { history } = getState()

      if (get(history, id)) {
        return noop
      }

      dispatch.setQuiz({
        id,
        data: {
          questions: [],
        },
      })

      const cancellationToken = axios.CancelToken.source()

      async function fetchData() {
        dispatch.setError({ id, error: undefined })
        dispatch.setLoading({ id, isLoading: true })

        try {
          const data = await fetchQuiz({ cancellationToken })

          if (data.response_code !== 0) {
            throw new Error(
              `Invalid response code from API: ${data.response_code}`
            )
          }

          dispatch.setQuiz({
            id,
            data: {
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

export const store = createStore(model, {
  reducerEnhancer: (reducer) =>
    persistReducer(
      {
        key: 'appState',
        storage,
      },
      reducer
    ),
})

export const persistor = persistStore(store)

const typedHooks = createTypedHooks<StoreModel>()

export const useStoreActions = typedHooks.useStoreActions
export const useStoreDispatch = typedHooks.useStoreDispatch
export const useStoreState = typedHooks.useStoreState
