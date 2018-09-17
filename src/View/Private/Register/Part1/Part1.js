import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import DatePicker from 'react-mobile-datepicker';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Moment from 'react-moment';
import moment from 'moment'


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
    Button,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


import 'flatpickr/dist/themes/dark.css'
import './Part1.css';

const styles = theme => ({
    tiles: {
        maxWidth: 600,
        marginTop: theme.spacing.unit,
    },
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
})






class Part1 extends Component {
    constructor(props) {
        super(props)


        this.state = {
            time: new Date(),
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
        if (time[0]) {
            time = time[0]
        }
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

    handleGender = (event) => {
        this.handleUpdate({ what: 'gender', val: event.target.value })
    }

    handleClickToEdit(what) {
        let updateObj = { what, val: '' }
        this.handleUpdate(updateObj)
    }

    handleSelfRegister = (event) => {
        this.handleUpdate({ what: 'self_register', val: event.target.value }, 'attendee')
    }


    render() {
        const { time } = this.state;
        const {
            user,
            camper: {
                first_name,
                last_name,
                birthday = time,
                email,
                gender
            },
            usersParticipants,
            groups,
            camps,
            attendee: { self_register },
        } = this.props


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
                        <Paper
                            style={{
                                padding: 15,
                                margin: '15px 0'
                            }}
                        >
                            <Typography
                                variant='display3'
                                align='center'
                                style={{
                                    margin: '60px 0'
                                }}
                            >
                                Begin Registration
                            </Typography>
                        </Paper>
                        {usersParticipants[0] ? (
                            <Paper
                                className="savedParts"
                                style={{
                                    padding: 30,
                                    margin: '15px 0'
                                }}
                            >
                                <Typography
                                    variant='display2'
                                    align='center'
                                    style={{
                                        margin: '60px 0'
                                    }}
                                >
                                    Select Saved Camper
                                </Typography>
                                <Grid
                                    container
                                    spacing={24}
                                    direction='column'
                                    justify="center"
                                    alignItems='center'
                                >
                                    {mappedParticipants}
                                    <Typography
                                        variant='body1'
                                        align='center'
                                        style={{
                                            margin: '15px 0'
                                        }}
                                    >
                                        or Add New Camper Below
                                </Typography>
                                </Grid>
                            </Paper>

                        ) : (
                                <div>
                                    {null}
                                </div>
                            )}
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
                                <FormControl
                                    component="fieldset"
                                    className={classes.formControl}
                                >
                                    {/* <FormLabel component="legend">Gender</FormLabel> */}
                                    <RadioGroup
                                        aria-label="Registering Agent"
                                        name="RegAgent"
                                        className={classes.group}
                                        value={self_register}
                                        onChange={this.handleSelfRegister}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yourself" />
                                        <FormControlLabel value="false" control={<Radio />} label="Someone In Your Guardianship" />
                                    </RadioGroup>
                                </FormControl>
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
                                    <Grid item xs={12}>
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

                                    <Grid item xs={8}
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
                                            <Grid item xs={12} sm={6}>
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
                                    </Grid>
                                    <Grid item xs={8}
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
                                            <Grid item xs={12} sm={6}>
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
                                    </Grid>
                                    <MediaQuery maxWidth={768}>
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
                                        <Flatpickr
                                            // data-enable-time
                                            value={time}
                                            // onChange={time => { this.setState({ time }) }}
                                            onChange={this.handleSelect}
                                            style={{
                                                altInput: true,
                                                altFormat: "F j, Y",
                                                dateFormat: "Y-m-d",
                                            }}
                                        />
                                    </MediaQuery>
                                    <Grid
                                        item
                                        xs={8}
                                        style={{
                                            margin: " 25px 0 15px"
                                        }}
                                    >

                                        <Typography
                                            variant='title'
                                            align='center'
                                        >
                                            Campers Birthday
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={8} sm={6}
                                        style={{
                                            height: "80px",
                                            margin: "15px 0 30px"
                                        }}
                                    >
                                        <Grid
                                            container
                                            spacing={8}
                                            direction="row"
                                            justify="center"
                                            alignItems="flex-end"
                                        >
                                            <Button
                                                onClick={this.handleClick}
                                                color='primary'
                                                variant="contained"
                                            >
                                                Select Date
                                            </Button>
                                            {birthday ? (
                                                <FormControl
                                                    margin="normal"
                                                    fullWidth={true}
                                                >
                                                    <InputLabel>Birth Date*</InputLabel>
                                                    <Input
                                                        type="text"
                                                        placeholder="dd/mm/yyyy"
                                                        onChange={(e) => {
                                                            this.handleUpdate(
                                                                {
                                                                    what: 'birthday',
                                                                    val: e.target.value
                                                                })
                                                        }}
                                                        value={moment(birthday).format('DD MMMM YYYY')}
                                                        required={true}
                                                        style={{
                                                            altInput: true,
                                                            altFormat: "F j, Y",
                                                            dateFormat: "Y-m-d",
                                                        }}
                                                    />
                                                </FormControl>
                                            ) : (
                                                    <div>{null}</div>
                                                )}
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
                                                <InputLabel>Camper's Email*</InputLabel>
                                                <Input
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
                                            </FormControl>

                                        </Grid>
                                    </Grid>
                                    <FormControl
                                        component="fieldset"
                                        className={classes.formControl}
                                    >
                                        <FormLabel component="legend">Gender</FormLabel>
                                        <RadioGroup
                                            aria-label="Gender"
                                            name="gender1"
                                            className={classes.group}
                                            value={gender}
                                            onChange={this.handleGender}
                                        >
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            </Paper>
                            {/* <Grid item xs={12}
                                style={{
                                    height: "80px",
                                }}
                            > */}
                                <Grid
                                    container
                                    spacing={8}
                                    direction="row"
                                    justify="center"
                                    style={{
                                        padding: 10
                                    }}
                                    alignContent= 'space-around'
                                >
                                    <Grid item>
                                        <Button
                                            component={Link}
                                            to="/user/dashboard"
                                            color='primary'
                                            variant="contained"
                                            fullWidth
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item >
                                        <Button
                                            component={Link}
                                            to="/user/register/2"
                                            color='primary'
                                            variant="contained"
                                            fullWidth
                                        >
                                            Save and Continue
                                        </Button>
                                    </Grid>
                                </Grid>
                            {/* </Grid> */}
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
        groups,
        attendee
    } = state;

    return {
        camper: participant,
        user,
        usersParticipants,
        camps,
        groups,
        attendee
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

