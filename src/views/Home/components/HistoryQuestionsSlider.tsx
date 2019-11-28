import React from 'react'
import { Box } from '@chakra-ui/core'
import { useStoreState } from 'store/store'
import { QuizQuestion } from 'store/types'
import get from 'lodash/get'
import map from 'lodash/map'
import ListItem from 'components/ListItem'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const marquee = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
`

const HistoryQuestionsSlider = ({ className }: { className?: string }) => {
  const history = useStoreState((store) => store.quizzes.history)

  const answeredQuestions = React.useMemo(() => {
    const uniqueQuestions = Object.values(history).reduce<{
      [key: string]: QuizQuestion
    }>((curr, next) => {
      const questions = get(next, 'data.questions', []) as QuizQuestion[]

      questions.forEach((question) => {
        if (!curr[question.question] && question.answer !== undefined) {
          curr[question.question] = question
        }
      })

      return curr
    }, {})

    return Object.values(uniqueQuestions)
  }, [history])

  const items = React.useMemo(
    () => (
      <>
        {map(
          answeredQuestions,
          ({ question, answer, correctAnswer }, index) => (
            <ListItem
              question={question}
              shouldTruncate
              isAnswerCorrect={answer === correctAnswer}
              mt={index !== 0 ? 6 : 0}
              key={question}
            />
          )
        )}
      </>
    ),
    [answeredQuestions]
  )

  return answeredQuestions.length > 0 ? (
    <Box
      className={className}
      as="ul"
      overflow="auto"
      p={[4, 0]}
      opacity={[0.1, 0.5]}
      listStyleType="none"
      position="absolute"
      userSelect="none"
      pointerEvents="none"
      zIndex={[1, 'auto']}
      right={[0, 4]}
      width={['100vw', '40vw']}
      height="100vh"
    >
      <div id="marquee">{items}</div>
      <Box id="marquee2" mt={6}>
        {items}
      </Box>
    </Box>
  ) : null
}

export default styled(HistoryQuestionsSlider)`
  #marquee,
  #marquee2 {
    animation: ${marquee} 300s linear infinite;
  }

  #marquee2 {
    animation-delay: 2.5s;
  }
`
