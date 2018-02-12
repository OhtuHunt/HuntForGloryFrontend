import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import Header from "./components/header"
import Footer from "./components/footer"
import ShowOne from "./components/show_one"
import ShowAll from "./components/show_all"
import questService from "./services/quests"
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

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
      }
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
    return (
      <div>
        <header className="header">
          <div id="header">
            <Header handleShowAll={this.handleShowAll} />
          </div>
        </header>
        {/*------ ROUTER ------ */}
        <Router>
          <div>
            <Route exact path="/" render={() => (<ShowAll state={this.state} handleQuestShowClick={this.handleQuestShowClick} />)} />
          </div>
        </Router>
        {/*------/ROUTER ------ */}
        <footer class="footer">
          <div id="footer"><Footer /></div>
        </footer>
      </div>
    )
  }
};



ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Header />, document.getElementById("header"));
// registerServiceWorker();
