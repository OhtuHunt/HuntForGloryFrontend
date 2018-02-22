import React from 'react'

const LoginForm = ({ handleLogin }) => {
    return (
        <div>
            <h2>Log in with your TMC-credentials</h2>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Username"/>
                <br></br>
                <input type="password" name="password" placeholder="Password"/>
                <br></br>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm