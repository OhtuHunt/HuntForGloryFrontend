import React from 'react'
import Toggleable from './Toggleable'
import "../index.css"
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { showErrors } from '../reducers/errorMessageReducer'
import { sendFeedback } from '../reducers/feedbackReducer'
import validateFeedback from '../validators/feedbackValidator'
import Spinner from 'react-spinkit'

class FeedbackForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            loading: false
        }
    }

    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
    }

    formVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        this.changeLoading()
        const feedbackObject = {
            title: this.state.title,
            content: this.state.content
        }

        let errors = validateFeedback(feedbackObject)

        if (errors.length > 0) {
            this.props.showErrors(errors, 5000)
            this.setState({
                loading: false
            })
            return
        }

        await this.props.sendFeedback(feedbackObject)


        this.feedbackForm.toggleVisibility()
        this.props.notify('Thank you for sending feedback!', 5000)
        this.setState({
            title: '',
            content: '',
            loading: false
        })
    }

    handleFormChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div>
                <Toggleable buttonLabel="Give feedback" cancelButtonLabel='Cancel' ref={component => this.feedbackForm = component}>
                    <div className="createform">
                        <h2>Send Feedback</h2>
                        <br></br>
                        <div> Use this form to send us feedback about the application or information about the possible bugs you have encountered. </div>

                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <p>title</p>
                                <input
                                    type="text"
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleFormChange}
                                />
                            </div>
                            <div>
                                <p>feedback</p>
                                <input
                                    type="textarea"
                                    name="content"
                                    value={this.state.content}
                                    onChange={this.handleFormChange}
                                />
                            </div>
                            {this.state.loading ?
                                <div style={{ marginLeft: '49%' }}>
                                    <Spinner name="circle" fadeIn="none" />
                                </div>
                                :
                                <button type="submit">send feedback</button>}
                        </form>
                    </div>
                </Toggleable>
            </div>
        )
    }
}

export default connect(null, { sendFeedback, notify, showErrors })(FeedbackForm)