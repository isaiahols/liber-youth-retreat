import React from 'react'
import { connect } from "react-redux";
import { updateNestedObject } from "../../Ducks/registration";

import { Card, CardHeader, CardMedia, CardContent, Typography, Grid, CardActionArea } from '@material-ui/core';

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
                style={{
                    width: "80vw"
                }}
                raised={true}
            >
                <CardActionArea>

                    <CardHeader
                        title={camp.title}
                        subheader={`Starting ${camp.start_date}`}
                        style={{ width: "80vw" }}
                    />
                    <CardContent>
                        <Typography variant='body2' >
                            {camp.description}
                        </Typography>
                        <Typography variant='caption' >
                            {`Near: ${camp.location}`}
                        </Typography>
                    </CardContent>


                </CardActionArea>
            </Card>
        </Grid>
    )
};

export default connect(null, { updateNestedObject })(CampTiles);
