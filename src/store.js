import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import activationCodeReducer from './reducers/activationCodeReducer'
import questReducer from './reducers/questReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  activationCode: activationCodeReducer,
  quests: questReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store