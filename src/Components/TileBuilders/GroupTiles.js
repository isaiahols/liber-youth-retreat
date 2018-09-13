import React from 'react'
import { connect } from "react-redux";
import { updateNestedObject } from "../../Ducks/registration";

import { Card, CardHeader, CardMedia, CardContent, Typography, Grid, CardActionArea } from '@material-ui/core';

const GroupTiles = (props) => {
    const { group, updateNestedObject } = props
    const handleSelect = () => {
        updateNestedObject({ where: 'attendee', what: 'camp_id', val: group.group_id })
    }
    return (
        <Grid item xs={12}>
            <Card
                className="tiles"
                id='g-tiles'
                onClick={() => handleSelect()}
                style={{
                    width: "80vw"
                }}
                raised={true}
            >
                <CardActionArea>

                    <CardHeader
                        title={group.title}
                        subheader={`Suggested age: ${group.age}`}
                    />
                    <CardContent>
                        <Typography variant='body2' >
                            {group.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default connect(null, { updateNestedObject })(GroupTiles);