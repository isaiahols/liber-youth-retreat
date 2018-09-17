import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import Spinner from 'react-spinkit';

import { 
    Typography,
    Grid
} from '@material-ui/core';

export default class componentName extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const { getSignedRequest, isUploading, photo } = this.props;

        return (
            <div className="photoUploader">
                {/* This is where React S3 Uploader */}
                <Grid item xs={12} className="dropzone">
                    <Dropzone
                        onDropAccepted={getSignedRequest}
                        style={{
                            position: 'relative',
                            width: 200,
                            height: 200,
                            borderWidth: 7,
                            marginTop: 20,
                            borderColor: 'rgb(102, 102, 102)',
                            borderStyle: 'dashed',
                            borderRadius: 5,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: 28,
                        }}
                        accept='image/*'
                        multiple={false} >

                        {isUploading
                            ? <Spinner name="chasing-dots" color="blue" />
                            : <Typography 
                            variant='headline'
                            align="center"
                            >Drop File or Click Here</Typography>
                        }
                    </Dropzone>

                </Grid>
                <img src={photo} className='confirm-photo' />
            </div>
        )
    }
}
