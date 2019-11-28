import React from 'react'
import { Box } from '@chakra-ui/core'
import { useHistory } from 'react-router-dom'
import shortId from 'short-uuid'
import { useStoreState, useStoreActions } from 'store'

import Hero from './components/Hero'
import CallToActions, { Action } from './components/CallToActions'

const Home = () => {
  const { currentQuizDifficulty, ongoingQuiz } = useStoreState(
    ({ currentQuizDifficulty, ongoingQuiz }) => ({
      currentQuizDifficulty,
      ongoingQuiz,
    })
  )

  const setOngoingQuiz = useStoreActions((store) => store.setOngoingQuiz)
  const history = useHistory()

  const handleAction = React.useCallback(
    (action: Action) => {
      let quiz = ''
      if (action === Action.TakeQuiz || !ongoingQuiz) {
        quiz = shortId.generate()
      } else if (action === Action.ContinueQuiz) {
        quiz = ongoingQuiz
      }

      setOngoingQuiz(quiz)
      history.push(`/${quiz}`)
    },
    [history, ongoingQuiz, setOngoingQuiz]
  )

  return (
    <Box
      padding={32}
      flex={1}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Hero />
      <Box marginTop={12} display="flex">
        <CallToActions
          onAction={handleAction}
          currentDifficulty={currentQuizDifficulty}
          hasOngoingQuiz={!!ongoingQuiz}
        />
      </Box>
    </Box>
  )
}

export default Home
