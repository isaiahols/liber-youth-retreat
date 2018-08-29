import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { testerThing } from "../../../../Ducks/registration";
import { connect } from "react-redux";

class Part1 extends Component {


    updateThing(){
        this.props.testerThing(['thing',1232])
    }

    render() {
        return (
            <div>
                <h1>{this.props.test.thing}</h1>
                <h1>{this.props.test.stuff}</h1>
                <button onClick={()=>this.updateThing()} >Click Me</button>
                <section>
                    <h1>Begin Registration</h1>
                </section>
                <section className="savedParts">
                    {/* add turnery statement here to show Only if there are saved participants */}
                    <h2>Select Saved Camper or Fill Out Below to Add a New Camper</h2>
                    {/* display saved participants from participants table in db*/}
                </section>
                <section className="selectCamp">
                    <h1>Select a Camp</h1>
                    {/* list of camps (from camps table in db) */}
                    {/* display Camp Tiles from  */}
                </section>
                <section className="selectGroup">
                    <h1>Select a Group</h1>
                    {/* Group Tiles from Components/TileBuilder/GroupTiles */}
                </section>
                <section>
                    <div className="ParticipantFields">
                        <h3>Campers First Name</h3>
                        <input type="text" />
                        <h3>Campers Last Name</h3>
                        <input type="text" />
                        <h3>Campers Birthday</h3>
                        <input type="text" placeholder="(dd/mm/yyyy)" />
                        <h3>Campers Email</h3>
                        <input type="text" />
                        <div>
                            <h3>Gender</h3>
                            <h4>Female</h4>
                            <h4>Male</h4>
                        </div>
                    </div>
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
        )
    }
}

function mapStateToProps({ test }) {
    return { test }
}

export default connect(mapStateToProps,{testerThing})(Part1)