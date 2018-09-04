import React from 'react'
import { updateObjectOnState } from "../../Ducks/registration";
import { connect } from 'react-redux';

const ParticipantTiles = (props) => {
    const { first_name, last_name, birthday, email, photo } = props.participant

    let handleSelect = () => {
        props.updateObjectOnState({ which: 'participant', content: props.participant })
    }

    return (
        <div onClick={() => handleSelect()} >
            <img src={photo} alt="" />
            <h2>{`${first_name} ${last_name}`}</h2>
            <h3>Birthday: {birthday}</h3>
            {/* should be age not birthday... */}
            <h3>email: {email}</h3>
            {/* should also include last attend date 
            *must have attended to be saved... */}

        </div>
    )
}


export default connect(null, { updateObjectOnState })(ParticipantTiles)
