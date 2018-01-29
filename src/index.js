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

const ShowOne = ({quest, handleBack}) => {
  return (
    <div>
      <button onClick={handleBack}>
        Go back
      </button>
      <Card>
        <CardBody>
          <h1> {quest.name} </h1>
          <div>{quest.description}</div>
        </CardBody>
      </Card>
    </div>
  )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quests: [{
    "id": 1,
    "name": "TestiQuest0",
    "description": "Tässä on kuvaus",
    "points": 900,
    "done": false,
    "__v": 0,
    "type": "Yksilöquest"
},{
    "id": 2,
    "name": "TestiQuest1",
    "description": "Tässä on kuvaus",
    "points": 92929,
    "done": false,
    "type": "Co-op quest"
}],
            showAll: true,
            quest: null
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
          showAll: true
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
          <ShowOne quest={this.state.quest} handleBack={this.handleBackButtonClick}/>
        </div>
      )
    }
};

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
