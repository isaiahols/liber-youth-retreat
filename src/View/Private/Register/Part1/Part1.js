import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import DatePicker from 'react-mobile-datepicker';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
} from "../../../../Ducks/registration";
import ParticipantTiles from '../../../../Components/TileBuilders/ParticipantTiles';
import CampTiles from "../../../../Components/TileBuilders/CampTiles";
import GroupTiles from "../../../../Components/TileBuilders/GroupTiles";
import Flatpickr from 'react-flatpickr'

// import NumberFormat from 'react-number-format';
// import MaskedInput from 'react-text-mask';

// Material-ui
import {
    Grid,
    FormControl,
    Input,
    InputLabel,
    Paper,
    Typography,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


import 'flatpickr/dist/themes/dark.css'
import './Part1.css';

const styles = theme => ({
    tiles: {
        maxWidth: 600,
        marginTop: theme.spacing.unit,
    }
})






class Part1 extends Component {
    constructor(props) {
        super(props)


        this.state = {
            time: new Date(),
            // time: `${new Date().getFullYear()} ${new Date().getMonth()} ${new Date().getDate()}`,
            isOpen: false,
        }
    }

    componentDidMount() {
        if (!this.props.user.user_id) {
            axios.get('/api/user-data')
                .then(resp => {
                    this.props.updateUser(resp.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }


    // // // Date Picker Mobile // // // 

    // set this to height 0 when larger tha tablet and expand height of other date picker

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleCancel = () => {
        this.setState({ isOpen: false });
    }

    handleSelect = (time) => {
        // let date = time.toString()substring(0, 11)
        this.setState({ time, isOpen: false });
        this.handleUpdate({ what: 'birthday', val: time })
    }

    // I NEED TO TURN THE DATE INTO JUST YYYY/MM/DD AND NOT TIME


    // // // Updating Reducer // // //

    handleUpdate(updateObj, where = 'participant') {
        let newUpdateObj = { ...updateObj, where }
        this.props.updateNestedObject(newUpdateObj);
    }

    handleGender(gender) {
        this.handleUpdate({ what: 'gender', val: gender })
    }

    handleClickToEdit(what) {
        let updateObj = { what, val: '' }
        this.handleUpdate(updateObj)
    }


    render() {
        const {
            user,
            camper: {
                first_name,
                last_name,
                birthday,
                email
            },
            usersParticipants,
            groups,
            camps
        } = this.props

        const { time } = this.state;

        const { classes } = this.props;

        const monthMap = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec',
        };

        // // // Calling Tile Builders // // //
        let mappedParticipants = usersParticipants.map(one => {
            return (<ParticipantTiles
                className='tiles'
                key={`p${one.participant_id}`}
                participant={one}

            />)
        })
        let mappedCamps = camps.map(camp => {
            return (<CampTiles
                className='tiles'
                key={`c${camp.camp_id}`}
                camp={camp}
            />)
        })
        let mappedGroups = groups.map(group => {
            return (<GroupTiles
                className='tiles'
                key={group.group_id}
                group={group}
            />)
        })

        return (
            <div>
                {user.user_id ? (
                    <div>
                        <section>
                            <h1>Begin Registration</h1>
                        </section>
                        {usersParticipants[0] ? (
                            <section className="savedParts">
                                <h2>Select Saved Camper or Fill Out Below to Add a New Camper</h2>
                                {mappedParticipants}
                            </section>

                        ) : (
                                <div>
                                    <h1>No Saved Campers</h1>
                                </div>
                            )}
                        Paper
                        <Paper
                            style={{
                                padding: 30,
                                margin: '15px 0'
                            }}
                        >
                            <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="center"
                                alignItems='center'
                            >
                                <Grid item sx={12}>
                                    <Typography variant='display1' >Are you registering</Typography>
                                </Grid>
                                <h3 onClick={() => { this.handleUpdate({ what: 'self_register', val: true }, 'attendee') }}>Yourself</h3>
                                <h3 onClick={() => { this.handleUpdate({ what: 'self_register', val: false }, 'attendee') }}>Someone In Your Guardianship</h3>
                            </Grid>
                        </Paper>
                        <Paper
                            className="selectCamp"
                            style={{
                                padding: 30,
                                margin: '15px 0'
                            }}
                        >
                            <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="center"
                                alignItems='center'
                            >
                                {/* <Grid item sx={12}> */}
                                <Typography
                                    variant='display2'
                                    style={{
                                        margin: '60px 0'
                                    }}
                                    align='center'
                                >
                                    Select a Camp
                                    </Typography>
                                {/* </Grid> */}
                                {mappedCamps}
                            </Grid>
                        </Paper>
                        <Paper
                            className="selectGroup"
                            style={{
                                padding: 15,
                                margin: '15px 0'
                            }}
                        >
                            <Grid
                                container
                                spacing={8}
                                direction='column'
                                justify="center"
                                alignItems='center'
                            >
                                <Grid item sx={12}>
                                    <Typography
                                        variant='display2'
                                        style={{
                                            margin: '60px 0'
                                        }}
                                    >
                                        Select a Group
                                    </Typography>
                                </Grid>
                                {mappedGroups}
                            </Grid>
                        </Paper>
                        <section>
                            <Paper className="participant-container" >

                                <Grid container
                                    spacing={8}
                                    direction="row"
                                    justify="center"
                                // alignItems="flex-end"
                                >
                                    <Grid item item xs={12}>
                                        <Typography
                                            variant='display2'
                                            align='center'
                                            style={{
                                                margin: '60px 0'
                                            }}
                                        >
                                            Please Fill in Campers Info
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={8} sm={6}
                                        style={{
                                            height: "80px",
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={8}
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-end"
                                        >
                                            <FormControl
                                                margin="normal"
                                                fullWidth={true}
                                            >
                                                <InputLabel>First Name*</InputLabel>
                                                <Input
                                                    onChange={(e) => this.handleUpdate({
                                                        what: 'first_name',
                                                        val: e.target.value
                                                    })}
                                                    value={first_name}
                                                    onClick={() => this.handleClickToEdit('first_name')
                                                    }
                                                    required={true}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={8} sm={6}
                                        style={{
                                            height: "80px",
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={8}
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-end"
                                        >

                                            <FormControl
                                                margin="normal"
                                                fullWidth={true}
                                            >
                                                <InputLabel>Last Name*</InputLabel>
                                                <Input
                                                    onChange={(e) => this.handleUpdate({
                                                        what: 'last_name',
                                                        val: e.target.value
                                                    })}
                                                    value={last_name}
                                                    onClick={() => this.handleClickToEdit('last_name')}
                                                />
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                                    <Grid item>

                                        <Typography
                                            variant='title'
                                            align='center'
                                        >
                                            Campers Birthday
                                    </Typography>
                                    </Grid>
                                </Grid>
                                <h3>Campers Birthday</h3>


                                <MediaQuery maxWidth={768}>
                                    

                                    <button
                                        className="select-btn"
                                        onClick={this.handleClick}>
                                        Select Date
                                        </button>
                                    <input
                                        type="text"
                                        placeholder="dd/mm/yyyy"
                                        onChange={(e) => {
                                            this.handleUpdate(
                                                {
                                                    what: 'birthday',
                                                    val: e.target.value.replace('/', '')
                                                })
                                        }}
                                        value={birthday}
                                    />
                                    <DatePicker
                                        value={time}
                                        isOpen={this.state.isOpen}
                                        onSelect={this.handleSelect}
                                        onCancel={this.handleCancel}
                                        theme='android-dark'
                                        dateFormat={['YYYY', ['MM', (month) => monthMap[month]], 'DD']}
                                        confirmText='Select'
                                        cancelText='Cancel'
                                        max={new Date()}
                                        customHeader="Choose Your Birthday"
                                    />
                                </MediaQuery>
                                <MediaQuery minDeviceWidth={769} >
                                    <Flatpickr data-enable-time
                                        value={time}
                                        onChange={time => { this.setState({ time }) }}
                                        style={{
                                            altInput: true,
                                            altFormat: "F j, Y",
                                            dateFormat: "Y-m-d",
                                        }}
                                    />
                                </MediaQuery>
                                {birthday ? (
                                    <h4>helo</h4>
                                ) : (
                                        <h4>no date selected</h4>
                                    )}
                                <h3>Campers Email</h3>
                                <input
                                    type="text"
                                    onChange={(e) => {
                                        this.handleUpdate(
                                            {
                                                what: 'email',
                                                val: e.target.value
                                            })
                                    }}
                                    onClick={() => this.handleClickToEdit('email')}
                                    value={email}
                                />
                                <div>
                                    <h3>Gender</h3>
                                    <h4
                                        onClick={() => this.handleGender('female')} >Female</h4>
                                    <h4
                                        onClick={() => this.handleGender('male')} >Male</h4>
                                </div>
                            </Paper>
                            <div>
                                <Link to="/user/register/2">
                                    <button>Save and Continue</button>
                                </Link>
                                <Link to='/user/dashboard' >
                                    <button>Cancel</button>
                                </Link>
                            </div>
                        </section>
                    </div>
                ) : (
                        <h1>Please Sign In</h1>
                    )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {
        participant,
        user,
        usersParticipants,
        camps,
        groups
    } = state;

    return {
        camper: participant,
        user,
        usersParticipants,
        camps,
        groups
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject,
    updateObjectOnState,
}

Part1.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Part1))

