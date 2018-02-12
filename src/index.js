import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header"
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

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: [],
      showAll: true,
      quest: null,
      started: false,
      activationCode: '',
      completed: false,
      user: {
        admin: true
      },
      router: true
    }
  }

  componentWillMount() {
    questService
      .getAll()
      .then(response => {
        this.setState({ quests: response.data })
      })
  }

  handleQuestShowClick = (id) => {
    return () => {
      this.setState({
        quest: this.state.quests.find(q => q.id === id),
        showAll: false
      })
    }
  }

  handleBackButtonClick = () => {
    this.setState({
      quest: null,
      showAll: true,
      started: false,
      completed: false,
      activationCode: ''
    })
  }

  handleShowAll = () => {
    return () => {
      this.setState({
        quest: null,
        showAll: true,
        started: false,
        completed: false,
        activationCode: ''
      })
    }
  }

  handleStartQuest = () => {
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

  handleCompleteQuest = (event) => {
    event.preventDefault()
    if (this.state.quest.activationCode === this.state.activationCode) {
      this.setState({
        completed: true,
        activationCode: ''
      })
    } else {
      window.alert("Incorrect activation code!")
    }
  }

  handleActivationCodeChange = (event) => {
    this.setState({
      activationCode: event.target.value
    })
  }

  render() {
    if (this.state.router === true) {
      return (
        <HashRouter>
          <div>
            <ul className="header">
              <h1 className='header__title'>Hunt for Glory</h1>
              <li><NavLink exact to="/">Quests</NavLink></li>
              <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
              <li><NavLink to="/userpage">Userpage</NavLink></li>
            </ul>
            <div className="content">
              <Route exact path="/" render={() => this.state.showAll ? 
                <ShowAll state={this.state} handleQuestShowClick={this.handleQuestShowClick} />
                : <ShowOne state={this.state} handleBack={this.handleBackButtonClick}
                  handleStart={this.handleStartQuest}
                  handleComplete={this.handleCompleteQuest}
                  handleActivationCodeChange={this.handleActivationCodeChange}
                  handleDelete={this.handleDeleteQuest} />} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/userpage" component={Userpage} />
            </div>
            <footer class="footer">
              <div id="footer"><Footer /></div>
            </footer>
          </div>

        </HashRouter>
      )
    } else {
      if (this.state.showAll === true) {
        return (

          <div>
            <header className="header">
              <div id="header">
                <Header handleShowAll={this.handleShowAll} />
              </div>
            </header>
            <ShowAll state={this.state} handleQuestShowClick={this.handleQuestShowClick} />
            <footer class="footer">
              <div id="footer"><Footer /></div>
            </footer>
          </div>
        )
      }

      return (
        <div>
          <header className="header">
            <div id="header">
              <Header handleShowAll={this.handleShowAll} />
            </div>
          </header>
          <ShowOne state={this.state} handleBack={this.handleBackButtonClick}
            handleStart={this.handleStartQuest}
            handleComplete={this.handleCompleteQuest}
            handleActivationCodeChange={this.handleActivationCodeChange}
            handleDelete={this.handleDeleteQuest} />
          <footer class="footer">
            <div id="footer"><Footer /></div>
          </footer>
        </div>
      )
    }
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Header />, document.getElementById("header"));
// registerServiceWorker();