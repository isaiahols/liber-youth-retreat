import React from 'react'
import { connect } from "react-redux";
import { updateObjectOnState } from '../../Ducks/registration';


const FullTiles =(props) => {
    const{each,which}= props
    const { first_name, last_name, email, phone} = each
    let handleSelect=()=>{
        props.updateObjectOnState({which, content: each })
    }

    return (
        <div onClick={() => handleSelect()} >
            <h2>{`${first_name} ${last_name}`}</h2>
            <h3>{email}</h3>
            <h3>{phone}</h3>
        </div>
    )
}

export default connect(null, { updateObjectOnState })(FullTiles)
