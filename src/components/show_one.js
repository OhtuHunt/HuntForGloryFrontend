import React from 'react'
import { Card, CardBody } from "react-simple-card";
import EditQuest from "./EditQuest"
import { Redirect } from 'react-router-dom'
// import questService from "../services/quests"

const ShowOne = ({ quest, state, handleDelete, handleStart, handleComplete, handleActivationCodeChange, editQuest, handleDeactivate }) => {
  if (quest === undefined) {
    return <Redirect to="/" />
  }

  if (quest.finished) {
    return (
      <div>
        <Card style={{ height: '100%' }} className="solo">
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} handleDeactivate={handleDeactivate} />
            <h2> Quest Completed! </h2>
          </CardBody>
        </Card>
      </div>
    )
  } else if (quest.started) {
    return (
      <div>
        <Card style={{ height: '100%' }} className="solo">
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} handleDeactivate={handleDeactivate} />
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
      <Card style={{ height: '100%' }} className="solo">
        <CardBody>
          <QuestInfo quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} handleDeactivate={handleDeactivate} />
          <ShowStartButton quest={quest} handleStart={handleStart} />
        </CardBody>
      </Card>
    </div>
  )
}

const questInfoStyle = {
  height: window.innerHeight * 0.4
}

const QuestInfo = ({ quest, state, handleDelete, editQuest, handleDeactivate }) => {
  return (
    <div>
      <AdminToolsForQuest quest={quest} state={state} handleDelete={handleDelete} editQuest={editQuest} handleDeactivate={handleDeactivate} />
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

const AdminToolsForQuest = ({ quest, state, handleDelete, editQuest, handleDeactivate }) => {
  if (state.user !== null) {
    if (state.user.admin) {
      return (
        <div>
          <button className="deleteQuest" onClick={handleDelete(quest.id)}>
            Delete
          </button>
          <br></br>
          <br></br>
          <EditQuest quest={quest} editQuest={editQuest} />
          <br></br>
          <br></br>
          <button className="deleteQuest" onClick={() => handleDeactivate(quest.id)}>Deactivate</button>
          <br></br>
          <br></br>
          {quest.deactivated === true ?
            <h2>DEACTIVATED</h2>
            :
            <div>
            </div>
          }
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
