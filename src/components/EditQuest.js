import React from 'react'
import questService from '../services/quests'
import Toggleable from './Toggleable'
import "../index.css";

const QuestForm = ({ handleSubmit, handleChange, name, description, points, type, activationCode }) => {
    return (
        <div className="createform">
            <h2>edit quest</h2>

            <form  onSubmit={handleSubmit}>
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
            activationCode: props.quest.activationCode
        }
        this.editQuest = props.editQuest
        this.quest = props.quest
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.questForm.toggleVisibility()
        const questObject = {
            name: this.state.name,
            description: this.state.description,
            points: this.state.points,
            type: this.state.type,
            activationCode: this.state.activationCode
        }
        const editedQuest = await questService.update(this.quest.id, questObject)
        this.editQuest(editedQuest)
    }

    handleQuestChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <div>
                <Toggleable buttonLabel="edit quest" ref={component => this.questForm = component}>
                    <QuestForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleQuestChange}
                        name={this.state.name}
                        description={this.state.description}
                        points={this.state.points}
                        type={this.state.type}
                        activationCode={this.state.activationCode}
                    />
                </Toggleable>
            </div>
        )


    }
}

export default EditQuest