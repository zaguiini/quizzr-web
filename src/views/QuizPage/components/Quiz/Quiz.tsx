import React from 'react'
import { useQuiz } from 'hooks'
import QuizForm from './components/QuizForm/QuizForm'
import { Redirect } from 'react-router-dom'
import { useStoreActions } from 'store/store'

const Quiz = () => {
  const quiz = useQuiz()
  const setCurrentQuiz = useStoreActions((store) => store.setCurrentQuiz)

  React.useEffect(() => {
    if (quiz.progress === 100 && quiz.currentQuiz) {
      setCurrentQuiz(undefined)
    }
  }, [quiz.currentQuiz, quiz.progress, setCurrentQuiz])

  return quiz.isFinished ? (
    <Redirect to={`/quiz/${quiz.currentQuiz}/result`} />
  ) : (
    <QuizForm {...quiz} />
  )
}

export default Quiz
