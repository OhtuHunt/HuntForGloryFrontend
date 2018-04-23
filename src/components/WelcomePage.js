import React from 'react'
import JoinCourse from './JoinCourse'
import EditUserInformation from './EditUserInformation';

class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
        this.handleExit = props.handleExit
    }

    resize = () => {
        this.setState(this.state)
    }

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        return (
            <div className="welcomePage" style={{height: window.innerHeight * 0.8, overflow: 'auto'}}>
                <h1>WELCOME</h1>
                <EditUserInformation startVisible={true} />
                <JoinCourse startVisible={true} handleExit={this.props.handleExit} />
                <p>Dont want to join now? Press continue and join later from the user settings.</p>
                <button onClick={this.handleExit}>Continue</button>
                <br></br>
                <br></br>
            </div>
        )
    }
}

export default WelcomePage
