import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

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
        <Paper id='about-top-image' >
          {/* <Parallax
          id='about-top-image'
          bgImage={'../../../assests/images/negative-space-mountain-blue-sky-clouds-jamie-street.jpg'}
          strength={500}>
          <div style={{ height: 500 }}>
          </div> */}

          <div class="top-text-background">

            <Typography variant='display3' className='top-text' >
              Learn About LYR
          </Typography>
          </div>
          {/* </Parallax> */}
        </Paper>

        {/* cards go here */}

        <Paper className='tile-outer' >
          <Typography variant='display1' className='tile-title' >
            What is Liber Youth Retreat (LYR)?
          </Typography>
          <Typography variant='body1' paragraph>
            Rob and Naomi Burton had a vision for our youth in 2006 when the first Liber Youth Retreat was held. Their mission statement of “becoming principled leaders through developing Character, seeking Education and pursuing personal Mission” is still as impactful and needed now more than ever. Since their personal mission has taken them physically away temporarily, Chad and Jennifer Smith have will be the Directors for 2019.
          </Typography>

          <Typography variant='body1' paragraph>
            LYR 2018 was an huge success. Enthusiasm for next year is already growing as many registrations have already come in!
          </Typography>

          <Typography variant='body1' paragraph>
            Please join us on this discovery by exploring the information on the web page and registering without delay.
          </Typography>
        </Paper>

        <Paper>
          <Typography variant='headline'>
            What is Liber Youth Retreat (LYR)?
          </Typography>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam perspiciatis harum, expedita minus aut. Sunt labore consequuntur quis exercitationem, blanditiis autem inventore sit quo alias nam beatae in minima?
          </Typography>
        </Paper>
        <Paper>
          <Typography variant='headline'>
            What is Liber Youth Retreat (LYR)?
          </Typography>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam perspiciatis harum, expedita minus aut. Sunt labore consequuntur quis exercitationem, blanditiis autem inventore sit quo alias nam beatae in minima?
          </Typography>
        </Paper>

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
        <Paper>
        </Paper>
        {/* about the team */}
        {/* Naomi Burton, Isaiah Olson (developer) */}
        {/* testimonials */}
      </div>
    )
  }
}
