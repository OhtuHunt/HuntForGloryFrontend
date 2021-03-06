import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Toggleable from '../components/Toggleable'
import subscriptionservice from '../services/subscription'
import Spinner from 'react-spinkit'


class PushNotificationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: this.props.courses[0] ? this.props.courses[0].id : '',
            message: '',
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.changeLoading()
        try {
            const notification = {
                course: this.state.course,
                dataToSend: this.state.message
            }
            const response = await subscriptionservice.sendPushNotification(notification)
            console.log(response)
            this.props.notify(`'${this.state.message}' sent as push notification`, 5000)
            window.scrollTo(0, 0)
            this.setState({
                message: ''
            })
            this.PushNotificationForm.toggleVisibility()
        } catch (exception) {
            this.props.notify('Something went wrong, notification not sent', 5000)
        }
        this.changeLoading()
    }

    render() {
        return (
            <Toggleable buttonLabel='Send push notification' cancelButtonLabel='Cancel' startVisible={this.props.startVisible} ref={component => this.PushNotificationForm = component}>
                <div className='createform'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Course</label>
                        <br></br>
                        <select name='course' value={this.state.course} onChange={this.handleChange}>
                            {this.props.courses.map(function (course) {
                                return (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                )
                            })}
                        </select>
                        <br></br>
                        <label>Message to send</label>
                        <br></br>
                        <input style={{ textAlign: 'center' }} type='text' name='message' placeholder='Message to send' value={this.state.message} onChange={this.handleChange}></input>
                        <br></br>
                        {this.state.loading ?
                            <div style={{ marginLeft: '49%' }}>
                                <Spinner name='circle' fadeIn='none' />
                            </div>
                            : 
                            <button type='submit'>Send</button>}
                    </form>
                </div>
            </Toggleable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps, { notify })(PushNotificationForm)