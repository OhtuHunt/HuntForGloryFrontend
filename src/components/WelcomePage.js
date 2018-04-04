import React from 'react'
import GenerateCard from "./GenerateCard"
import { connect } from 'react-redux'
import Filter from './Filter'
import { joinCourse } from '../reducers/courseReducer'
import JoinCourse from './JoinCourse'

class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
        this.handleExit = props.handleExit
    }
    render() {
        return (
            <div className="welcomePage">
                <h2> </h2>            
                <h1>WELCOME</h1>
                <h2>to</h2>
                <h1>HUNT FOR GLORY</h1>

                <JoinCourse startVisible={true} handleExit={this.props.handleExit}/>
                <p>Dont want to join now? Push exit and join later from the user settings.</p>
                <button onClick={this.handleExit}>Exit</button>
            </div>
        )
    }
}

export default WelcomePage
