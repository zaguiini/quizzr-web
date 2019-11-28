import React from 'react'
import { Box, Text, Button } from '@chakra-ui/core'
import Interweave from 'interweave'

interface QuestionProps {
  question: string
  onAnswer: (answer: boolean) => void
}

const buttonProps = {
  width: 200,
  height: 100,
  opacity: 0.7,
  _hover: {
    opacity: 1,
  },
  fontSize: 32,
}

const Question = ({ onAnswer, question }: QuestionProps) => {
  return (
    <Box
      padding={16}
      display="flex"
      flexDirection="column"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="4xl" textAlign="center" userSelect="none">
        <Interweave content={question} />
      </Text>
      <Box mt={16}>
        <Button
          {...buttonProps}
          variantColor="green"
          onClick={() => onAnswer(true)}
        >
          TRUE
        </Button>
        <Button
          {...buttonProps}
          variantColor="red"
          ml={16}
          onClick={() => onAnswer(false)}
        >
          FALSE
        </Button>
      </Box>
    </Box>
  )
}

export default Question
