import React from 'react'
import { Box, Button, Text } from '@chakra-ui/core'
import { QuizDifficulty } from 'service'

export enum Action {
  TakeQuiz = 'TAKE_QUIZ',
  ContinueQuiz = 'CONTINUE_QUIZ',
}

interface CallToActionsProps {
  onAction: (action: Action) => void
  currentDifficulty: QuizDifficulty
  hasOngoingQuiz: boolean
}

const CallToActions = ({
  onAction,
  currentDifficulty,
  hasOngoingQuiz,
}: CallToActionsProps) => {
  return (
    <>
      {hasOngoingQuiz && (
        <Box display="flex" alignItems="center" marginRight={2}>
          <Button size="lg" variant="outline" variantColor="purple">
            Continue current quiz
          </Button>
        </Box>
      )}
      <Box display="flex" alignItems="center">
        <Button
          onClick={() => onAction(Action.TakeQuiz)}
          size="lg"
          variantColor="purple"
        >
          Take quiz
        </Button>
        <Text marginLeft={4} color="gray.500">
          Current difficulty: <strong>{currentDifficulty}</strong>
        </Text>
      </Box>
    </>
  )
}

export default CallToActions
