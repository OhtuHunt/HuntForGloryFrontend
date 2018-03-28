import React from 'react'
import Toggleable from './Toggleable'
import { notify } from '../reducers/notificationReducer'
import { createQuest } from '../reducers/questReducer'
import { connect } from 'react-redux'
import "../index.css";

const QuestForm = ({ onSubmit, handleChange, name, description, points, type, activationCode, course, courses, latitude, longitude, radius }) => {
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
                    <label>
                        <input type='radio' name='type' value="location" onChange={handleChange}/>
                        Location
                        <input type='radio' name='type' value="activation code" onChange={handleChange} />
                        Activation Code
                    </label>
                </div>
                {type === "activation code" ?
                    <div>
                        <p>activationcode</p>
                        <input
                            type="text"
                            name="activationCode"
                            value={activationCode}
                            onChange={handleChange}
                        />
                    </div>
                    :
                    <div>
                        <p> latitude </p>
                        <input
                            type="number"
                            name="latitude"
                            value={latitude}
                            onChange={handleChange}
                        />
                        <p> longitude </p>
                        <input
                            type="number"
                            name="longitude"
                            value={longitude}
                            onChange={handleChange}
                        />
                        <p> radius </p>
                        <input
                            type="number"
                            name="radius"
                            value={radius}
                            onChange={handleChange}
                        />
                    </div>}

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
            latitude: null,
            longitude: null,
            radius: null,
            course: this.props.courses[0] ? this.props.courses[0].id : null
        }
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    addQuest = async (event) => {
        event.preventDefault()
        console.log(this.state.course)
        this.questForm.toggleVisibility()

        let activationCode = this.state.activationCode

        if (this.state.type === 'location') {
            activationCode = {lat: this.state.latitude, lng: this.state.longitude, radius: this.state.radius}
        }

        const questObject = {
            name: this.state.name,
            description: this.state.description,
            points: this.state.points,
            type: this.state.type,
            activationCode: activationCode,
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
            course: "",
            latitude: null,
            longitude: null,
            radius: null
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
                    {this.props.courses[0] ?
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
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            radius={this.state.radius}
                        /> :
                        <div> There are no courses available at the moment. If you want to create a new quest, you first have to create a course </div>}
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