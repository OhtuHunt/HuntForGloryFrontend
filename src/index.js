import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Footer from "./components/footer";
import ShowOne from "./components/show_one";
import ShowAll from "./components/show_all";
import Leaderboard from "./components/leaderboard";
import Userpage from "./components/userpage";
import questService from "./services/quests";
import { Route, NavLink, HashRouter } from "react-router-dom";
import LoginForm from "./components/loginForm";
import loginService from "./services/login";
import Notification from "./components/Notification"
import userService from "./services/users"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quests: [],
      quest: null,
      activationCode: "",
      user: null,
      message: null,
      users: []
    };
  }

  async componentWillMount() {
    const users = await userService.getAll();
    const loggedInUser = window.localStorage.getItem("LoggedTmcUser");
    if (loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser);
      const newToken = {
        token: parsedUser.token
      }
      const user = users.find(u => u.id === parsedUser.id)
      const updatedUser = { ...parsedUser, quests: user.quests }
      questService.setToken(newToken)
      this.setState({ user: updatedUser });
    }

    const quests = await questService.getAll();
    const sortedUsers = users.sort((a, b) => { return b.points - a.points })
    const updatedQuests = this.setQuestState(quests)
    this.setState({ quests: updatedQuests, users: sortedUsers });
  }

  setQuestState = (quests) => {
    let updatedQuests = []
    if (this.state.user !== null) {
      quests.forEach(q => {
        if (q.usersStarted.length !== 0) {
          q.usersStarted.forEach(us => {
            if (us.user === this.state.user.id && us.finishTime === null) {
              updatedQuests = updatedQuests.concat({ ...q, started: true })
            } else if (us.user === this.state.user.id && us.finishTime !== null) {
              updatedQuests = updatedQuests.concat({ ...q, finished: true })
            } else {
             updatedQuests = updatedQuests.concat(q)
            }
          })
        } else {
          updatedQuests = updatedQuests.concat(q)
        }
      })
    }
    return updatedQuests
  }

  handleQuestShowClick = id => {
    return () => {
      this.setState({
        quest: this.state.quests.find(q => q.id === id)
      });
    };
  };

  // To be implemented further
  handleStartQuest = async ({ quest }) => {
    const user = await questService.startQuest(quest.id)
    const quests = await questService.getAll()
    const updatedQuests = this.setQuestState(quests)
    this.setState({
      user: { ...user, token: this.state.user.token }, quests: updatedQuests
    })
  };

  handleDeleteQuest = id => {
    return () => {
      if (window.confirm("Do you want to delete this quest?")) {
        questService.remove(id).then(() => {
          const quests = this.state.quests.filter(quest => quest.id !== id);
          this.setState({
            quests: quests,
            showAll: true
          });
        });
      }
    };
  };

  handleCompleteQuest = async ({ quest }) => {
    const user = await questService.finishQuest(quest.id, this.state.activationCode)
    const quests = await questService.getAll()
    const updatedQuests = this.setQuestState(quests)
    this.setState({
      user: { ...user, token: this.state.user.token}, quests: updatedQuests, activationCode: ''
    })
  };

  createNewQuest = (newQuest) => {
    this.setState({
      quests: this.state.quests.concat(newQuest),
      message: `${newQuest.name} has been created.`
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 3000)
  };

  editQuest = (quest) => {
    let editedQuests = this.state.quests.map(q => q.id === quest.id ? quest : q)
    this.setState({
      quests: editedQuests,
      message: `${quest.name} has been edited.`,
      quest: null
    })
    setTimeout(() => {
      this.setState({ message: null })
    }, 3000)
  };

  handleDeactivate = async (id) => {
    const quest = await questService.deactivateQuest(id)
    const updatedQuests = this.state.quests.map(q => q.id === quest.id ? quest : q)
    this.setState({
      quest: quest,
      quests: updatedQuests,
      message: `'${quest.name}' deactivated`
    })
    setTimeout(() => {
      this.setState({ message: null})
    }, 3000)
  }

  handleActivationCodeChange = event => {
    this.setState({
      activationCode: event.target.value
    });
  };

  handleLogin = async (event) => {
    event.preventDefault();
    const user = {
      username: event.target.username.value,
      password: event.target.password.value
    };
    event.target.username.value = "";
    event.target.password.value = "";
    const response = await loginService.login(user);
    const cacheUser = { ...response.data.user, token: response.data.token }
    window.localStorage.setItem(
      "LoggedTmcUser",
      JSON.stringify(cacheUser)
    );
    const newToken = {
      token: response.data.token
    }
    questService.setToken(newToken)
    this.setState({
      user: cacheUser
    });
    this.componentWillMount()
  };

  handleLogout = () => {
    window.localStorage.removeItem("LoggedTmcUser")
    this.setState({
      user: null
    })
  }

  render() {
    const questById = id => this.state.quests.find(quest => quest.id === id);
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
          <Notification message={this.state.message} />
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
                    handleLogout={this.handleLogout}
                    user={this.state.user}
                  />)} />
              </div>
            )}
          <Footer user={this.state.user} users={this.state.users}/>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
