import React from 'react'
import { Card, CardBody } from "react-simple-card";
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import AdminToolsForQuest from './AdminToolsForQuest'

class ShowOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.handleDelete = this.props.handleDelete
    this.handleDeactivate = this.props.handleDeactivate
    this.handleActivationCodeChange = this.props.handleActivationCodeChange
    this.handleStart = this.props.handleStart
    this.handleComplete = this.props.handleComplete
  }

  changeLoading = () => {
    this.setState({
      loading: this.state.loading === true ? false : true
    })
  }

  handleStartSubmit = async (event) => {
    event.preventDefault();
    this.changeLoading()
    await this.handleStart(this.props.quest)
    this.changeLoading()
  }

  handleCompleteSubmit = async (event) => {
    event.preventDefault()
    this.changeLoading()
    await this.handleComplete(this.props.quest)
    this.changeLoading()
  }

  ShowStartButton = () => {
    return (
      <div>
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name="circle" fadeIn="none" />
          </div>
          :
          <div>
            <button className="startButton" onClick={this.handleStartSubmit}>
              Start quest
        </button>
          </div>
        }
      </div>
    )
  }

  ShowActivationCodeForm = () => {
    return (
      <div className="activationCodeForm">
        <input
          type="text"
          onChange={this.handleActivationCodeChange}
          name="activationCode" />
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name="circle" fadeIn="none" />
          </div>
          :
          <div>
            <button onClick={this.handleCompleteSubmit}> Complete </button>
          </div>
        }
      </div>
    )
  }

  QuestInfo = () => {
    return (
      <div>
        <AdminToolsForQuest quest={this.props.quest} handleDelete={this.handleDelete} store={this.props.store} handleDeactivate={this.handleDeactivate} />
        <h1> {this.props.quest.name} </h1>
        <div className="soloDesc" style={{ height: window.innerHeight * 0.4 }}>{this.props.quest.description}</div>
      </div>
    )
  }



  render() {
    if (this.props.quest === undefined) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <Card style={{ height: '100%', width: 'auto' }}>
          <CardBody>
            {this.QuestInfo()}
            {this.props.quest.finished === true ?
              <h2> Quest Completed! </h2>
              :
              <div> {this.props.quest.deactivated === true ?
                <div> This quest has been deactivated </div>
                :
                <div>{this.props.quest.started === true ?
                  <div>{this.ShowActivationCodeForm()}</div>
                  :
                  <div>{this.ShowStartButton()}</div>}</div>}</div>}
          </CardBody>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    activationCode: state.activationCode,
    loggedUser: state.loggedUser,
    quests: state.quests
  }
}

export default connect(mapStateToProps)(ShowOne)
