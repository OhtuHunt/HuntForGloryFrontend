import React from 'react'
import { Card, CardBody } from "react-simple-card";
import EditQuest from "./EditQuest"
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'

const ShowOne = ({ quest, state, handleDelete, handleStart, handleComplete, handleActivationCodeChange, handleDeactivate, store }) => {
  if (quest === undefined) {
    return <Redirect to="/" />
  }

  if (quest.finished) {
    return (
      <div>
        <Card style={{ height: '100%', width: 'auto' }}>
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} store={store} handleDeactivate={handleDeactivate} />
            <h2> Quest Completed! </h2>
          </CardBody>
        </Card>
      </div>
    )
  } else if (quest.started) {
    return (
      <div>
        <Card style={{ height: '100%', width: 'auto' }}>
          <CardBody>
            <QuestInfo quest={quest} state={state} handleDelete={handleDelete} store={store} handleDeactivate={handleDeactivate} />
            <ShowActivationCodeForm quest={quest} state={state} handleComplete={handleComplete} store={store}
              handleActivationCodeChange={handleActivationCodeChange}
            />
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <Card style={{ height: '100%', width: 'auto' }}>
        <CardBody>
          <QuestInfo quest={quest} state={state} handleDelete={handleDelete} store={store} handleDeactivate={handleDeactivate} />
          <ShowStartButton quest={quest} handleStart={handleStart} />
        </CardBody>
      </Card>
    </div>
  )
}

const questInfoStyle = {
  height: window.innerHeight * 0.4
}

const QuestInfo = ({ quest, state, handleDelete, store, handleDeactivate }) => {
  return (
    <div>
      <AdminToolsForQuest quest={quest} state={state} handleDelete={handleDelete} store={store} handleDeactivate={handleDeactivate} />
      <h1> {quest.name} </h1>
      <div className="soloDesc" style={questInfoStyle}>{quest.description}</div>
    </div>
  )
}

class ShowActivationCodeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.state,
      quest: this.props.quest,
      loading: false,
      activationCode: ''
    }
    this.handleComplete = this.props.handleComplete
    this.store = this.props.store
  }

  changeLoading = () => {
    this.setState({
      loading: this.state.loading === true ? false : true
    })
  }

  handleChange = (event) => {
    this.setState({ activationCode: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.changeLoading()
    await this.handleComplete(this.state.quest)
    this.changeLoading()
  }

  render() {
    return (
      <div className="activationCodeForm">
        <input
          type="text"
          onChange={this.handleChange}
          name="activationCode" />
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name="circle" fadeIn="none" />
          </div>
          :
          <div>
            <button onClick={this.handleSubmit}> Complete </button>
          </div>
        }
      </div>
    )
  }
}

class ShowStartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quest: this.props.quest,
      loading: false
    }
    this.handleStart = this.props.handleStart
  }

  changeLoading = () => {
    this.setState({
      loading: this.state.loading === true ? false : true
    })
  }

  handleChange = (event) => {
    this.setState({ activationCode: event.target.value })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    this.changeLoading()
    await this.handleStart(this.state.quest)
    this.changeLoading()
  }

  render() {
    return (
      <div>
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name="circle" fadeIn="none" />
          </div>
          :
          <div>
            <button className="startButton" onClick={this.handleSubmit}>
              Start quest
        </button>
          </div>
        }
      </div>
    )
  }
}

const AdminToolsForQuest = ({ quest, state, handleDelete, store, handleDeactivate }) => {
  if (state.user !== null) {
    if (state.user.admin) {
      return (
        <div>
          <button className="deleteQuest" onClick={() => handleDelete(quest.id)}>
            Delete
          </button>
          <br></br>
          <br></br>
          <EditQuest quest={quest} store={store} />
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

const mapStateToProps = (state) => {
  return {
    activationCode: state.activationCode
  }
}

export default connect(mapStateToProps)(ShowOne)
