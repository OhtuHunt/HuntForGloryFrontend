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
            <div>
                <h1>WELCOME</h1>

                <JoinCourse startVisible={true} handleExit={this.props.handleExit}/>
                <button onClick={this.handleExit}>Exit</button>
            </div>
        )
    }
}

export default WelcomePage
