import React from 'react'
import ReactDOM from 'react-dom'
import WebFont from 'webfontloader'

import App from './App'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()

WebFont.load({
  google: {
    families: ['Lato:400,700'],
  },
})
