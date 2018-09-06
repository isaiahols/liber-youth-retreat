import React from 'react'

export default (props) => {
    const { photo, first_name, last_name, title, start_date } = props.each;
    return (
        <div>
            <img src={photo} alt=""/>
            <h2>{`${first_name} ${last_name}`}</h2>
            <h4>is currently registered for </h4>
            <h4>{`${title} Camp`}</h4>
            <h4>{`starting on ${start_date}`}</h4>
        </div>
    )
}
