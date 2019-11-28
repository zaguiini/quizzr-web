import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import { Box } from '@chakra-ui/core'
import QuizPage from './QuizPage/QuizPage'
import QuizResultPage from './QuizResultPage/QuizResultPage'
import styled from '@emotion/styled'

const Main = ({ className }: { className?: string }) => {
  return (
    <Box
      width="100vw"
      className={className}
      display="flex"
      position="absolute"
      overflow="hidden"
      top={0}
      bottom={0}
      left={0}
      right={0}
      backgroundColor="gray.100"
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz/:id" component={QuizPage} />
        <Route exact path="/quiz/:id/result" component={QuizResultPage} />
      </Switch>
    </Box>
  )
}

export default styled(Main)`
  min-height: 100vh;
  min-height: -webkit-fill-available;
`
