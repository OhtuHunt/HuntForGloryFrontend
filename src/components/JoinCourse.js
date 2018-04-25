import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { joinCourse } from '../reducers/courseReducer'
import { initializeQuests } from '../reducers/questReducer'
import { connect } from 'react-redux'
import Spinner from 'react-spinkit'


class JoinCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            courseId: this.props.courses[0] ? this.props.courses[0].id : '',
            loading: false
        }
        this.handleExit = props.handleExit
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.changeLoading()
        try {
            await this.props.joinCourse(this.state.courseId, this.props.loggedUser.id)
            window.localStorage.setItem('LoggedTmcUser', JSON.stringify(this.props.loggedUser))
        } catch (exception) {
            console.log(exception)
            this.props.notify(`You're already on this course!`, 4000)
            this.changeLoading()
            window.scrollTo(0, 0)
            return
        }
        if (!this.props.startVisible) {
            this.JoinCourse.toggleVisibility()
        }
        await this.props.initializeQuests()
        this.props.notify(`Joined course`, 4000)

        this.setState({
            courseId: this.props.courses[0] ? this.props.courses[0].id : ''
        })
        this.changeLoading()
        if (this.props.startVisible) {
            this.props.handleExit()
        }
        window.scrollTo(0, 0)
    }

    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
    }

    render() {
        return (
            <Toggleable buttonLabel="Join course" cancelButtonLabel='Cancel' startVisible={this.props.startVisible} ref={component => this.JoinCourse = component}>
                <div className="createform">
                    <h2> Join Course </h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">

                            <p>course</p>
                            <select name="courseId" value={this.state.courseId} onChange={this.handleChange}>
                                {this.props.courses.map(function (course) {
                                    return (
                                        <option key={course.id} value={course.id}>{course.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {this.state.loading ?
                            <div style={{ marginLeft: '49%' }}>
                                <Spinner name="circle" fadeIn="none" />
                            </div>
                            :
                            <button type="submit">Join</button>}
                    </form>
                </div>
            </Toggleable>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses,
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps,
    { joinCourse, notify, initializeQuests })(JoinCourse)