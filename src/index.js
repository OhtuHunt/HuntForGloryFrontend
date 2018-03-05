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
    const loggedInUser = window.localStorage.getItem("LoggedTmcUser");
    if (loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser);
      const newToken = {
        token: parsedUser.token
      }
      questService.setToken(newToken)
      this.setState({ user: parsedUser });
    }

    const quests = await questService.getAll();
    const users = await userService.getAll();
    const sortedUsers = users.sort((a, b) => { return b.points - a.points })
    this.setState({ quests: quests, users: sortedUsers });
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
    // quest.started = true;
    console.log(this.state.user.token)
    await questService.startQuest(quest.id)
      // .update(quest.id, quest)
      // .then(updatedQuest => {
      //   this.setState({
      //     quests: this.state.quests.map(
      //       q => (q.id !== quest.id ? q : updatedQuest)
      //     )
      //   });
      // })
      // .catch(error => {
      //   // this.createNewQuest({})
      // });
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

  handleCompleteQuest = ({ quest }) => {
    if (quest.activationCode === this.state.activationCode) {
      this.setState({
        activationCode: ""
      });

      quest.done = true;

      questService
        .update(quest.id, quest)
        .then(updatedQuest => {
          this.setState({
            quests: this.state.quests.map(
              q => (q.id !== quest.id ? q : updatedQuest)
            )
          });
        })
        .catch(error => {
          // this.createNewQuest({})
        });
    } else {
      window.alert("Incorrect activation code!");
    }
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
    console.log(response.data.token)
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
                    />
                  )}
                />
                <Route path="/leaderboard" render={() => (
                  <Leaderboard users={this.state.users} />)} />
                <Route path="/userpage" render={() => (
                  <Userpage
                    createNewQuest={this.createNewQuest.bind(this)}
                    state={this.state}
                  />)} />
              </div>
            )}
          <Footer user={this.state.user} users={this.state.users} handleLogout={this.handleLogout} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
