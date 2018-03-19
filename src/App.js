import "./index.css"
import React from "react"
import Footer from "./components/footer"
import ShowOne from "./components/show_one"
import ShowAll from "./components/show_all"
import Leaderboard from "./components/leaderboard"
import Userpage from "./components/userpage"
import questService from "./services/quests"
import { Route, NavLink, HashRouter } from "react-router-dom"
import LoginForm from "./components/loginForm"
import loginService from "./services/login"
import Notification from "./components/Notification"
import userService from "./services/users"
import { notify } from './reducers/notificationReducer'
import { setActivationCode, clearActivationCode } from './reducers/activationCodeReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: [],
      quest: null,
      activationCode: "",
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

    const quests = await questService.getAll()
    const sortedUsers = users.sort((a, b) => { return b.points - a.points })
    const updatedQuests = this.setQuestState(quests)
    this.setState({ quests: updatedQuests, users: sortedUsers })
  }

  setQuestState = (quests) => {
    let updatedQuests = []
    if (this.state.user !== null) {
      quests.forEach(q => {
        if (q.usersStarted.length !== 0) {
          let us = q.usersStarted
          const isStarted = us.find(a => {
            return a.user === this.state.user.id
          })
          if(isStarted) {
            if(isStarted.finishTime !== null) {
              updatedQuests = updatedQuests.concat({...q, finished: true})
            } else {
              updatedQuests = updatedQuests.concat({...q, started: true})
            }
          } else {
            updatedQuests = updatedQuests.concat(q)
          }
        }
      })

      return updatedQuests
    }
  }

  handleQuestShowClick = id => {
    return () => {
      this.setState({
        quest: this.state.quests.find(q => q.id === id)
      })
    }
  }

  handleStartQuest = async ({ quest }) => {
    const user = await questService.startQuest(quest.id)
    const quests = await questService.getAll()
    const updatedQuests = this.setQuestState(quests)
    this.setState({
      user: { ...user, token: this.state.user.token }, quests: updatedQuests
    })
  }

  handleDeleteQuest = id => {
    return () => {
      if (window.confirm("Do you want to delete this quest?")) {
        questService.remove(id).then(() => {
          const quests = this.state.quests.filter(quest => quest.id !== id)
          this.setState({
            quests: quests,
            showAll: true
          })
        })
      }
    }
  }

  handleCompleteQuest = async ({ quest }) => {
    const user = await questService.finishQuest(quest.id, this.props.store.getState().activationCode)
    const quests = await questService.getAll()
    const updatedQuests = this.setQuestState(quests)
    this.setState({
      user: { ...user, token: this.state.user.token }, quests: updatedQuests
    })
    this.props.clearActivationCode()
  }

  createNewQuest = (newQuest) => {
    this.setState({
      quests: this.state.quests.concat(newQuest)
    })
    this.props.notify(`${newQuest.name} has been created.`, 5000)
  }

  editQuest = (quest) => {
    let editedQuests = this.state.quests.map(q => q.id === quest.id ? quest : q)
    this.setState({
      quests: editedQuests,
      quest: null
    })
    this.props.notify(`${quest.name} has been edited.`, 5000)
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
    const quest = await questService.deactivateQuest(id)
    const updatedQuests = this.state.quests.map(q => q.id === quest.id ? quest : q)
    this.setState({
      quest: quest,
      quests: updatedQuests
    })
    this.props.notify(`Deactivated ${quest.name}`, 5000)
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
    this.componentWillMount()
  }

  handleLogout = () => {
    window.localStorage.removeItem("LoggedTmcUser")
    this.setState({
      user: null
    })
  }

  render() {
    const questById = id => this.state.quests.find(quest => quest.id === id)
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
                <Route
                  exact
                  path="/"
                  render={() => (
                    <ShowAll
                      state={this.state}
                      handleQuestShowClick={this.handleQuestShowClick}
                    />
                  )}
                />
                <Route
                  exact
                  path="/quests/:id"
                  render={({ match }) => (
                    <ShowOne
                      store={this.props.store}
                      quest={questById(match.params.id)}
                      state={this.state}
                      handleStart={this.handleStartQuest}
                      handleComplete={this.handleCompleteQuest}
                      handleActivationCodeChange={this.handleActivationCodeChange}
                      handleDelete={this.handleDeleteQuest.bind(this)}
                      editQuest={this.editQuest.bind(this)}
                      handleDeactivate={this.handleDeactivate.bind(this)}
                    />
                  )}
                />
                <Route path="/leaderboard" render={() => (
                  <Leaderboard users={this.state.users} />)} />
                <Route path="/userpage" render={() => (
                  <Userpage
                    createNewQuest={this.createNewQuest.bind(this)}
                    state={this.state}
                    handleDelete={this.handleDeleteAccount.bind(this)}
                    handleLogout={this.handleLogout}
                    user={this.state.user}
                    editUser={this.editUser}
                  />)} />
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
    activationCode: state.activationCode
  }
}

export default connect(mapStateToProps, { notify, setActivationCode, clearActivationCode })(App)