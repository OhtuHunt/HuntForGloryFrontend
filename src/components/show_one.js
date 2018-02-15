import React from 'react'
import { Card, CardBody } from "react-simple-card";
import cardStyle from "./cardstyle"
import questService from "../services/quests"

const ShowOne = ({state, handleDelete, handleStart, handleComplete, handleActivationCodeChange}) => {
  
  if (state.completed){
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <QuestInfo state={state} handleDelete={handleDelete}/>
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
            <QuestInfo state={state} handleDelete={handleDelete}/>
            <ShowActivationCodeForm state={state}
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
          <QuestInfo state={state} handleDelete={handleDelete}/>
          <ShowStartButton handleStart={handleStart}/>
        </CardBody>
      </Card>
    </div>
  )
}

const QuestInfo = ({state, handleDelete}) => {
  return (
    <div>
      <AdminToolsForQuest state={state} handleDelete={handleDelete} />
      <h1> {state.quest.name} </h1>
      <div className="soloDesc">{state.quest.description}</div>
    </div>
  )
}

const ShowActivationCodeForm = ({state, handleComplete, handleActivationCodeChange}) => {
  return (
    <div>
      {/* <form onSubmit={handleComplete}> */}

        <input value={state.activationCode}
          onChange={handleActivationCodeChange}/>
        <button type="submit"> Complete </button>
    </div>
  )
}

const ShowStartButton = ({handleStart}) => {
  return (
    <div>
      <button className="startButton" onClick={handleStart}>
        Start quest
      </button>
    </div>
  )
}

const AdminToolsForQuest = ({state, handleDelete}) => {
  if (state.user !== null) {
    if (state.user.admin) {
      return (
        <div>
          <button className="deleteQuest" onClick={handleDelete(state.quest.id)}>
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
