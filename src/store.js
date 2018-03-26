import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import activationCodeReducer from './reducers/activationCodeReducer'
import questReducer from './reducers/questReducer'
import usersReducer from './reducers/usersReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import courseReducer from './reducers/courseReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  activationCode: activationCodeReducer,
  quests: questReducer,
  users: usersReducer,
  loggedUser: loggedUserReducer,
  courses: courseReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store