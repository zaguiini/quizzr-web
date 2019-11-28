import React from 'react'
import { Box } from '@chakra-ui/core'

import Hero from './components/Hero'
import CallToActions, { Action } from './components/CallToActions'
import { useStoreState } from 'store/store'
import { useActionHandlers } from 'hooks'

const Home = () => {
  const ongoingQuiz = useStoreState((store) => store.ongoingQuiz)
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
    <Box
      padding={[8, 32]}
      flex={1}
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Hero />
      <Box marginTop={12} display="flex">
        <CallToActions onAction={handleAction} hasOngoingQuiz={!!ongoingQuiz} />
      </Box>
    </Box>
  )
}

export default Home
