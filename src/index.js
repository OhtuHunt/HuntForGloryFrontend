import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { Card, CardBody } from "react-simple-card";
import axios from "axios";

const GenerateCard = ({ title, questType, points, clickHandler}) => {
    return (
        <div onClick={clickHandler} style={{cursor: 'pointer'}}>
                <Card className="listingCard">
                    <CardBody>
                        <h2>{title}</h2>
                        <table style={{width: '100%'}}>
                            <tbody>
                                <tr>
                                    <td className="questType">{questType}</td>
                                    <td className="points">{points}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
        </div>
    );
};

const cardStyle = {
  height: window.innerHeight * 0.75,

}

const ShowOne = ({state, handleBack, handleStart, handleComplete, handleActivationCodeChange}) => {

  if (state.completed){
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <button type="submit" onClick={handleBack}>
              Go back
            </button>
            <h1> {state.quest.name} </h1>
            <div className="soloDesc">{state.quest.description}</div>
            <h2> Quest Completed! </h2>
          </CardBody>
        </Card>
      </div>
    )
  } else if (state.started) {
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <button type="submit" onClick={handleBack}>
              Go back
            </button>
            <h1> {state.quest.name} </h1>
            <div className="soloDesc">{state.quest.description}</div>
            <form onSubmit={handleComplete}>
              <input value={state.activationCode}
                     onChange={handleActivationCodeChange}/>
              <button type="submit"> Complete </button>
            </form>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card style={cardStyle} className="solo">
        <CardBody>
          <button type="submit" onClick={handleBack}>
            Go back
          </button>
          <h1> {state.quest.name} </h1>
          <div className="soloDesc">{state.quest.description}</div>
          <div>
            <button className="startButton" onClick={handleStart}>
              Start quest
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

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
          {this.state.quests.map(quest => <GenerateCard
            key={quest.id}
            title={quest.name}
            questType={quest.type}
            points={quest.points}
            clickHandler ={this.handleQuestShowClick(quest.id)}
            />)}
          </div>
          )
      }

      return (
        <div>
          <ShowOne state={this.state} handleBack={this.handleBackButtonClick}
           handleStart={this.handleStartQuest}
           handleComplete={this.handleCompleteQuest}
           handleActivationCodeChange={this.handleActivationCodeChange}/>
        </div>
      )
    }
};

const footerTable = {
  width: window.innerWidth,
}

const Footer = () => {
  return (
      <table style={footerTable}>
        <tbody>
          <tr>
            <td>
                Pisteet: 0
            </td>
            <td>
                Rank: 1
            </td>
            <td>
                Status: active
            </td>
          </tr>
        </tbody>
      </table>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Footer />, document.getElementById("footer"));
registerServiceWorker();
