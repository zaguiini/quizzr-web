import React from 'react'
import { useQuiz } from 'hooks'
import QuizForm from './components/QuizForm/QuizForm'
import { Redirect } from 'react-router-dom'

const Quiz = () => {
  const quiz = useQuiz()

  return quiz.isFinished ? (
    <Redirect to={`/quiz/${quiz.ongoingQuiz}/result`} />
  ) : (
    <QuizForm {...quiz} />
  )
}

export default Quiz
