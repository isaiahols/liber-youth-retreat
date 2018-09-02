import React from 'react'

export default ({ participant }) => {
    const { participant_id, first_name, last_name, birthday, email } = participant
    return (
        <div key={participant_id}>
            <img src="" alt="" />
            <h2>{`${first_name} ${last_name}`}</h2>
            <h3>Birthday: {birthday}</h3>
            {/* should be age not birthday... */}
            <h3>email: {email}</h3>
            {/* should also include last attend date 
            *must have attended to be saved... */}

        </div>
    )
}
