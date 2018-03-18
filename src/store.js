import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import activationCodeReducer from './reducers/activationCodeReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  activationCode: activationCodeReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store