import React from 'react'

export default class Togglable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: props.startVisible ? true : false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    visibilityToFalse = () => {
        this.setState({ visible: false })
    }

    render() {
        const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <div>
                <div style={hideWhenVisible}>
                    <button onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
                </div>
                <div style={showWhenVisible} >
                    {this.props.children}
                    {this.props.startVisible ? <div></div>
                    :
                    <button onClick={this.toggleVisibility}>{this.props.cancelButtonLabel}</button>
                    }
                    <p></p>
                </div>
            </div>
        )
    }
}