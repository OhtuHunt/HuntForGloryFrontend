import "./index.css"
import React from "react"
import Footer from "./components/Footer"
import ShowOne from "./components/ShowOne"
import ShowAll from "./components/ShowAll"
import Leaderboard from "./components/Leaderboard"
import Userpage from "./components/Userpage"
import questService from "./services/quests"
import { Route, NavLink, HashRouter } from "react-router-dom"
import LoginForm from "./components/LoginForm"
import loginService from "./services/login"
import Notification from "./components/Notification"
import userService from "./services/users"
import { notify } from './reducers/notificationReducer'
import { setActivationCode, clearActivationCode } from './reducers/activationCodeReducer'
import { initializeQuests, createQuest, removeQuest, deactivateQuest, setQuests, startQuest, finishQuest } from './reducers/questReducer'
import { getUsers } from './reducers/usersReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'
import { connect } from 'react-redux'
import SwipeableRoutes from 'react-swipeable-routes'

class App extends React.Component {

  async componentWillMount() {
    await this.props.getUsers()
    const loggedInUser = window.localStorage.getItem("LoggedTmcUser")
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
        this.props.setLoggedUser(updatedUser)
        this.setState({ user: updatedUser })

      } catch (exception) {
        this.handleLogout()
      }
    }

    await this.props.initializeQuests()
    const quests = this.props.quests

    const updatedQuests = this.setQuestState(quests)
    this.props.setQuests(updatedQuests)
    this.setState({ quests: updatedQuests })
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

  handleStartQuest = async (quest) => {
    await this.props.startQuest(quest.id)
  }

  handleDeleteQuest = async (id) => {
    if (window.confirm("Do you want to delete this quest?")) {
      await this.props.removeQuest(id)
    }
  }

  handleCompleteQuest = async (quest) => {
    try {
      await this.props.finishQuest(quest.id, this.props.activationCode)
    } catch (exception) {
      this.props.notify("Invalid activation code", 3000)
    }
    this.props.clearActivationCode()
  }

  handleDeleteAccount = () => {
    if (window.confirm("Do you want to delete your account?")) {
      userService.remove(this.props.loggedUser.id)
      window.localStorage.removeItem("LoggedTmcUser")
      this.setState({
        user: null
      })
    }

  }

  handleDeactivate = async (id) => {
    await this.props.deactivateQuest(id)
    this.props.notify(`Deactivated this quest`, 5000)
  }

  handleActivationCodeChange = event => {
    event.preventDefault()
    this.props.setActivationCode(event.target.value)
  }

  handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    event.target.password.value = ""
    try {
      const response = await loginService.login(user)
      const cacheUser = { ...response.data.user, token: response.data.token }
      window.localStorage.setItem(
        "LoggedTmcUser",
        JSON.stringify(cacheUser)
      )
      const newToken = {
        token: response.data.token
      }
      questService.setToken(newToken)
      this.props.setLoggedUser(cacheUser)
    } catch (exception) {
      this.props.notify("Invalid username or password", 3000)
    }
  }

  render() {
    const questById = id => this.props.quests.find(quest => quest.id === id)
      
    return (
      <HashRouter>
        <div>
          <h1 className="header__title">Hunt for Glory</h1>
          <div className="header">
            <ul className="headerButtons">
              <li>
                <NavLink exact to="/">
                  Quests
                </NavLink>
              </li>
              <li>
                <NavLink to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li>
                <NavLink to="/userpage">Userpage</NavLink>
              </li>
            </ul>
          </div>
          <Notification />
          {this.props.loggedUser === null ? (
            <div className="login">
              <LoginForm handleLogin={this.handleLogin} />
            </div>
          ) : (
              <div className="content">
                <SwipeableRoutes>
                  <Route
                    exact
                    path="/quests/:id"
                    defaultParams={{ id: "0" }}
                    render={({ match }) => (
                      <ShowOne
                        quest={questById(match.params.id)}
                        handleStart={this.handleStartQuest}
                        handleComplete={this.handleCompleteQuest}
                        handleActivationCodeChange={this.handleActivationCodeChange}
                        handleDelete={this.handleDeleteQuest.bind(this)}
                        handleDeactivate={this.handleDeactivate.bind(this)}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <ShowAll />)}
                  />
                  <Route
                    path="/leaderboard"
                    render={() => (
                      <Leaderboard />)}
                  />
                  <Route
                    path="/userpage"
                    render={() => (
                      <Userpage />)}
                  />
                </SwipeableRoutes>
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
    loggedUser: state.loggedUser
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
    setLoggedUser
  })(App)