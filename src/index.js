import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import React from "react";
import ReactDOM from "react-dom";
import { Card, CardBody } from "react-simple-card";
import axios from "axios";

const GenerateCard = ({ title, questType, points, clickHandler}) => {
    return (
        <div>
            <button style={{width:'100%'}} onClick={clickHandler}>
                <Card>
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
            </button>
        </div>
    );
};

const ShowOne = ({state, handleBack, handleStart, handleComplete}) => {

  if (state.started) {
    return (
      <div>
        <Card>
          <CardBody>
            <button type="submit" onClick={handleBack}>
              Go back
            </button>
            <h1> {state.quest.name} </h1>
            <div>{state.quest.description}</div>
            <form onSubmit={handleComplete}>
              <input value={state.activationCode} />

              <button type="submit"> Complete </button>

            </form>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card>
        <CardBody>
          <button type="submit" onClick={handleBack}>
            Go back
          </button>
          <h1> {state.quest.name} </h1>
          <div>{state.quest.description}</div>
          <div>
            <button onClick={handleStart}>
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
            activationCode: ''
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
          started: false
        })
    }

    handleStartQuest = () => {
      this.setState({
        started: true
      })
    }

    handleCompleteQuest = () => {
      this.setState({

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
          <ShowOne state={this.state} handleBack={this.handleBackButtonClick} handleStart={this.handleStartQuest} handleComplete={this.handleCompleteQuest}/>
        </div>
      )
    }
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
