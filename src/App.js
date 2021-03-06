import './index.css'
import React from 'react'
import Footer from './components/Footer'
import ShowOne from './components/ShowOne'
import ShowAll from './components/ShowAll'
import Leaderboard from './components/Leaderboard'
import Userpage from './components/Userpage'
import FeedbackList from './components/FeedbackList'
import questService from './services/quests'
import { Route, NavLink, HashRouter, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'
import userService from './services/users'
import courseService from './services/courses'
import feedbackService from './services/feedbacks'
import { notify } from './reducers/notificationReducer'
import { setActivationCode, clearActivationCode } from './reducers/activationCodeReducer'
import { initializeQuests, createQuest, removeQuest, deactivateQuest, setQuests, startQuest, finishQuest } from './reducers/questReducer'
import { getUsers } from './reducers/usersReducer'
import { getCourses } from './reducers/courseReducer'
import { getGroups } from './reducers/groupReducer'
import { setLoggedUser, updateUserPoints } from './reducers/loggedUserReducer'
import { connect } from 'react-redux'
import { initializeFeedbacks } from './reducers/feedbackReducer'
import ErrorMessage from './components/ErrorMessage'
import SwipeableRoutes from 'react-swipeable-routes'
import WelcomePage from './components/WelcomePage'
import ShowFeedback from './components/ShowFeedback'
import subscriptionService from './services/subscription'
import GroupingPage from './components/GroupingPage'
import groupService from './services/groups'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: false
    }
  }

  async componentWillMount() {
    await this.props.getUsers()
    await this.props.getCourses()
    await this.props.getGroups()
    const loggedInUser = window.localStorage.getItem('LoggedTmcUser')
    if (loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser)
      const newToken = {
        token: parsedUser.token
      }
      try {
        const user = this.props.users.find(u => u.id === parsedUser.id)
        const updatedUser = { ...parsedUser, quests: user.quests }
        questService.setToken(newToken)
        userService.setToken(newToken)
        courseService.setToken(newToken)
        feedbackService.setToken(newToken)
        subscriptionService.setToken(newToken)
        groupService.setToken(newToken)
        this.props.setLoggedUser(updatedUser)

        await this.props.initializeQuests()
        await this.props.initializeFeedbacks()

        const quests = this.props.quests

        const updatedQuests = this.setQuestState(quests)

        this.props.setQuests(updatedQuests)
      } catch (exception) {
        this.handleLogout()
      }
    }
  }

  //Updates the quests' usersStarted list
  setQuestState = (quests) => {
    let updatedQuests = []
    if (this.props.loggedUser === null) {
      return updatedQuests
    }
    quests.forEach(q => {
      if (q.usersStarted.length !== 0) {
        let us = q.usersStarted
        const isStarted = us.find(a => {
          return a.user === this.props.loggedUser.id
        })
        if (isStarted) {
          if (isStarted.finishTime !== null) {
            updatedQuests = updatedQuests.concat({ ...q, finished: true })
          } else {
            updatedQuests = updatedQuests.concat({ ...q, started: true })
          }
        } else {
          updatedQuests = updatedQuests.concat(q)
        }
      } else {
        updatedQuests = updatedQuests.concat(q)
      }
    })

    return updatedQuests
  }

  exitWelcome = async () => {
    this.setState({
      newUser: false
    })
    await this.props.initializeQuests()
    const quests = this.props.quests

    const updatedQuests = this.setQuestState(quests)
    this.props.setQuests(updatedQuests)

  }

  handleDeleteAccount = () => {
    if (window.confirm('Do you want to delete your account?')) {
      userService.remove(this.props.loggedUser.id)
      this.handleLogout()
    }
  }

  handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    event.target.password.value = ''
    try {
      const response = await loginService.login(user)

      const cacheUser = { ...response.data.user, token: response.data.token }
      window.localStorage.setItem(
        'LoggedTmcUser',
        JSON.stringify(cacheUser)
      )
      const newToken = {
        token: response.data.token
      }
      questService.setToken(newToken)
      userService.setToken(newToken)
      courseService.setToken(newToken)
      feedbackService.setToken(newToken)
      subscriptionService.setToken(newToken)
      groupService.setToken(newToken)
      this.props.setLoggedUser(cacheUser)
      await this.props.initializeQuests()
      const quests = this.props.quests

      const updatedQuests = this.setQuestState(quests)
      this.props.setQuests(updatedQuests)
      if (response.data.isNewUser) {
        this.setState({
          newUser: true
        })
      }
      return true
    } catch (exception) {
      this.props.notify('Invalid username or password', 4000)
      return false
    }
  }

  handleLogout = () => {
    window.localStorage.removeItem('LoggedTmcUser')
    this.props.setLoggedUser(null)
  }

  render() {
    const questById = id => this.props.quests.find(quest => quest.id === id)
    const feedbackById = id => this.props.feedbacks.find(f => f.id === id)

    return (
      <HashRouter>
        <div>
          <h1 className='header__title'>Hunt for Glory</h1>
          <div className='header'>
            <ul className='headerButtons'>
              <li>
                <NavLink exact to='/'>
                  Quests
                </NavLink>
              </li>
              <li>
                <NavLink to='/leaderboard'>Leaderboard</NavLink>
              </li>
              <li>
                <NavLink to='/userpage'>Userpage</NavLink>
              </li>
            </ul>
          </div>
          <Notification />
          <ErrorMessage />
          {this.props.loggedUser === null ? (
            <div className='login'>
              <LoginForm handleLogin={this.handleLogin} />
            </div>
          ) : (
              <div>
                {this.state.newUser === true ?
                  <div>
                    <WelcomePage handleExit={this.exitWelcome.bind(this)} />
                  </div>
                  :
                  <div className='content'>
                    <Route
                      exact path='/quests/0'
                      render={() => (
                        <Redirect to='/' />
                      )} />
                    <Route
                      exact
                      path='/feedbacks/:id'
                      defaultParams={{ id: '0' }}
                      render={({ match }) => (
                        <ShowFeedback
                          feedback={feedbackById(match.params.id)}
                          key={match.params.id}
                        />
                      )}
                    />
                    <Route
                      exact
                      path='/feedbacks'
                      render={() => (
                        <FeedbackList
                          key='feedbacks' />)}
                    />
                    <Route
                      exact
                      path='/groups'
                      render={() => (
                        <GroupingPage />)}
                    />
                    <SwipeableRoutes>
                      <Route
                        exact
                        path='/quests/:id'
                        defaultParams={{ id: '0' }}
                        render={({ match }) => (
                          <ShowOne
                            quest={questById(match.params.id)}
                            key={match.params.id}
                          />
                        )}
                      />
                      <Route
                        exact
                        path='/'
                        render={() => (
                          <ShowAll
                            key='showAll' />)}
                      />
                      <Route
                        path='/leaderboard'
                        render={() => (
                          <Leaderboard
                            key='leaderboard' />)}
                      />
                      <Route
                        path='/userpage'
                        render={() => (
                          <Userpage
                            key='userpage' />)}
                      />
                    </SwipeableRoutes>
                  </div>
                }
              </div>
            )}
          <Footer />
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activationCode: state.activationCode,
    quests: state.quests,
    users: state.users,
    loggedUser: state.loggedUser,
    feedbacks: state.feedbacks
  }
}

export default connect(mapStateToProps,
  {
    notify,
    setActivationCode,
    clearActivationCode,
    initializeQuests,
    createQuest,
    removeQuest,
    deactivateQuest,
    setQuests,
    startQuest,
    finishQuest,
    getUsers,
    setLoggedUser,
    getCourses,
    updateUserPoints,
    initializeFeedbacks,
    getGroups
  })(App)