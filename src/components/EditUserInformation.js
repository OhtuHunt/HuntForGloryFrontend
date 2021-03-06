import React from 'react'
import Toggleable from './Toggleable'
import { editUser } from '../reducers/usersReducer'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import validateProfile from '../validators/profileValidator'
import { showErrors } from '../reducers/errorMessageReducer'
import { setLoggedUser } from '../reducers/loggedUserReducer'
import Spinner from 'react-spinkit'

class EditUserInformation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.loggedUser !== undefined ? this.props.loggedUser.username : JSON.parse(window.localStorage.getItem('LoggedTmcUser')).username,
            email: this.props.loggedUser !== undefined ? this.props.loggedUser.email : JSON.parse(window.localStorage.getItem('LoggedTmcUser')).email,
            loading: false
        }
    }
    
    handleSubmit = async (event) => {
        event.preventDefault()
        this.changeLoading()
        const username = (this.state.username === '') ? this.props.loggedUser.username : this.state.username
        const email = (this.state.email === '') ? this.props.loggedUser.email : this.state.email

        const user = {
            id: this.props.loggedUser.id,
            username,
            email,
            admin: this.props.loggedUser.admin,
            points: this.props.loggedUser.points,
            quests: this.props.loggedUser.quests,
            token: this.props.loggedUser.token,
            courses: this.props.loggedUser.courses

        }

        let errors = validateProfile(user)

        if (errors.length > 0) {
            this.props.showErrors(errors, 5000)
            window.scrollTo(0, 0)
            this.changeLoading()
            return
        }

        if (!this.props.startVisible) {
            this.EditUserInformation.toggleVisibility()
        }
        await this.props.editUser(user)
        await this.props.setLoggedUser(user)

        window.localStorage.setItem(
            'LoggedTmcUser',
            JSON.stringify(user)
        )
        window.scrollTo(0, 0)
        this.props.notify('New user information has been saved', 4000)
        this.changeLoading()
        // const editedUser = await userService.update(user, this.props.user.id)
        // console.log(editedUser)
        // this.props.edit(editedUser)
    }

    handleFormChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
    }

    render() {
        return (
            <Toggleable buttonLabel='Edit profile' startVisible={this.props.startVisible} cancelButtonLabel='Cancel' ref={component => this.EditUserInformation = component}>
                <div className='createform'>
                    <h2>Edit profile information</h2>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <p>This is the username that is shown to others in for example leaderboards</p>
                            <label>Username</label>
                            <input
                                type='text'
                                name='username'
                                value={this.state.username}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                                type='text'
                                name='email'
                                value={this.state.email}
                                onChange={this.handleFormChange}
                            />
                        </div>
                        {this.state.loading ?
                            <div style={{ marginLeft: '49%' }}>
                                <Spinner name='circle' fadeIn='none' />
                            </div>
                            :
                            <button type='submit'>Save</button>}
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

export default connect(mapStateToProps, { editUser, notify, showErrors, setLoggedUser })(EditUserInformation)