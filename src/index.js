import "./index.css";
// import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
// import Header from "./components/header"
import Footer from "./components/footer"
import ShowOne from "./components/show_one"
import ShowAll from "./components/show_all"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quests: [],
      showAll: true,
      quest: null,
      started: false,
      activationCode: '',
      completed: false
    }
  }

  componentWillMount() {
    axios
      .get('https://huntforglory.herokuapp.com/api/quests')
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
    if (this.state.showAll === true) {
      return (
        <div>
          <ShowAll state={this.state} handleQuestShowClick={this.handleQuestShowClick} />
        </div>
      )
    }

    return (
      <div>
        <ShowOne state={this.state} handleBack={this.handleBackButtonClick}
          handleStart={this.handleStartQuest}
          handleComplete={this.handleCompleteQuest}
          handleActivationCodeChange={this.handleActivationCodeChange} />
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.render(<Header />, document.getElementById("header"));
ReactDOM.render(<Footer />, document.getElementById("footer"));
// registerServiceWorker();
