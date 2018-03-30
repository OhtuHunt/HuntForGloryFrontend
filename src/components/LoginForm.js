import React from 'react'
import Spinner from 'react-spinkit'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false
        }
        this.handleLogin = this.props.handleLogin
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.changeLoading()
        await this.handleLogin(event)
        this.changeLoading()
    }
    
    render() {
        return (
            <div>
                <h2>Log in with your TMC-credentials</h2>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
                    <br></br>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
                    <br></br>
                    {this.state.loading === true ?
                        <div style={{marginLeft: '49%'}}>
                            <Spinner name="circle" fadeIn="none"/>
                        </div>
                        :
                        <div>
                            {this.state.username.length > 0 && this.state.password.length > 0 ?
                                <button type="submit">Login</button>
                                :
                                <button type="submit" disabled>Login</button>
                            }
                        </div>
                    }
                </form>
            </div>
        )
    }
}

export default LoginForm