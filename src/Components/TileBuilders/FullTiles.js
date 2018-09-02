import React from 'react'

export default ({ id, first, last, email, phone }) => {


    return (
        <div>
            <h2>{`${first} ${last}`}</h2>
            <h3>{email}</h3>
            <h3>{phone}</h3>
        </div>
    )
}
