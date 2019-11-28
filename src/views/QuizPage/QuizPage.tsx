import React from 'react'
import { useStoreActions, useStoreState } from 'store/store'
import { useParams } from 'react-router-dom'
import get from 'lodash/get'
import Placeholder from 'components/Placeholder'
import Information from 'components/Information'
import Quiz from './components/Quiz/Quiz'

const QuizPage = () => {
  const { id } = useParams<{ id: string }>()
  const { quiz } = useStoreState((state) => ({
    quiz: state.quizzes.history[id],
  }))

  const fetchQuiz = useStoreActions((actions) => actions.quizzes.fetchQuiz)

  React.useEffect(() => {
    return fetchQuiz({ id })
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
        <Information>
          Something wrong happened. Try refreshing your page!
        </Information>
      )}
    </Placeholder>
  )
}

export default QuizPage
