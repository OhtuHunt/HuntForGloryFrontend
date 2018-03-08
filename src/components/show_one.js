import React from 'react'
import { Card, CardBody } from "react-simple-card";
import cardStyle from "./cardstyle"
import EditQuest from "./EditQuest"
import { Redirect } from 'react-router-dom'
// import questService from "../services/quests"

const ShowOne = ({ quest, state, handleDelete, handleStart, handleComplete, handleActivationCodeChange, editQuest }) => {
  if (quest === undefined) {
    return <Redirect to="/" />
  }

  if (quest.finished) {
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} />
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
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} />
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
          <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} />
          <ShowStartButton quest={quest} handleStart={handleStart} />
        </CardBody>
      </Card>
    </div>
  )
}

const questInfoStyle = {
  height: window.innerHeight * 0.4
}

const QuestInfo = ({ quest, state, handleDelete, editQuest }) => {
  return (
    <div>
      <AdminToolsForQuest quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} />
      <h1> {quest.name} </h1>
      <div className="soloDesc" style={questInfoStyle}>{quest.description}</div>
    </div>
  )
}

const ShowActivationCodeForm = ({ quest, state, handleComplete, handleActivationCodeChange }) => {
  return (
    <div className="activationCodeForm">
      <input value={state.activationCode}
        onChange={handleActivationCodeChange} />
      <button onClick={() => handleComplete({ quest })}> Complete </button>
    </div>
  )
}

const ShowStartButton = ({ quest, handleStart }) => {
  return (
    <div>
      <button className="startButton" onClick={() => handleStart({ quest })}>
        Start quest
      </button>
    </div>
  )
}

const AdminToolsForQuest = ({ quest, state, handleDelete, editQuest }) => {
  if (state.user !== null) {
    if (state.user.admin) {
      return (
        <div>
          <button className="deleteQuest" onClick={handleDelete(quest.id)}>
            Delete
          </button>
          <EditQuest quest={quest} editQuest={editQuest} />
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
