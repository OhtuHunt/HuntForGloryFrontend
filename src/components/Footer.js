import React from "react";
import { connect } from 'react-redux'

// const footerTable = {
//   width: window.innerWidth
// }

class Footer extends React.Component {
  
  render() {
    let rank = null
    if (this.props.users !== undefined && this.props.loggedUser !== null) {
      const self = this.props.users.find(u => u.id === this.props.loggedUser.id)
      rank = this.props.users.indexOf(self) + 1
    }

    return (
      <div className="footer">
        <ul className="footerList">
          <li>{this.props.loggedUser === null ? null : <div>Points: {this.props.loggedUser.points}</div>}</li>
          <li>{this.props.loggedUser === null ? <div><a href="https://tmc.mooc.fi">TMC</a></div> : <div>{this.props.loggedUser.username}</div>}
          </li>
          <li>{this.props.loggedUser === null ? null : <div>Rank: {rank}</div>}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    loggedUser: state.loggedUser
  }
}

export default connect(mapStateToProps, null)(Footer)