import React, { Component } from 'react'
// import {m}

import './Home.css';


export default class Home extends Component {
    render() {
        return (
            <div className='hp-grid-container' >
                <div className='hp-top-area' >
                    <div className='hp-top-area-content' >

                        <h1>Liber Youth Retreat</h1>
                        <h3>A Leadership Education Experience</h3>
                        <button>Register</button>
                    </div>
                </div>
                <div className="hp-main-area-container">
                    <section className="lyr-info-container">
                        <h2>What Is LYR</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci omnis minima quam velit eligendi? Asperiores cumque ratione blanditiis, veritatis beatae sequi quod. Impedit consectetur, neque reprehenderit molestiae maiores incidunt aliquam temporibus tempora quod ex recusandae odit veritatis, modi amet eligendi, consequatur totam et illum numquam ab culpa quia? Cumque ea mollitia quisquam distinctio, odio eveniet recusandae unde voluptatem suscipit dolore explicabo ullam assumenda maiores vero, ipsa a fugit, dolorem similique.</p>
                    </section>
                    <section className="info-tiles-container">
                        <div className="info-tiles">
                            <img src="" alt="" />
                            <h2>Leadership</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa error totam natus, ea, soluta consectetur amet doloribus suscipit modi maxime delectus repellat placeat tempora quaerat?</p>
                        </div>
                        <div className="info-tiles middle-tile">
                            <h2 className='info-title' id='tile-middle-h2' >Education</h2>
                            {/* <div className="info-tiles-content"> */}
                            <img src="http://placehold.jp/150x150.png" alt="" className='info-img'
                                id='tile-middle-photo'
                            />
                            <p id='tile-middle-p' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa error totam natus, ea, soluta consectetur amet doloribus suscipit modi maxime delectus repellat placeat tempora quaerat?</p>
                            {/* </div> */}
                        </div>
                        <div className="info-tiles">
                            <img src="" alt="" />
                            <h2>Example</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa error totam natus, ea, soluta consectetur amet doloribus suscipit modi maxime delectus repellat placeat tempora quaerat?</p>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}
