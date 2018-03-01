import React from 'react'
import { Card, CardBody } from "react-simple-card";
import cardStyle from "./cardstyle"
// import questService from "../services/quests"

const ShowOne = ({quest, state, handleDelete, handleStart, handleComplete, handleActivationCodeChange}) => {

  if (quest.done){
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete}/>
            <h2> Quest Completed! </h2>
          </CardBody>
        </Card>
      </div>
    )
  } else if (quest.started) {
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete}/>
            <ShowActivationCodeForm quest={quest} state={state} handleComplete={handleComplete}
              handleActivationCodeChange={handleActivationCodeChange}
            />
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card style={cardStyle} className="solo">
        <CardBody>
          <QuestInfo quest={quest} state={state} handleDelete={handleDelete}/>
          <ShowStartButton quest={quest} handleStart={handleStart}/>
        </CardBody>
      </Card>
    </div>
  )
}

const questInfoStyle = {
  height: window.innerHeight * 0.4
}

const QuestInfo = ({quest, state, handleDelete}) => {
  return (
    <div>
      <AdminToolsForQuest quest={quest} state={state} handleDelete={handleDelete} />
      <h1> {quest.name} </h1>
      <div className="soloDesc" style={questInfoStyle}>{quest.description}</div>
    </div>
  )
}

const ShowActivationCodeForm = ({ quest, state, handleComplete, handleActivationCodeChange}) => {
  return (
    <div className="activationCodeForm">
        <input value={state.activationCode}
          onChange={handleActivationCodeChange}/>
        <button onClick={() => handleComplete({quest})}> Complete </button>
    </div>
  )
}

const ShowStartButton = ({ quest, handleStart }) => {
  return (
    <div>
      <button className="startButton" onClick={() => handleStart({quest})}>
        Start quest
      </button>
    </div>
  )
}

const AdminToolsForQuest = ({quest, state, handleDelete}) => {
  if (state.user !== null) {
    if (state.user.admin) {
      return (
        <div>
          <button className="deleteQuest" onClick={handleDelete(quest.id)}>
            Delete
          </button>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default ShowOne
