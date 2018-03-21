import React from 'react'
import { connect } from 'react-redux'
import EditQuest from "./EditQuest"

class AdminToolsForQuest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            quest: this.props.quest
        }
        this.handleDelete = this.props.handleDelete
        this.handleDeactivate = this.props.handleDeactivate
    }
    render() {
        if (this.props.loggedUser !== null) {
            if (this.props.loggedUser.admin) {
                return (
                    <div>
                        <button className="deleteQuest" onClick={() => this.handleDelete(this.state.quest.id)}>
                            Delete
            </button>
                        <br></br>
                        <br></br>
                        <EditQuest quest={this.state.quest} store={this.props.store} />
                        <br></br>
                        <br></br>
                        <button className="deleteQuest" onClick={() => this.handleDeactivate(this.state.quest.id)}>Deactivate</button>
                        <br></br>
                        <br></br>
                        {this.state.quest.deactivated === true ?
                            <h2>DEACTIVATED</h2>
                            :
                            <div>
                            </div>
                        }
                    </div>
                )
            } else {
                return (
                    <div></div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    return {
        loggedUser: state.loggedUser
    }
}

export default connect(mapStateToProps)(AdminToolsForQuest)