import React from 'react'
import { Box } from '@chakra-ui/core'

import Hero from './components/Hero'
import CallToActions from './components/CallToActions'
import { useCallToActionHandler } from './hooks'
import pick from 'lodash/pick'
import { useStoreState } from 'store/store'

const Home = () => {
  const { ongoingQuiz } = useStoreState((store) => pick(store, ['ongoingQuiz']))
  const handleAction = useCallToActionHandler({ ongoingQuiz })

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
        <CallToActions onAction={handleAction} hasOngoingQuiz={!!ongoingQuiz} />
      </Box>
    </Box>
  )
}

export default Home
