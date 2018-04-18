import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Toggleable from '../components/Toggleable'
import subscriptionservice from '../services/subscription'


class PushNotificationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: this.props.courses[0] ? this.props.courses[0].id : '',
            message: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const notification = {
                course: this.state.course,
                dataToSend: this.state.message
            }
            const response = await subscriptionservice.sendPushNotification(notification)
            console.log(response)
            this.props.notify(`'${this.state.message}' sent as push notification`, 5000)
        } catch (exception) {
            this.props.notify('Something went wrong, notification not sent', 5000)
        }
    }

    render() {
        return (
            <Toggleable buttonLabel="Send push notification" cancelButtonLabel='Cancel' startVisible={this.props.startVisible} ref={component => this.PushNotificationForm = component}>
                <div className='createform'>
                    <form onSubmit={this.handleSubmit}>
                        <label>Course</label>
                        <br></br>
                        <select name="courseId" value={this.state.course} onChange={this.handleChange}>
                            {this.props.courses.map(function (course) {
                                return (
                                    <option key={course.id} value={course.id}>{course.name}</option>
                                )
                            })}
                        </select>
                        <br></br>
                        <label>Message to send</label>
                        <br></br>
                        <input style={{textAlign: 'center'}} type='text' name='message' placeholder='Message to send' value={this.state.message} onChange={this.handleChange}></input>
                        <br></br>
                        <button type='submit'>Send</button>
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