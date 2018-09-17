import React from 'react'
import { connect } from "react-redux";
import { updateObjectOnState } from '../../Ducks/registration';

import {
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    Typography,
} from '@material-ui/core';


const FullTiles = (props) => {
    const { each, which } = props
    const { first_name, last_name, email, phone } = each
    let handleSelect = () => {
        props.updateObjectOnState({ which, content: each })
    }

    return (
        <Grid item
            xs={12}
        //  className="tiles" 
        //  id='full-tiles' 
         onClick={() => handleSelect()} >
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
                        style={{ width: "80vw" }}
                        title={`${first_name}`}
                        subheader={last_name}
                        titleTypographyProps={{ variant: 'title' }}
                        subheaderTypographyProps={{ variant: 'subheading' }}
                    >
                    </CardHeader>
                    <CardContent>
                        <Typography variant='body1'>Email: {email}</Typography>
                        <Typography variant='body1'>Phone: {phone}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default connect(null, { updateObjectOnState })(FullTiles)
