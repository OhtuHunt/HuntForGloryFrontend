import React from 'react'
import GenerateCard from "./GenerateCard"

const ShowAll = ({state, handleQuestShowClick}) => {
  return (
    <div className="showAll">
      {state.quests.map(quest => <GenerateCard
        key={quest.id}
        id={quest.id}
        title={quest.name}
        questType={quest.type}
        points={quest.points}
        clickHandler ={handleQuestShowClick(quest.id)}
      />)}
    </div>
  )
}

export default ShowAll
