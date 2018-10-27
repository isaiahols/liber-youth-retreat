import React, { Component } from 'react';
import axios from 'axios';
import { Parallax } from 'react-parallax';

import { AccountCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'


import './About.css'

const styles = theme => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
  },

});




class About extends Component {
  state = {
    open: false,
    name: '',
    email: '',
  };

  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.handleInfoRequest()
  };

  updateName(event) {
    this.setState({
      name: event.target.value
    })
  }
  updateEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  handleInfoRequest = () => {
    const { name, email } = this.state;
    let names = name.split(' ');
    console.log(name)
    console.log(names)
    console.log(email)
    axios.post('/api/request-info', { first: names[0], last: names[1], email })
      .then(resp => {
        console.log(resp.data)
      })

  }

  render() {
    const { classes } = this.props;


    return (
      <div>
        <Paper id='about-top-image' >
          {/* <Parallax
          id='about-top-image'
          bgImage={'../../../assests/images/negative-space-mountain-blue-sky-clouds-jamie-street.jpg'}
          strength={500}>
          <div style={{ height: 500 }}>
          </div> */}

          <div 
          className="top-text-background"
          >

            <Typography variant='display3' className='top-text' >
              Learn About LYR
          </Typography>
          </div>
          {/* </Parallax> */}
        </Paper>

        {/* cards go here */}
        <Paper className='tile-outer' >
          <Typography variant='display2' className='tile-title' >
            Our Mission
          </Typography>
          <Typography variant='display1' className='tile-title' >
            Becoming Principled Leaders through developing character, seeking education, and pursuing personal mission.
          </Typography>
        </Paper>
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

        <Paper className='tile-outer' >
          <Typography variant='display1' className='tile-title'>
            There Are Three Levels
          </Typography>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam perspiciatis harum, expedita minus aut. Sunt labore consequuntur quis exercitationem, blanditiis autem inventore sit quo alias nam beatae in minima?
          </Typography>
        </Paper>
        <Paper className='tile-outer' >
          <Typography variant='display1' className='tile-title'>
            Character Level
          </Typography>
          <Paper className="quote-container" >
            <Typography variant='caption' paragraph>
              “A man’s character is like his house. If he tears boards off his house and burns them to keep himself warm and comfortable, his house soon becomes a ruin. If he tells lies to be able to do the things he shouldn’t do but wants to, his character will soon become a ruin. A man with a ruined character is a shame on the face of the earth.”
            </Typography>
            <Typography variant='caption'>
              ― Ralph Moody, Little Britches
            </Typography>
          </Paper>
          <Typography variant='body1' paragraph>
            What is real character?
            How does one build and strengthen personal character?
            Why is good character essential for meaningful leadership?
            Who are exemplary leaders of these principles?
            How is character important in everyday life and in home leadership?
          </Typography>
          <Typography variant='body1' paragraph>
            These are questions that youth in the Character Level seek to understand as they read and discuss the books listed below.  This level is recommended for those who are new to the Liber Youth Retreat and/or for youth ages 12-14.  It is designed to help youth understand the importance of character in every level of leadership–the home, at work, in education, and in social situations.  We illustrate how character is paramount to the other principles of leadership and that it is the foundation of all that follows.   Themes of character and leadership also surface in the simulations they participate in and the speakers who present.
          </Typography>
          <Typography variant='body1' paragraph>
            The youth are expected to prepare by reading the following literature prior to attending the retreat.  Please ensure each youth has their own copy of the books to bring with them. Each level can be beneficially repeated multiple times, since the activities and books change each year.
          </Typography>
          <Typography variant='subheading' paragraph>
            Reading List for Character Level:
          </Typography>
          <div
            className={classes.demo}
          >
            <List dense={true}>
              <ListItem>
                <ListItemText
                  primary="The Secret Garden"
                  secondary='– Frances Hodgson Burnett'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Little Britches"
                  secondary='– Little Britches'
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="No Excuses, Sir!"
                  secondary='– Gaylord Swim'
                />
              </ListItem>
            </List>
          </div>
        </Paper>
        <Paper className='tile-outer' >
          <Typography variant='display1' className='tile-title'>
            What is Liber Youth Retreat (LYR)?
          </Typography>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam perspiciatis harum, expedita minus aut. Sunt labore consequuntur quis exercitationem, blanditiis autem inventore sit quo alias nam beatae in minima?
          </Typography>
        </Paper>
        <Paper className='tile-outer' >
          <Typography variant='display1' className='tile-title'>
            What is Liber Youth Retreat (LYR)?
          </Typography>
          <Typography variant='body1' paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aperiam perspiciatis harum, expedita minus aut. Sunt labore consequuntur quis exercitationem, blanditiis autem inventore sit quo alias nam beatae in minima?
          </Typography>
        </Paper>

        {/* Input form */}

        <Paper id='send-info-container' className='content-container' id='more-info-container' >
          <Grid
            container
            direction="row"
            spacing={8}
            justify="center"
            alignItems="flex-end"
          >
            <Grid item xs={12}>
              <Typography variant='title'>
                Still Have Questions?
            </Typography>
            </Grid>
            {/* <Grid item sm>
              <AccountCircle />
            </Grid>
            <Grid item sm>
              <TextField id="input-with-icon-grid" label="Your Name" />
            </Grid>
          </Grid>
          <Grid item xs={12}> */}
            <div>
              <Button id='inputing' onClick={this.handleClickOpen}>Request Additional Info</Button>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Request More Info</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To request more info about Liber Youth Retreat, please enter your name and email address here. We will send you more info shortly along with updates occasionally.
                  </DialogContentText>
                  <Grid
                    container
                    direction="row"
                    spacing={8}
                    justify="center"
                    alignItems="flex-end"
                  >
                    <Grid item xs>

                      <AccountCircle />
                    </Grid>
                    <Grid item xs={10}>

                      <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="email"
                        fullWidth
                        onChange={(e) => this.updateName(e)}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={(e) => this.updateEmail(e)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
            </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Request More Info
            </Button>
                </DialogActions>
              </Dialog>
            </div>
          </Grid>
        </Paper>
        <Paper>

        </Paper>
        {/* about the team */}
        <Paper>
          <Typography variant='display2'>
            Meet the Team
          </Typography>
        </Paper>
        {/* Naomi Burton, Isaiah Olson (developer) */}
        {/* testimonials */}
      </div>
    )
  }
}


export default withStyles(styles)(About);
