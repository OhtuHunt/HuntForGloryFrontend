import React from 'react'

const LoginForm = ({ handleLogin }) => {
    return (
        <div>
            <h2>Kirjaudu sisään TMC-tunnuksilla</h2>
            <form onSubmit={handleLogin}>
                <input type="text" name="username" placeholder="Käyttäjätunnus"/>
                <br></br>
                <input type="password" name="password" placeholder="Salasana"/>
                <br></br>
                <button type="submit">Kirjaudu</button>
            </form>
        </div>
    )
}

export default LoginForm