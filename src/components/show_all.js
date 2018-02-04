import React from 'react'
import GenerateCard from "./generate_card"

const ShowAll = ({state, handleQuestShowClick}) => {
  return (
    <div>
      {state.quests.map(quest => <GenerateCard
        key={quest.id}
        title={quest.name}
        questType={quest.type}
        points={quest.points}
        clickHandler ={handleQuestShowClick(quest.id)}
      />)}
    </div>
  )
}

export default ShowAll
