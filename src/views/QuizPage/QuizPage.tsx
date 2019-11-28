import React from 'react'
import { useStoreActions, useStoreState } from 'store/store'
import { useParams } from 'react-router-dom'
import get from 'lodash/get'
import noop from 'lodash/noop'
import Placeholder from 'components/Placeholder'
import Information from 'components/Information'
import Quiz from './components/Quiz/Quiz'
import { Button } from '@chakra-ui/core'

const QuizPage = () => {
  const { id } = useParams<{ id: string }>()
  const { quiz } = useStoreState((state) => ({
    quiz: state.quizzes.history[id],
  }))

  const fetchQuiz = useStoreActions((actions) => actions.quizzes.fetchQuiz)
  const cancel = React.useRef(noop)

  React.useEffect(() => {
    cancel.current = fetchQuiz({ id })

    return () => {
      cancel.current()
    }
  }, [fetchQuiz, id])

  const hasData = get(quiz, 'data.questions', []).length

  return (
    <Placeholder
      ready={!get(quiz, 'isLoading', true)}
      fallback={<Information>Loading questions...</Information>}
      delay={350}
    >
      {hasData ? (
        <Quiz />
      ) : (
        <Information
          secondary={
            <Button
              variantColor="purple"
              onClick={() => {
                cancel.current = fetchQuiz({ id })
              }}
            >
              Try again
            </Button>
          }
        >
          Something wrong happened.
        </Information>
      )}
    </Placeholder>
  )
}

export default QuizPage
