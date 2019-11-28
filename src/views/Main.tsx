import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home/Home'
import { Box } from '@chakra-ui/core'
import Quiz from './Quiz/Quiz'

const Main = () => {
  return (
    <Box width="100vw" height="100vh" display="flex" backgroundColor="gray.100">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={Quiz} />
      </Switch>
    </Box>
  )
}

export default Main
