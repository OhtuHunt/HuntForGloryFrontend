import React from 'react'
import GenerateCard from "./GenerateCard"
import { connect } from 'react-redux'
import Filter from './Filter'

class ShowAll extends React.Component {
  render() {
    return (
      <div className="showAll" style={{ overflowX: 'visible' }}>
        <Filter />
        <div>
          {this.props.questsToShow.map(quest => <GenerateCard
            key={quest.id}
            quest={quest}
          />)}
        </div>
      </div>
    )
  }
}

const filteredQuests = (quests, filter, field) => {
  switch (field) {
    case 'name':
      return filter === '' ? quests : quests.filter(quest => quest.name.toLowerCase().includes(filter))
    case 'course':
      return filter === '' ? quests : quests.filter(quest => quest.course.name.toLowerCase().includes(filter))
    case 'type':
      return filter === '' ? quests : quests.filter(quest => quest.type.toLowerCase().includes(filter))
    default:
      return filter === '' ? quests : quests.filter(quest => {
        let bool = false
        Object.values(quest).filter(v => v).map(key => {
          if (key.name !== undefined && key.name.toString().toLowerCase().includes(filter)) {
            bool = true
          } else {
            if (key.toString().toLowerCase().includes(filter)) {
              bool = true
            }
          }
          return true
        }
        )
        return bool
      })
  }
}

const questFilteredByDone = (quests, showNotDone) => {
  return showNotDone ? quests.filter(quest => quest.finished === undefined) : quests
}

const mapStateToProps = (state) => {
  return {
    quests: state.quests,
    filter: state.filter,
    field: state.fieldToFilter,
    done: state.done,
    questsToShow: filteredQuests(questFilteredByDone(state.quests, state.done), state.filter, state.fieldToFilter)
  }
}

export default connect(mapStateToProps, null)(ShowAll)