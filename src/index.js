import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import Footer from "./components/footer"
import ShowOne from "./components/show_one"
import ShowAll from "./components/show_all"
import Leaderboard from "./components/leaderboard"
import Userpage from "./components/userpage"
import questService from "./services/quests"
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import LoginForm from "./components/loginForm";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: [],
      quest: null,
      started: false,
      activationCode: '',
      completed: false,
      user: null
    }
  }

  async componentWillMount() {
    const response = await questService.getAll()
    this.setState({ quests: response.data })

    const loggedInUser = window.localStorage.getItem("LoggedTmcUser")
    if (loggedInUser) {
      this.setState({ user: loggedInUser })
    }
  }

  handleQuestShowClick = (id) => {
    return () => {
      this.setState({
        quest: this.state.quests.find(q => q.id === id)
      })
    }
  }

  handleStartQuest = ({quest}) => {
    quest.started = true

    questService
      .update(quest.id, quest)
      .then(updatedQuest => {
        this.setState({
          quests: this.state.quests.map(q => q.id !== quest.id ? q : updatedQuest),
        })
      })
      .catch(error => {
        // this.createNewQuest({})
      })

    this.setState({
      started: true
    })
  }

  handleDeleteQuest = (id) => {
    return () => {
      if (window.confirm("Do you want to delete this quest?")) {
        questService
          .remove(id)
          .then(() => {
            const quests = this.state.quests.filter(quest => quest.id !== id)
            this.setState({
              quests: quests,
              showAll: true
            })
          })
      }
    }
  }

  handleCompleteQuest = ({ quest }) => {

    if (quest.activationCode === this.state.activationCode) {
      this.setState({
        completed: true,
        activationCode: ''
      })

      quest.done = true

      questService
        .update(quest.id, quest)
        .then(updatedQuest => {
          this.setState({
            quests: this.state.quests.map(q => q.id !== quest.id ? q : updatedQuest),
          })
        })
        .catch(error => {
          // this.createNewQuest({})
        })
    } else {
      window.alert("Incorrect activation code!")
    }
  }

  //In progress
  createNewQuest = (quest) => {
    questService
      .create(quest)
      .then(quest => {
        this.setState({
          quests: this.state.quests.filter(q => q.id !== quest.id).concat(quest),
        })
      })
  }

  handleActivationCodeChange = (event) => {
    this.setState({
      activationCode: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()

    // to be further implemented
    console.log(event.target.username.value)
    event.target.username.value = ''
    event.target.password.value = ''
  }

  render() {

    const questById = (id) =>
      this.state.quests.find(quest => quest.id === id)

    return (
      <HashRouter>
        <div>
          <h1 className="header__title">Hunt for Glory</h1>
          <div className="header">
            <ul className="headerButtons">
              <li><NavLink exact to="/">Quests</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
              <li><NavLink to="/userpage">Userpage</NavLink></li>
            </ul>
          </div>
          {this.state.user === null ? 
          <div className="login">
            
              <LoginForm handleLogin={this.handleLogin}/>
            
          </div>
          :
          <div className="content">
            <Route exact path="/" render={() =>
              <ShowAll state={this.state} handleQuestShowClick={this.handleQuestShowClick} />
            } />
            <Route exact path="/quests/:id" render={({ match }) => <ShowOne quest={questById(match.params.id)} state={this.state}
              handleStart={this.handleStartQuest}
              handleComplete={this.handleCompleteQuest}
              handleActivationCodeChange={this.handleActivationCodeChange}
              handleDelete={this.handleDeleteQuest} />
            } />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/userpage" component={Userpage} />
          </div>
          }
          <Footer />
        </div>
      </HashRouter>
    )
  }
};

ReactDOM.render(<App />, document.getElementById("root"));