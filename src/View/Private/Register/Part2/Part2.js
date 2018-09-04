import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { connect } from "react-redux";
import Dropzone from 'react-dropzone';
import {v4 as randomString} from 'uuid';
import { PacmanLoader } from 'react-spinners';

import {
    updateUser,
    updateNestedObject
} from "../../../../Ducks/registration";

import './Part2.css';


class Part2 extends Component {
    constructor() {
        super()
        this.state = { 
            files: [],
            isUploading: false,
            images: [],
            url: 'http://via.placeholder.com/450x450',
            value: '' 
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

    // // // PHOTO UPLOADING // // //

    onDrop(files) {
        this.setState({
            files
        });
    }

    uploadFile = (file, signedRequest, url) => {
    
    var options = {
      headers: {
        'Content-Type': file.type
      }
    };

    axios.put(signedRequest, file, options)
    .then( response => {
      this.setState({isUploading: false, url: url})
      // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      this.handleUpdate({ what: 'photo', val: url })
    })
    .catch( err => {
      this.setState({
        isUploading: false
      })
      if(err.response.status === 403) {
        alert('Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n' + err.stack)
      } else {
        alert(`ERROR: ${err.status}\n ${err.stack}`)
      }
    })
  }

    
   getSignedRequest = ([file]) => {
    this.setState({isUploading: true})
    
    const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`

    axios.get('/sign-s3', {
      params: {
        'file-name': fileName,
        'file-type': file.type
      }
    }).then( (response) => {
      const { signedRequest, url } = response.data 
      this.uploadFile(file, signedRequest, url)
    }).catch( err => {
      console.log(err)
    })
  }




    // // // UPDATE REDUX // // //
    handleUpdate(updateObj) {
        let newUpdateObj = { ...updateObj, where: 'participant', }
        this.props.updateNestedObject(newUpdateObj);
    }

    handleSize(size) {
        this.handleUpdate({ what: 'size', val: size })
    }

    handleOrderBooks(answer) {
        this.handleUpdate({ what: 'order_books', val: answer })
    }

    render() {
        const {
            user,
            camper: {
                health_card_num,
                dietary_concerns,
                medical_concerns,
                comments,
                photo
            }
        } = this.props

        return (
            <div>
                {user.user_id ? (

                    <div>
                        <section className="top">
                            <h1>More Details</h1>
                        </section>
                        <section>
                            <h2>A Few More Things</h2>
                            <h3>Upload a Photo</h3>
                            <div className="photoUploader">
                                {/* This is where React S3 Uploader */}
                                    <div className="dropzone">
                                        {/* <Dropzone onDrop={this.onDrop.bind(this)}>
                                            <p>Try dropping some files here, or click to select files to upload.</p>
                                        </Dropzone> */}
                                        <Dropzone 
                                            onDropAccepted={this.getSignedRequest}
                                            style={{
                                            position: 'relative',
                                            width: 200,
                                            height: 200,
                                            borderWidth: 7,
                                            marginTop: 100,
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
                                            
                                            { this.state.isUploading 
                                                ?  <PacmanLoader />
                                                : <p>Drop File or Click Here</p>
                                            }

                                        </Dropzone>
                                    </div>
                                <img src={photo} className='confirmphoto' />
                            </div>
                            <div className="shirtSize">
                                <h3>T-Shirt size</h3>
                                {/* All have an onClick */}
                                <h4 onClick={() => this.handleSize('XS')} >XS</h4>
                                <h4 onClick={() => this.handleSize('S')} >S</h4>
                                <h4 onClick={() => this.handleSize('M')} >M</h4>
                                <h4 onClick={() => this.handleSize('L')} >L</h4>
                                <h4 onClick={() => this.handleSize('XL')} >XL</h4>
                            </div>
                            <div>
                                <h2>Order Books Now</h2>
                                {/* Both have an onClick */}
                                <h3 onClick={() => this.handleOrderBooks(true)} >Yes!</h3>
                                <h3 onClick={() => this.handleOrderBooks(false)} >No, not right now</h3>
                            </div>
                        </section>
                        <section>
                            <div>
                                <h2>Please List ALL Dietary Concerns</h2>
                                <textarea
                                    name="Dietary Concerns"
                                    id="" cols="30"
                                    rows="5"
                                    onChange={(e) => this.handleUpdate({ what: 'dietary_concerns', val: e.target.value })}
                                    value={dietary_concerns}
                                ></textarea>
                            </div>
                            <div>
                                <h2>Please List ALL Medical Concerns</h2>
                                <textarea
                                    name="Medical Concerns"
                                    type="text"
                                    ols="30"
                                    rows="6"
                                    onChange={(e) => this.handleUpdate({ what: 'medical_concerns', val: e.target.value })}
                                    value={medical_concerns}
                                ></textarea>
                            </div>
                            <div>
                                <h2>Health Care Number</h2>
                                <input
                                    type="text"
                                    onChange={(e) => this.handleUpdate({ what: 'health_card_num', val: e.target.value })}
                                    value={health_card_num}
                                />
                            </div>
                        </section>
                        <div>
                            <h2>Anything else you want to tell us?</h2>
                            <textarea
                                name="Comments"
                                id=""
                                cols="30"
                                rows="10"
                                onChange={(e) => this.handleUpdate({ what: 'comments', val: e.target.value })}
                                value={comments}
                            ></textarea>
                        </div>
                        <div>
                            <Link to="/user/register/3">
                                <button>Save and Continue</button>
                            </Link>
                            <Link to='/user/register/1' >
                                <button>Previous</button>
                            </Link>
                            <Link to='/user/dashboard' >
                                <button>Cancel</button>
                            </Link>
                        </div>
                    </div>
                ) : (
                        <div>
                            <h1>Please Sign in</h1>
                        </div >
                    )
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { participant, user } = state;
    return {
        camper: participant,
        user
    }
}

const mapDispatchToProps = {
    updateUser,
    updateNestedObject
}

export default connect(mapStateToProps, mapDispatchToProps)(Part2)