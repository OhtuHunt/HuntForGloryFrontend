import React from 'react'
import Toggleable from './Toggleable'
import "../index.css"
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { editQuest } from '../reducers/questReducer'


const QuestForm = ({ handleSubmit, handleChange, name, description, points, type, activationCode, deactivated, latitude, longitude, radius }) => {

    const handleEditClick = (event) => {
        event.preventDefault()
        let editedQuest = {}
        if (type !== 'location') {
            editedQuest = {
                name: event.target.name.value,
                description: event.target.description.value,
                points: event.target.points.value,
                type: type,
                activationCode: event.target.activationCode.value
            }
        } else {
            editedQuest = {
                name: event.target.name.value,
                description: event.target.description.value,
                points: event.target.points.value,
                type: type,
                activationCode: {
                    lat: event.target.latitude.value,
                    lng: event.target.longitude.value,
                    radius: event.target.radius.value
                }
            }
        }
        handleSubmit(editedQuest)
    }

    return (
        <div className="createform">
            <h2>edit quest</h2>

            <form onSubmit={handleEditClick}>
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
                {type !== 'location' ?
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
                        <p>Latitude</p>
                        <input
                            type='text'
                            name='latitude'
                            value={latitude}
                            onChange={handleChange}
                        />
                        <p>Longitude</p>
                        <input
                            type='text'
                            name='longitude'
                            value={longitude}
                            onChange={handleChange}
                        />
                        <p>Radius</p>
                        <input
                            type='text'
                            name='radius'
                            value={radius}
                            onChange={handleChange}
                        />
                    </div>
                }
                <button type="submit">edit</button>
            </form>
        </div>
    )
}

class EditQuest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.quest.name,
            description: props.quest.description,
            points: Number(props.quest.points),
            type: props.quest.type,
            activationCode: props.quest.activationCode,
            deactivated: props.quest.deactivated,
            id: props.quest.id,
            latitude: props.quest.activationCode.lat,
            longitude: props.quest.activationCode.lng,
            radius: props.quest.activationCode.radius
        }
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = async (editedQuest) => {
        console.log(editedQuest)
        this.questForm.toggleVisibility()
        this.setState({
            name: editedQuest.name,
            description: editedQuest.description,
            points: editedQuest.points,
            type: editedQuest.type,
            activationCode: editedQuest.activationCode,
            latitude: editedQuest.activationCode.lat,
            longitude: editedQuest.activationCode.lng,
            radius: editedQuest.activationCode.radius
        })
        const editedWithDeactivation = { ...editedQuest, deactivated: this.props.quest.deactivated }
        await this.props.editQuest(editedWithDeactivation, this.props.quest.id)
        this.props.notify(`${editedQuest.name} has been edited.`, 5000)
    }

    handleQuestChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        if (this.state.id !== this.props.quest.id) {
            this.setState({
                name: this.props.quest.name,
                description: this.props.quest.description,
                points: this.props.quest.points,
                type: this.props.quest.type,
                activationCode: this.props.quest.activationCode,
                deactivated: this.props.quest.deactivated,
                id: this.props.quest.id,
                latitude: this.props.quest.activationCode.lat,
                longitude: this.props.quest.activationCode.lng,
                radius: this.props.quest.activationCode.radius
            })
            this.questForm.visibilityToFalse()
        }
        return (
            <div>
                <Toggleable buttonLabel="edit quest" cancelButtonLabel='Cancel' ref={component => this.questForm = component}>
                    <QuestForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleQuestChange}
                        name={this.state.name}
                        description={this.state.description}
                        points={this.state.points}
                        type={this.state.type}
                        activationCode={this.state.activationCode}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        radius={this.state.radius}
                    />
                </Toggleable>
            </div>
        )


    }
}

export default connect(null,
    { editQuest, notify })(EditQuest)