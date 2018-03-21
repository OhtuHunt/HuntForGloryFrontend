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
import {initializeQuests, createQuest, removeQuest, deactivateQuest, setQuests, startQuest, finishQuest} from './reducers/questReducer'
import { connect } from 'react-redux'
import SwipeableRoutes from 'react-swipeable-routes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: [],
      quest: null,
      user: null,
      users: []
    }

  }

  async componentWillMount() {
    const users = await userService.getAll()
    const loggedInUser = window.localStorage.getItem("LoggedTmcUser")
    if (loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser)
      const newToken = {
        token: parsedUser.token
      }
      try {
        const user = users.find(u => u.id === parsedUser.id)
        const updatedUser = { ...parsedUser, quests: user.quests }
        questService.setToken(newToken)
        userService.setToken(newToken)
        this.setState({ user: updatedUser })
      } catch (exception) {
        this.handleLogout()
      }
    }
    
    await this.props.initializeQuests()
    const quests = this.props.quests

    const sortedUsers = users.sort((a, b) => { return b.points - a.points })
    const updatedQuests = this.setQuestState(quests)
    this.props.setQuests(updatedQuests)
    this.setState({ quests: updatedQuests, users: sortedUsers })
  }

  //Updates the quests' usersStarted list
  setQuestState = (quests) => {
    let updatedQuests = []
    if (this.state.user !== null) {
      quests.forEach(q => {
        if (q.usersStarted.length !== 0) {
          let us = q.usersStarted
          const isStarted = us.find(a => {
            return a.user === this.state.user.id
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
    }
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
      const user = await questService.finishQuest(quest.id, this.props.store.getState().activationCode)
      const quests = this.props.quests
      const updatedQuests = this.setQuestState(quests)
      this.setState({
        user: { ...user, token: this.state.user.token }
      })
      await this.props.setQuests(updatedQuests)
    } catch (exception) {
      this.props.notify("Invalid activation code", 3000)
    }
    this.props.clearActivationCode()
  }

  editUser = (user) => {
    this.setState({
      user
    })
    window.localStorage.setItem(
      "LoggedTmcUser",
      JSON.stringify(this.state.user)
    )

    this.props.notify('New user information has been saved', 5000)
  }

  handleDeleteAccount = () => {
    if (window.confirm("Do you want to delete your account?")) {
      userService.remove(this.state.user.id)
      window.localStorage.removeItem("LoggedTmcUser")
      this.setState({
        user: null
      })
    }

  }

  handleDeactivate = async (id) => {
    const quest = await this.props.deactivateQuest(id)
    this.props.notify(`Deactivated this quest`, 5000)
  }

  handleActivationCodeChange = event => {
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
      this.setState({
        user: cacheUser
      })
    } catch (exception) {
      this.props.notify("Invalid username or password", 3000)
    }
    this.componentWillMount()
  }

  handleLogout = () => {
    window.localStorage.removeItem("LoggedTmcUser")
    this.setState({
      user: null
    })
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
          <Notification store={this.props.store} />
          {this.state.user === null ? (
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
                        store={this.props.store}
                        quest={questById(match.params.id)}
                        state={this.state}
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
                      <ShowAll store={this.props.store} />)}
                  />
                  <Route
                    path="/leaderboard"
                    render={() => (
                      <Leaderboard users={this.state.users} />)}
                  />
                  <Route
                    path="/userpage"
                    render={() => (
                      <Userpage
                        state={this.state}
                        handleDelete={this.handleDeleteAccount.bind(this)}
                        handleLogout={this.handleLogout}
                        user={this.state.user}
                        editUser={this.editUser}
                        store={this.props.store}
                      />)}
                  />
                </SwipeableRoutes>
              </div>
            )}
          <Footer user={this.state.user} users={this.state.users} />
        </div>
      </HashRouter>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activationCode: state.activationCode,
    quests: state.quests
  }
}

export default connect(mapStateToProps,
   { notify, 
    setActivationCode, 
    clearActivationCode, 
    initializeQuests, 
    createQuest, 
    removeQuest, 
    deactivateQuest,
    setQuests,
    startQuest,
    finishQuest })(App)