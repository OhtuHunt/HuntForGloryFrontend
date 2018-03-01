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
    const quests = await questService.getAll();
    const users = await userService.getAll();
    const sortedUsers = users.sort((a, b) => {return b.points-a.points})
    this.setState({ quests: quests.data, users: sortedUsers });

    const loggedInUser = window.localStorage.getItem("LoggedTmcUser");
    if (loggedInUser !== null) {
      const parsedUser = JSON.parse(loggedInUser);
      this.setState({ user: parsedUser });
    }
  }

  handleQuestShowClick = id => {
    return () => {
      this.setState({
        quest: this.state.quests.find(q => q.id === id)
      });
    };
  };

  handleStartQuest = ({ quest }) => {
    quest.started = true;

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

  createNewQuest = (quest) => {
    this.setState({
      quests: this.state.quests.concat(quest),
      message: `${quest.name} has been created.`
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
    window.localStorage.setItem(
      "LoggedTmcUser",
      JSON.stringify(response.data.user)
    );
    questService.setToken(response.token)
    this.setState({
      user: response.data.user
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
                      handleDelete={this.handleDeleteQuest}
                    />
                  )}
                />
                <Route path="/leaderboard" render={() => (
                  <Leaderboard users={this.state.users}/>)} />
                <Route path="/userpage" render={() => (
                  <Userpage
                    createNewQuest={this.createNewQuest.bind(this)}
                    state={this.state}
                  />)} />
              </div>
            )}
          <Footer user={this.state.user} handleLogout={this.handleLogout} />
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
