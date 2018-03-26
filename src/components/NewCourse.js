import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { createCourse } from '../reducers/courseReducer'
import { connect } from 'react-redux'
import "../index.css";

const CourseForm = ({ onSubmit, handleChange, name, courseCode }) => {
    return (
        <div className="createform">
            <h2>create new course</h2>

            <form onSubmit={onSubmit}>
                <div>
                    <p>name</p>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p>course code</p>
                    <input
                        type="textarea"
                        name="courseCode"
                        value={courseCode}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

class NewCourse extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            courseCode: ""
        }
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    addCourse = async (event) => {
        event.preventDefault()
        this.CourseForm.toggleVisibility()
        const courseObject = {
            name: this.state.name,
            courseCode: this.state.courseCode
        }

        this.props.createCourse(courseObject)
        this.props.notify(`${courseObject.name} has been created.`, 5000)

        this.setState({
            name: "",
            courseCode: ""
        })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <div>
                <Toggleable buttonLabel="new course" ref={component => this.CourseForm = component}>
                    <CourseForm
                        onSubmit={this.addCourse}
                        handleChange={this.handleChange}
                        name={this.state.name}
                        courseCode={this.state.courseCode}
                    />
                </Toggleable>
            </div>
        )


    }
}

export default connect(null,
    { createCourse, notify })(NewCourse)