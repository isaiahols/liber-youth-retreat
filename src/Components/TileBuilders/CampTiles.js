import React from 'react'
import { connect } from "react-redux";
import { updateNestedObject } from "../../Ducks/registration";

const CampTiles = (props) => {
    const { camp, updateNestedObject } = props;

    const handleSelect = () => {
        updateNestedObject({ where: 'attendee', what: 'camp_id', val: camp.camp_id })
    }

    return (
        <div className="tiles" id='c-tiles' onClick={() => handleSelect()} >
            <h2>{camp.title}</h2>
            <h3>{`From: ${camp.start_date} to ${camp.end_date}`}</h3>
            <h3>{`Near: ${camp.location}`}</h3>
            <h4>{camp.description}</h4>
        </div>
    )
};

export default connect(null, { updateNestedObject })(CampTiles);
