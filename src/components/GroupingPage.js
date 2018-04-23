import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import Toggleable from '../components/Toggleable'


class GroupingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: this.props.courses[0] ? this.props.courses[0].id : ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = async (event) => {
        event.preventDefault()

    }

    render() {
        return (
            <div className="groupingOptions" style={{ height: window.innerHeight * 90, overflow: 'auto' }}>
                <h2>Groups by courses</h2>

                <div className='custom-select' style={{ width: '100%' }}>
                    <select name='course' onChange={this.handleChange}>
                        {this.props.courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                    </select>
                </div>
                <br></br>
                <div className="groupTables">
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps, { notify })(GroupingPage)