import React from 'react'
import { Box } from '@chakra-ui/core'
import { useStoreState } from 'store/store'
import { useActionHandlers } from 'hooks'

import Hero from './components/Hero'
import CallToActions, { Action } from './components/CallToActions'
import HistoryQuestionsSlider from './components/HistoryQuestionsSlider'

const Home = () => {
  const currentQuiz = useStoreState((store) => store.currentQuiz)
  const { startQuiz, resumeQuiz } = useActionHandlers()

  const handleAction = React.useCallback(
    (action: Action) => {
      if (action === Action.TakeQuiz) {
        startQuiz()
      } else if (action === Action.ContinueQuiz) {
        resumeQuiz()
      }
    },
    [resumeQuiz, startQuiz]
  )

  return (
    <>
      <Box
        zIndex={2}
        padding={[8, 32]}
        flex={1}
        display="flex"
        justifyContent="center"
        flexDirection="column"
      >
        <Hero />
        <Box marginTop={12} display="flex" flexDirection={['column', 'row']}>
          <CallToActions
            onAction={handleAction}
            hasOngoingQuiz={!!currentQuiz}
          />
        </Box>
      </Box>
      <HistoryQuestionsSlider />
    </>
  )
}

export default Home
