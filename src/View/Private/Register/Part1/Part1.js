import React, { Component } from 'react'

export default class Part1 extends Component {
    render() {
        return (
            <div>
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
                        <button>Save and Continue</button>
                        <button>Cancel</button>
                    </div>
                </section>
            </div>
        )
    }
}
