import React from 'react'
import { Box, Text, Icon } from '@chakra-ui/core'
import Interweave from 'interweave'
import map from 'lodash/map'
import { QuizQuestion } from 'store/types'

const QuizResultDetail = ({ questions }: { questions: QuizQuestion[] }) => {
  return (
    <Box mt={12} as="ul" flexGrow={1} overflow="auto" listStyleType="none">
      {map(questions, ({ question, answer, correctAnswer }, index) => {
        const isAnswerCorrect = answer === correctAnswer

        return (
          <Box
            fontSize={[16, 22]}
            mt={index !== 0 ? 6 : 0}
            as="li"
            display="flex"
            alignItems="center"
            key={question}
            color={`${isAnswerCorrect ? 'green' : 'red'}.600`}
          >
            <Icon name={isAnswerCorrect ? 'check' : 'close'} mr={4} />
            <Text as="span">
              <Interweave content={question} />
            </Text>
          </Box>
        )
      })}
    </Box>
  )
}

export default QuizResultDetail
