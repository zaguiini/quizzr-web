import React from 'react'
import { useQuiz } from 'hooks'
import QuizForm from './components/QuizForm/QuizForm'
import { Redirect } from 'react-router-dom'
import { useStoreActions } from 'store/store'

const Quiz = () => {
  const quiz = useQuiz()
  const setOngoingQuiz = useStoreActions((store) => store.setOngoingQuiz)

  React.useEffect(() => {
    if (quiz.progress === 100 && quiz.ongoingQuiz) {
      setOngoingQuiz(undefined)
    }
  }, [quiz.ongoingQuiz, quiz.progress, setOngoingQuiz])

  return quiz.isFinished ? (
    <Redirect to={`/quiz/${quiz.ongoingQuiz}/result`} />
  ) : (
    <QuizForm {...quiz} />
  )
}

export default Quiz
