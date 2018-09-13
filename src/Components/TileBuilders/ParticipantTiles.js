import React from 'react'
import { updateObjectOnState } from "../../Ducks/registration";
import { connect } from 'react-redux';

import { Card, CardHeader, CardMedia, CardContent, Typography, Grid, Avatar, CardActionArea } from '@material-ui/core';

import './ParticipantTiles.css';

const ParticipantTiles = (props) => {
    const { first_name, last_name, birthday, email, photo } = props.participant

    let handleSelect = () => {
        props.updateObjectOnState({ which: 'participant', content: props.participant })
    }

    return (
        <Grid item xs={12} >
            <Card
                className="tiles"
                id='p-tiles'
                onClick={() => handleSelect()}
                style={{
                    width: "80vw",
                }}
                raised={true}
            >
                <CardActionArea>

                    <CardHeader
                        avatar={
                            <Avatar
                                src={photo}
                                alt="Camper Avatar"
                                style={{
                                    height: 100,
                                    width: 100,
                                    margin: 10,
                                    marginRight: 25
                                }}
                            />

                        }
                        style={{ width: "80vw" }}
                        title={`${first_name}`}
                        subheader={last_name}
                        titleTypographyProps={{ variant: 'title' }}
                        subheaderTypographyProps={{ variant: 'subheading' }}
                    />
                    <CardContent>
                        <Typography variant='body1'>Birthday: {birthday}</Typography>
                        {/* should be age not birthday... */}
                        <Typography variant='body1'>email: {email}</Typography>
                        {/* should also include last attend date 
                *must have attended to be saved... */}
                    </CardContent>
                    {/* <CardMedia image={photo} style={{ height: 150, width: 150 }} /> */}

                </CardActionArea>
            </Card>
        </Grid>
    )
}


export default connect(null, { updateObjectOnState })(ParticipantTiles)
