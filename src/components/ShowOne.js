import React from 'react'
import { Card, CardBody } from 'react-simple-card';
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'
import AdminToolsForQuest from './AdminToolsForQuest'
import { finishQuest, startQuest, removeQuest, deactivateQuest } from '../reducers/questReducer'
import { notify } from '../reducers/notificationReducer'
import { updateUserPoints } from '../reducers/loggedUserReducer'
import QrCodeReader from './QrCodeReader'
import { setActivationCode, clearActivationCode } from '../reducers/activationCodeReducer'

class ShowOne extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      QR: false
    }
  }

  changeLoading = () => {
    this.setState({
      loading: this.state.loading === true ? false : true
    })
  }

  resize = () => {
    this.setState(this.state)
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize)
  }

  handleDeactivate = async (id) => {
    await this.props.deactivateQuest(id)
    this.props.notify(`Deactivated/activated this quest`, 4000)
  }

  handleDelete = async (id) => {
    if (window.confirm('Do you want to delete this quest?')) {
      await this.props.removeQuest(id)
    }
  }

  handleActivationCodeChange = event => {
    event.preventDefault()
    this.props.setActivationCode(event.target.value)
  }

  handleStartSubmit = async (event) => {
    event.preventDefault();
    this.changeLoading()
    //await this.handleStart(this.props.quest)
    await this.props.startQuest(this.props.loggedUser.id, this.props.quest.id)
    this.changeLoading()
  }

  handleCompleteSubmit = async (event) => {
    event.preventDefault()
    this.changeLoading()
    try {
      await this.props.finishQuest(this.props.loggedUser.id, this.props.quest.id, this.props.activationCode)
      await this.props.updateUserPoints(this.props.loggedUser.id)
      window.localStorage.setItem('LoggedTmcUser', JSON.stringify(this.props.loggedUser))
    } catch (exception) {
      console.log(exception)
      this.props.notify('Invalid activation code', 4000)
    }
    this.props.clearActivationCode()
    window.scrollTo(0, 0)
    this.changeLoading()
  }

  loadPosition = async () => {
    try {
      const position = await this.getCurrentPosition()
      const { latitude, longitude } = position.coords
      return {
        lat: latitude,
        lng: longitude
      }
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  handleLocationSubmit = async (event) => {
    event.preventDefault()
    this.changeLoading()

    const activationCode = await this.loadPosition()
    try {
      await this.props.finishQuest(this.props.loggedUser.id, this.props.quest.id, activationCode)
      await this.props.updateUserPoints(this.props.loggedUser.id)
      window.localStorage.setItem('LoggedTmcUser', JSON.stringify(this.props.loggedUser))
    } catch (exception) {
      this.props.notify(`Wrong location! ${activationCode.lat}, ${activationCode.lng}`, 4000)
    }
  }

  ShowStartButton = () => {
    let disabled = true
    this.props.loggedUser.courses.map(course => {
      if (course.id === this.props.quest.course.id) {
        disabled = false
      }
      return ''
    }
    )

    return (
      <div>
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name='circle' fadeIn='none' />
          </div>
          :
          <div>
            {disabled ?
              <div>
                Join course first
        </div>
              :
              <button className='startButton' onClick={this.handleStartSubmit}>
                Start quest
        </button>}

          </div>
        }
      </div>
    )
  }

  handleQR = () => {
    this.setState({
      QR: !this.state.QR
    })
  }
  ShowActivationCodeForm = () => {
    if (this.props.quest.type === 'location') {
      return (
        this.ShowLocationSubmitButton()
      )
    }

    return (
      <div className='activationCodeForm'>
        <input
          type='text'
          onChange={this.handleActivationCodeChange}
          name='activationCode'
          value={this.props.activationCode} />
        {this.state.loading === true ?
          <div style={{ marginLeft: '49%' }}>
            <Spinner name='circle' fadeIn='none' />
          </div>
          :
          <div>
            <button onClick={this.handleCompleteSubmit}> Complete </button>
            <br></br>
            {this.state.QR === true ? <div><QrCodeReader handleQR={this.handleQR.bind(this)} /><button onClick={this.handleQR}>Cancel</button></div> : <button onClick={this.handleQR}>Read QR</button>}
          </div>
        }
      </div>
    )
  }

  ShowLocationSubmitButton = () => {
    return (
      <div className='activationCodeForm'>
        <button onClick={this.handleLocationSubmit}> Complete location </button>
      </div>
    )
  }

  QuestInfo = () => {
    return (
      <div className='questInfo'>
        <AdminToolsForQuest quest={this.props.quest} handleDelete={this.handleDelete} handleDeactivate={this.handleDeactivate} />
        <h1> {this.props.quest.name} </h1>
        <h2>Course: {this.props.quest.course.name} </h2>
        <div className='soloDesc' style={{ height: window.innerHeight * 0.4 }}>{this.props.quest.description}</div>
      </div>
    )
  }
  render() {
    if (this.props.quest === undefined) {
      return <div style={{ paddingTop: '10%' }}>Quest has been deleted</div>
    }

    const showOneStyle = {
      height: window.innerHeight * 0.7,
      overflow: 'auto'
    }
    return (
      <div className='questStatus'>
        <Card style={{ height: '100%', width: 'auto' }}>
          <CardBody style={showOneStyle}>
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

export default connect(mapStateToProps, { finishQuest, startQuest, notify, updateUserPoints, setActivationCode, clearActivationCode, deactivateQuest, removeQuest })(ShowOne)