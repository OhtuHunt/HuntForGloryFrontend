import React from 'react'
import Toggleable from './Toggleable'
import userService from '../services/users'

class EditUserInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.user.username,
            email: this.props.user.email
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.EditUserInformation.toggleVisibility()
        const username = (this.state.username === '') ? this.props.user.username : this.state.username
        const email = (this.state.email === '') ? this.props.user.email : this.state.email

        const user = {
            username,
            email,
            tmc_id: this.props.user.tmc_id,
            admin: this.props.user.admin,
            points: this.props.user.points,
            quests: this.props.user.quests

        }

        //const editedUser = await userService.update(this.props.user.id)
        //stuff
    }

    handleFormChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (


            <Toggleable buttonLabel="edit profile" ref={component => this.EditUserInformation = component}>
                <div className="createform">
                    <h2>edit profile information</h2>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>username</p>
                            <input
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <p>email</p>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <button type="submit">save</button>
                    </form>
                </div>
            </Toggleable>


        )
    }
}

export default EditUserInformation