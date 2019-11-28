import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { BrowserRouter } from 'react-router-dom'

import Main from './views/Main'

import { globalStyles } from './styles'
import { StoreProvider } from 'easy-peasy'
import { store } from './store'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CSSReset />
        <Global styles={globalStyles} />
        <StoreProvider store={store}>
          <Main />
        </StoreProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
