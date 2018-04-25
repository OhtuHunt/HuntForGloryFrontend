import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { createGroups, moveUser } from '../reducers/groupReducer'
import Spinner from 'react-spinkit'


class GroupingPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: this.props.courses[0] ? this.props.courses[0].id : '',
            numberOfGroups: 1,
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    randomizeGroups = async () => {
        this.changeLoading()
        try {
            await this.props.createGroups(this.state.course, this.state.numberOfGroups)
            this.props.notify('Groups have been randomized', 5000)
        } catch (exception) {
            console.log(exception)
            this.props.notify('Something went wrong..')
        }
        this.changeLoading()
    }


    changeLoading = () => {
        this.setState({
            loading: this.state.loading === true ? false : true
        })
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

    handleMoveGroup = async (event) => {
        event.preventDefault()
        this.changeLoading()
        if (event.target.currentGroup.value === event.target.groupChange.value) {
            return
        }
        try {
            await this.props.moveUser(event.target.user.value, event.target.currentGroup.value, event.target.groupChange.value)
            this.props.notify('User moved', 5000)
        } catch (exception) {
            console.log(exception)
            this.props.notify('Something went wrong..', 5000)
        }
        this.changeLoading()
    }

    render() {
        let peopleOnCourse = this.props.courses.filter(course => course.id === this.state.course)[0].users.length
        let groups = this.props.groups.filter(group => group.course === this.state.course).sort((a, b) => { return a.groupName > b.groupName })
        return (
            <div className="groupPage" style={{ height: window.innerHeight * 0.85, overflow: 'auto' }}>
                <h2>Groups by courses</h2>

                <div className='custom-select' style={{ width: '100%' }}>
                    <select name='course' onChange={this.handleChange}>
                        {this.props.courses.map(course => <option key={course.id} value={course.id}>{course.name}</option>)}
                    </select>
                </div>
                <br></br>
                <p>People on course: {peopleOnCourse}</p>
                <label>Number of groups</label>
                <br></br>
                <input type='number' value={this.state.numberOfGroups} onChange={this.handleChange} name='numberOfGroups' />
                <br></br>
                <br></br>
                {this.state.loading ? <div style={{ marginLeft: '49%' }}>
                    <Spinner name="circle" fadeIn="none" />
                </div>
                    :
                    <div>
                        {this.state.numberOfGroups > peopleOnCourse ? <button disabled='disabled'>Randomize</button> : <button onClick={this.randomizeGroups}>Randomize</button>}
                    </div>
                }
                <br></br>
                <div className="leaderboardTable">
                    {groups
                        .map(groupInCourse =>
                            <div key={groupInCourse.id}>
                                <h1>{groupInCourse.groupName}</h1>
                                <table>
                                    <tbody>
                                        {groupInCourse.users.map(user =>
                                            <tr key={user._id}>
                                                <td>{user.user.username}</td>
                                                <td>
                                                    <form onSubmit={this.handleMoveGroup}>
                                                        <input type='text' hidden='hidden' name='user' value={user.user._id} disabled='disabled' />
                                                        <input type='text' hidden='hidden' name='currentGroup' value={groupInCourse.id} disabled='disabled' />
                                                        Move user to:
                                                        <select name='groupChange'>
                                                            {groups.map(groupToMoveTo =>
                                                                <option key={groupToMoveTo.id} value={groupToMoveTo.id}>{groupToMoveTo.groupName}</option>
                                                            )}
                                                        </select>
                                                        <button type='submit'>Move</button>
                                                    </form>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                </div>
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        courses: state.courses,
        groups: state.groups
    }
}

export default connect(mapStateToProps, { notify, createGroups, moveUser })(GroupingPage)