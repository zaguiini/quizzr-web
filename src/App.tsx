import React from 'react'
import { Global } from '@emotion/core'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import Main from './views/Main'

import { globalStyles } from './styles'
import { StoreProvider } from 'easy-peasy'
import { store, persistor } from './store/store'

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CSSReset />
        <Global styles={globalStyles} />
        <PersistGate persistor={persistor}>
          <StoreProvider store={store}>
            <Main />
          </StoreProvider>
        </PersistGate>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
