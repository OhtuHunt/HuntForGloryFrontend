import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { createQuest } from '../reducers/questReducer'
import { connect } from 'react-redux'
import "../index.css";

const QuestForm = ({ onSubmit, handleChange, name, description, points, type, activationCode, course, courses }) => {
    return (
        <div className="createform">
            <h2>create new quest</h2>

            <form onSubmit={onSubmit}>

                <div className="form-group">

                    <p>course</p>
                    <select name="course" value={course} onChange={handleChange}>
                        {courses.map(function (course) {
                            return (
                                <option key={course.id} value={course.id}>{course.name}</option>
                            )
                        })}
                    </select>
                </div>

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
                    <p>description</p>
                    <input
                        type="textarea"
                        name="description"
                        value={description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p>points</p>
                    <input
                        type="number"
                        name="points"
                        value={points}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p>type</p>
                    <input
                        type="text"
                        name="type"
                        value={type}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p>activationcode</p>
                    <input
                        type="text"
                        name="activationCode"
                        value={activationCode}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

class NewQuest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            description: "",
            points: 0,
            type: "",
            activationCode: "",
            course: ""
        }
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    addQuest = async (event) => {
        event.preventDefault()
        console.log(this.state.course)
        this.questForm.toggleVisibility()
        const questObject = {
            name: this.state.name,
            description: this.state.description,
            points: this.state.points,
            type: this.state.type,
            activationCode: this.state.activationCode,
            course: this.state.course
        }

        this.props.createQuest(questObject)
        this.props.notify(`${questObject.name} has been created.`, 5000)

        this.setState({
            name: "",
            description: "",
            points: "",
            type: "",
            activationCode: "",
            course: ""
        })
    }

    handleQuestChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        console.log("courses")
        console.log(this.props.courses)
        return (
            <div>
                <Toggleable buttonLabel="new quest" ref={component => this.questForm = component}>
                    <QuestForm
                        onSubmit={this.addQuest}
                        handleChange={this.handleQuestChange}
                        name={this.state.name}
                        description={this.state.description}
                        points={this.state.points}
                        type={this.state.type}
                        activationCode={this.state.activationCode}
                        course={this.state.course}
                        courses={this.props.courses}
                    />
                </Toggleable>
            </div>
        )


    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps,
    { createQuest, notify })(NewQuest)