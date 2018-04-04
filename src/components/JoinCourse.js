import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { joinCourse } from '../reducers/courseReducer'
import { connect } from 'react-redux'
import "../index.css";


class JoinCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courseId: this.props.courses[0] ? this.props.courses[0].id : ''
        }
        this.handleExit = props.handleExit
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.JoinCourse.toggleVisibility()
        this.props.joinCourse(this.state.courseId)
        this.props.notify(`Joined course`)
        this.setState({
            courseId: ''
        })
        if (this.props.startVisible) {
            this.props.handleExit()
        }
    }

    render() {
        return (
            <Toggleable buttonLabel="Join course" cancelButtonLabel='Cancel' startVisible={this.props.startVisible} ref={component => this.JoinCourse = component}>
                <div className="createform">
                    <h2> Join Course </h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">

                            <p>course</p>
                            <select name="courseId" value={this.state.course} onChange={this.handleChange}>
                                {this.props.courses.map(function (course) {
                                    return (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <button type="submit">Join</button>
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

export default connect(mapStateToProps,
    { joinCourse, notify })(JoinCourse)