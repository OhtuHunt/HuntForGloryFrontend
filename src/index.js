import "./index.css"
import React from "react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import store from './store'
import App from './App'


const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App store={store} />
    </Provider>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
