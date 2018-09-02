import React from 'react'
import { connect } from "react-redux";
import { updateObjectOnState } from '../../Ducks/registration';


const FullTiles =(props) => {
    const { first, last, email, phone, which, all } = props
    let handleSelect=()=>{
        props.updateObjectOnState({which, content: all })
    }

    return (
        <div onClick={() => handleSelect()} >
            <h2>{`${first} ${last}`}</h2>
            <h3>{email}</h3>
            <h3>{phone}</h3>
        </div>
    )
}

export default connect(null, { updateObjectOnState })(FullTiles)
