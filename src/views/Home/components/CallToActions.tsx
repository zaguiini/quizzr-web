import React from 'react'
import { Box, Button } from '@chakra-ui/core'

export enum Action {
  TakeQuiz = 'TAKE_QUIZ',
  ContinueQuiz = 'CONTINUE_QUIZ',
}

interface CallToActionsProps {
  onAction: (action: Action) => void
  hasOngoingQuiz: boolean
}

const CallToActions = ({ onAction, hasOngoingQuiz }: CallToActionsProps) => {
  return (
    <>
      {hasOngoingQuiz && (
        <Box
          display="flex"
          alignItems="center"
          marginBottom={[2, 0]}
          marginRight={[0, 2]}
        >
          <Button
            size="lg"
            variant="outline"
            variantColor="purple"
            onClick={() => onAction(Action.ContinueQuiz)}
          >
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
      </Box>
    </>
  )
}

export default CallToActions
