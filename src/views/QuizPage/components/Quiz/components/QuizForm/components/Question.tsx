import React from 'react'
import { Box, Text, Button } from '@chakra-ui/core'
import Interweave from 'interweave'

interface QuestionProps {
  question: string
  onAnswer: (answer: boolean) => void
}

const buttonProps = {
  width: ['auto', 200],
  height: [50, 100],
  flex: 1,
  opacity: 0.7,
  _hover: {
    opacity: 1,
  },
  fontSize: [24, 32],
}

const Question = ({ onAnswer, question }: QuestionProps) => {
  return (
    <Box
      padding={[4, 16]}
      display="flex"
      flexDirection="column"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Box display="flex" flex={1} alignItems="center">
        <Text fontSize="4xl" textAlign="center" userSelect="none">
          <Interweave content={question} />
        </Text>
      </Box>
      <Box
        flexShrink={0}
        display="grid"
        width={['100%', 'auto']}
        mt={['auto', 16]}
        gridColumnGap={8}
        gridTemplateColumns="1fr 1fr"
      >
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
          onClick={() => onAnswer(false)}
        >
          FALSE
        </Button>
      </Box>
    </Box>
  )
}

export default Question
