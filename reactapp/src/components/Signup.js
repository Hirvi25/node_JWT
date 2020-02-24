import React, {useState} from 'react';

import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

function Signup(props){
    const [isSignup, setSignup] = useState(false);
    const [isError, setIsError] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState("m");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");

    
    function postSignup(){

        if(first_name && last_name && gender && email && password && number){
            axios.post("http://localhost:4000/api/user", {
            first_name,
            last_name,
            gender,
            email,
            password,
            number
            }).then(response => {
                if (response.data.success == 1) {
                    Swal.fire(
                        'Inserted!',
                        response.data.message,
                        'success'
                        ) 
                    setSignup(true)
                }
                
            }).catch(e => {
                Swal.fire(
                    'Cancelled',
                    'Email is already used! Please use another email to register',
                    'error'
                    ) 
                setEmail('')
            });   
        }
        else{
            setIsError(true);
        }
    }

    if (isSignup) {
        return <Redirect to="/" />;
    }


    return(
        <div className="card text-center w-50">
            <div className="card-header">
                Signup
            </div>
            <div className="card-body">
                <div className="form-row justify-content-center">
                    <div className="form-group">
                    <input className="form-control"
                            type="first_name"
                            value={first_name}
                            onChange={e => {
                                setFirstName(e.target.value);
                            }}
                            placeholder="First Name" 
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <input className="form-control"
                            type="last_name"
                            value={last_name}
                            onChange={e => {
                                setLastName(e.target.value);
                            }}
                            placeholder="Last Name" 
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <select className="form-control" 
                            type="gender"
                            value={gender}
                            onChange={e => {
                                setGender(e.target.value);
                            }}
                   >
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Other</option>
                    </select>
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    
                    <input className="form-control"
                            type="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Email"
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group">
                        
                        <input className="form-control" 
                                type="password"
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value);
                                }} placeholder="password" 
                        />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <input className="form-control"
                            type="number"
                            value={number}
                            onChange={e => {
                                setNumber(e.target.value);
                            }}
                            placeholder="Number" 
                    />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={postSignup}>Signup</button> 
            </div>
            <div className="card-footer text-muted">               
                <Link to="/">Already have an account?</Link>
            </div>
            { isError &&<div className="alert alert-warning" role="alert">All the fields are required to fill!</div> }

        </div>
    )
    }

export default Signup;