import React from 'react'
import { useStoreActions, useStoreState, Quiz as QuizType } from 'store'
import { useParams } from 'react-router-dom'
import get from 'lodash/get'
import ErrorView from 'components/ErrorView'
import Placeholder from 'components/Placeholder'
import QuizForm from './components/QuizForm/QuizForm'

const Quiz = () => {
  const { id } = useParams<{ id: string }>()
  const { difficulty, quiz } = useStoreState((state) => ({
    difficulty: state.currentQuizDifficulty,
    quiz: get(state, `quizzes.history.${id}`) as QuizType | undefined,
  }))

  const fetchQuiz = useStoreActions((actions) => actions.quizzes.fetchQuiz)

  React.useEffect(() => {
    return fetchQuiz({ id, difficulty })
  }, [difficulty, fetchQuiz, id])

  const hasData = get(quiz, 'data.questions', []).length

  return (
    <Placeholder
      ready={!get(quiz, 'isLoading', true)}
      fallback="Loading questions..."
      delay={500}
    >
      {hasData ? <QuizForm /> : <ErrorView />}
    </Placeholder>
  )
}

export default Quiz
