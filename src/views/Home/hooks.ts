import { useHistory } from 'react-router-dom'
import React from 'react'
import { Action } from './components/CallToActions'
import shortId from 'short-uuid'
import { useStoreActions } from 'store/store'

interface UseCallToActionHandler {
  ongoingQuiz?: string
}

export const useCallToActionHandler = ({
  ongoingQuiz,
}: UseCallToActionHandler) => {
  const setOngoingQuiz = useStoreActions((store) => store.setOngoingQuiz)

  const history = useHistory()

  const handler = React.useCallback(
    (action: Action) => {
      let quiz = ''
      if (action === Action.TakeQuiz || !ongoingQuiz) {
        quiz = shortId.generate()
      } else if (action === Action.ContinueQuiz) {
        quiz = ongoingQuiz
      }

      setOngoingQuiz(quiz)
      history.push(`/quiz/${quiz}`)
    },
    [history, ongoingQuiz, setOngoingQuiz]
  )

  return handler
}
