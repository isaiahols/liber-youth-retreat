import React from 'react'
import { connect } from "react-redux";
import { updateNestedObject } from "../../Ducks/registration";

const GroupTiles = (props) => {
    const { group, updateNestedObject } = props
    const handleSelect = () => {
        updateNestedObject({ where: 'attendee', what: 'camp_id', val: group.group_id })
    }
    return (
        <div className="tiles" id='g-tiles' onClick={()=>handleSelect()} >
            <h2>{group.title}</h2>
            <h3>{`Suggested age: ${group.ages}`}</h3>
            <h4>{group.description}</h4>
        </div>
    )
}

export default connect(null, { updateNestedObject })(GroupTiles);