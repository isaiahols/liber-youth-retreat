import React, { Component } from 'react';
// import { Typography } from 'material-ui';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';


import './About.css'

export default class About extends Component {
  render() {
    return (
      <div>
        <Typography variant='display3'>
          Learn About LYR
        </Typography>
        {/* cards go here */}
        {/* Input form */}
        <Paper id='send-info-container' className='content-container'>
          <Grid 
            container 
            spacing={8} 
            direction="row"
            justify="center"
            alignItems="flex-end"
            >
            <Grid item sm>
          <AccountCircle />
            </Grid>
            <Grid item sm>
          <TextField id="input-with-icon-grid" label="Your Name" />
            </Grid>
          </Grid>
        </Paper>

        {/* about the team */}
          {/* Naomi Burton, Isaiah Olson (developer) */}
        {/* testimonials */}
      </div>
    )
  }
}
