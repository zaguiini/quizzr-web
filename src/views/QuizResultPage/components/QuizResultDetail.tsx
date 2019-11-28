import React from 'react'
import { Box } from '@chakra-ui/core'
import map from 'lodash/map'
import { QuizQuestion } from 'store/types'
import ListItem from 'components/ListItem'

const QuizResultDetail = ({ questions }: { questions: QuizQuestion[] }) => {
  return (
    <Box mt={12} as="ul" flexGrow={1} overflow="auto" listStyleType="none">
      {map(questions, ({ question, answer, correctAnswer }, index) => (
        <ListItem
          question={question}
          isAnswerCorrect={answer === correctAnswer}
          mt={index !== 0 ? 6 : 0}
          key={question}
        />
      ))}
    </Box>
  )
}

export default QuizResultDetail
