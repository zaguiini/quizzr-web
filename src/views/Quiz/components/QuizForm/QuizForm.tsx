import React from 'react'
import { useStoreState, QuizQuestion, useStoreActions } from 'store'
import get from 'lodash/get'
import pick from 'lodash/pick'
// @ts-ignore
import LoadingBar from 'react-top-loading-bar'
import { useTheme } from '@chakra-ui/core'

const Question = (props: any) => (
  <button onClick={() => props.onAnswer(true)}>Go</button>
)

const QuizForm = () => {
  const quiz = useStoreState((state) => ({
    ...pick(state, ['currentQuestion', 'rightAnswers', 'totalQuestions']),
    questions: get(
      state,
      `quizzes.history.${state.ongoingQuiz}.data.questions`,
      []
    ) as QuizQuestion[],
    ongoingQuiz: state.ongoingQuiz,
  }))

  const setAnswer = useStoreActions((store) => store.quizzes.setAnswer)

  const theme = useTheme()

  const registerAnswer = (answer: boolean) => {
    console.log(quiz.questions, quiz.currentQuestion)

    setAnswer({
      quizId: quiz.ongoingQuiz!,
      questionId: quiz.questions[quiz.currentQuestion - 1].id,
      answer,
    })
  }

  return (
    <>
      <LoadingBar
        height={5}
        color={get(theme, 'colors.purple.400')}
        progress={(quiz.currentQuestion / quiz.totalQuestions) * 100}
      />
      <Question onAnswer={registerAnswer} />
    </>
  )
}

export default QuizForm
