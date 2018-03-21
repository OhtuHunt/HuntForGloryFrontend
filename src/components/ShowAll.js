import React from 'react'
import GenerateCard from "./GenerateCard"
import { connect } from 'react-redux'

class ShowAll extends React.Component{
  render() {
    return (
      <div className="showAll" style={{ overflowX: 'visible'}}>
        <div>
        {this.props.quests.map(quest => <GenerateCard
          key={quest.id}
          id={quest.id}
          title={quest.name}
          questType={quest.type}
          points={quest.points}
        />)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quests: state.quests
  }
}

export default connect(mapStateToProps, null)(ShowAll)
