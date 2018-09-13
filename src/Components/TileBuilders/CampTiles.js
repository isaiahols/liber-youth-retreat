import React from 'react'
import { connect } from "react-redux";
import { updateNestedObject } from "../../Ducks/registration";

import { Card, CardHeader, CardMedia, CardContent, Typography, Grid } from '@material-ui/core';

import './CampTiles.css';

const CampTiles = (props) => {
    const { camp, updateNestedObject } = props;

    const handleSelect = () => {
        updateNestedObject({ where: 'attendee', what: 'camp_id', val: camp.camp_id })
    }

    return (
        <Grid item xs={12}>
            <Card className="tiles"
                id='c-tiles'
                onClick={() => handleSelect()}
            >
                <CardHeader
                    title={camp.title}
                    subheader={`Starting ${camp.start_date}`}
                />
                <CardContent>
                    <Typography variant='body2' >
                        {camp.description}
                    </Typography>
                    <Typography variant='caption' >
                        {`Near: ${camp.location}`}
                    </Typography>
                </CardContent>
                {/* <CardMedia /> */}


            </Card>
        </Grid>
    )
};

export default connect(null, { updateNestedObject })(CampTiles);
