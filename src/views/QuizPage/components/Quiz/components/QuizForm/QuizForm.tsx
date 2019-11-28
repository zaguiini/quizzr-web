import React from 'react'
// @ts-ignore
import LoadingBar from 'react-top-loading-bar'
import { useTheme, Box, Text } from '@chakra-ui/core'
import get from 'lodash/get'
import Question from './components/Question'
import { useQuiz } from 'hooks'

const QuizForm = ({
  progress,
  currentQuestion,
  totalQuestions,
  registerAnswer,
}: ReturnType<typeof useQuiz>) => {
  const theme = useTheme()

  return (
    <>
      <LoadingBar
        height={5}
        color={get(theme, 'colors.purple.400')}
        progress={progress}
      />
      <Box display="flex" flexDirection="column" flex={1}>
        <Text position="absolute" p={4} userSelect="none">
          Question {currentQuestion.index + 1} out of {totalQuestions}
        </Text>
        <Box display="flex" flex={1}>
          <Question
            onAnswer={registerAnswer}
            question={currentQuestion.question}
          />
        </Box>
      </Box>
    </>
  )
}

export default QuizForm
