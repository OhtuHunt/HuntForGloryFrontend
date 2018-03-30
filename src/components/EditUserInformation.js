import React from 'react'
import Toggleable from './Toggleable'
import { editUser } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'

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
            id: this.props.user.id,
            username,
            email,
            admin: this.props.user.admin,
            points: this.props.user.points,
            quests: this.props.user.quests

        }
        await this.props.editUser(user)
        window.localStorage.setItem(
            "LoggedTmcUser",
            JSON.stringify({...user, token: this.props.loggedUser.token})
        )

        this.props.notify('New user information has been saved', 5000)
        // const editedUser = await userService.update(user, this.props.user.id)
        // console.log(editedUser)
        // this.props.edit(editedUser)
    }

    handleFormChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <Toggleable buttonLabel="Edit profile" cancelButtonLabel='Cancel' ref={component => this.EditUserInformation = component}>
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

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps, { editUser, notify })(EditUserInformation)