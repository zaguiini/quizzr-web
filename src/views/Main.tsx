import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import { Box } from '@chakra-ui/core'
import QuizPage from './QuizPage/QuizPage'
import QuizResultPage from './QuizResultPage/QuizResultPage'

const Main = () => {
  return (
    <Box width="100vw" height="100vh" display="flex" backgroundColor="gray.100">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/quiz/:id" component={QuizPage} />
        <Route exact path="/quiz/:id/result" component={QuizResultPage} />
      </Switch>
    </Box>
  )
}

export default Main
