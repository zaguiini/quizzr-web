import React from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useQuiz, useActionHandlers } from 'hooks'
import { Box, Text, Button } from '@chakra-ui/core'
import QuizResultDetail from './components/QuizResultDetail'

const QuizResultPage = () => {
  const { id } = useParams<{ id: string }>()
  const quiz = useQuiz({ id })
  const history = useHistory()
  const { startQuiz } = useActionHandlers()

  if (!quiz.isValid) {
    return <Redirect to="/" />
  }

  if (!quiz.isFinished) {
    return <Redirect to={`/quiz/${id}`} />
  }

  return (
    <Box
      paddingX={[8, 32]}
      paddingY={16}
      flex={1}
      display="flex"
      flexDirection="column"
    >
      <Text flexShrink={0} as="h1" fontSize={['3xl', '6xl']}>
        You scored{' '}
        <Text as="span" fontWeight="bold" color="green.400">
          {quiz.rightAnswers}/{quiz.totalQuestions}
        </Text>
      </Text>
      <QuizResultDetail questions={quiz.questions} />
      <Box mt={16} display="flex" justifyContent="center">
        <Button width="100%" variantColor="purple" onClick={startQuiz}>
          Play again
        </Button>
        <Button
          ml={4}
          width="100%"
          variant="outline"
          variantColor="purple"
          onClick={() => history.push('/')}
        >
          Go to home screen
        </Button>
      </Box>
    </Box>
  )
}

export default QuizResultPage
