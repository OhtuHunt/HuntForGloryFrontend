import React from 'react'
import { Card, CardBody } from "react-simple-card";
import cardStyle from "./cardstyle"

const ShowOne = ({state, handleBack, handleStart, handleComplete, handleActivationCodeChange}) => {

  if (state.completed){
    return (
      <div>
        <Card style={cardStyle} className="solo">
          <CardBody>
            <QuestInfo state={state} handleBack={handleBack}/>
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
            <QuestInfo state={state} handleBack={handleBack}/>
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
          <QuestInfo state={state} handleBack={handleBack}/>
          <ShowStartButton handleStart={handleStart}/>
        </CardBody>
      </Card>
    </div>
  )
}

const QuestInfo = ({state, handleBack}) => {
  return (
    <div>
      <button className="backButton" onClick={handleBack}>
        <span>
          Go back
        </span>
      </button>
      <h1> {state.quest.name} </h1>
      <div className="soloDesc">{state.quest.description}</div>
    </div>
  )
}

const ShowActivationCodeForm = ({state, handleComplete, handleActivationCodeChange}) => {
  return (
    <div>
      <form onSubmit={handleComplete}>
        <input value={state.activationCode}
          onChange={handleActivationCodeChange}/>
        <button type="submit"> Complete </button>
      </form>
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

export default ShowOne
