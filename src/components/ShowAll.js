import React from 'react'
import GenerateCard from "./GenerateCard"

const ShowAll = ({state, handleQuestShowClick}) => {
  return (
    <div className="showAll" style={{ overflowX: 'visible'}}>
      {state !== undefined ?
      <div>
      {state.quests.map(quest => <GenerateCard
        key={quest.id}
        id={quest.id}
        title={quest.name}
        questType={quest.type}
        points={quest.points}
      />)}
      </div>
      :
      <div>
      </div>
      }
    </div>
  )
}

export default ShowAll
