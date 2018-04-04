import React from 'react'
import JoinCourse from './JoinCourse'

class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
        this.handleExit = props.handleExit
    }
    render() {
        return (
            <div className="welcomePage">       
                <h1>WELCOME</h1>
                
                <JoinCourse startVisible={true} handleExit={this.props.handleExit}/>
                <p>Dont want to join now? Press continue and join later from the user settings.</p>
                <button onClick={this.handleExit}>Continue</button>
            </div>
        )
    }
}

export default WelcomePage
