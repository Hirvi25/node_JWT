import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

class Edit extends React.Component{
    constructor(props){
        super(props);
        this.state={
            listEmployee:[],
            first_name:'',
            last_name:'',
            gender:'',
            email:'',
            password:'',
            number:'',
            isError:false,
            toDashboard:false
        }
    }
    componentDidMount(){
        let token = localStorage.getItem('tokens');
        token = token.substr(1,token.length -2);
        
        const id = this.props.match.params.id;
        axios.get(`http://localhost:4000/api/user/${id}`,{ headers: {
            Authorization: "Bearer " + token
         }})
        .then(response => {
            if(response.data.success){
                const data = response.data.data
                // console.log(data)
                this.setState({
                    listEmployee:data,
                    first_name: data.firstName,
                    last_name: data.lastName,
                    gender: data.gender,
                    email: data.email,
                    number: data.number
                })
            }
            else{
                alert('Error.....')
            }
        })
        .catch(error => {
            alert('Error Server' + error)
        })
    }

    updateData(){
        console.log(this.props)
        const { first_name,last_name,gender,email,password,number} = this.state;
        let token = localStorage.getItem('tokens');
        token = token.substr(1,token.length -2);

        if(first_name && last_name && gender && email && password && number){
        
        axios.patch(`http://localhost:4000/api/user`,{
            id: this.state.listEmployee.id,
            first_name,
            last_name,
            gender,
            email,
            password,
            number
        },{ headers: {
            Authorization: "Bearer " + token
         }})
         .then(response=>{
            if (response.data.success == 1) {
                this.setState({toDashboard:true})
                Swal.fire(
                    'Updated!',
                    response.data.message,
                    'success'
                    )       
            }
        })
        .catch(e => {
            Swal.fire(
                'Cancelled',
                'Something went wrong..',
                'error'
                ) 
        });   
        }else{
            this.setState({
                isError: true
            })
        }   
    }

  
    render(){
        if (this.state.toDashboard === true) {
            return <Redirect to='/dashboard' />
          }
        return(
            this.state.listEmployee && (
            <div className="card text-center w-50">
            <div className="card-header">
                Edit Data
            </div>
            <div className="card-body">
                <div className="form-row justify-content-center">
                    <div className="form-group">
                    <input className="form-control"
                            type="first_name"
                            value={this.state.first_name}
                            onChange={e => {
                                this.setState({
                                    first_name: e.target.value
                                })
                            }}
                            placeholder="First Name" 
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <input className="form-control"
                            type="last_name"
                            value={this.state.last_name}
                            onChange={e => {
                                this.setState({
                                    last_name: e.target.value
                                })
                            }}
                            placeholder="Last Name" 
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <select className="form-control" 
                           value={this.state.gender}
                           onChange={e => {
                               this.setState({
                                   gender: e.target.value
                               })
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
                            value={this.state.email}
                            onChange={e => {
                                this.setState({
                                    email: e.target.value
                                })
                            }}
                            placeholder="Email"
                    />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group">
                        
                        <input className="form-control" 
                                type="password"
                                value={this.state.password}
                                onChange={e => {
                                    this.setState({
                                        password: e.target.value
                                    })
                                }}
                             placeholder="password" 
                        />
                    </div>
                </div>
                <div className="form-row justify-content-center">
                    <div className="form-group ">
                    <input className="form-control"
                            type="number"
                            value={this.state.number}
                            onChange={e => {
                                this.setState({
                                    number: e.target.value
                                })
                            }}
                            placeholder="Number" 
                    />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={() => this.updateData()}>Edit</button> 
            </div>
            <div className="card-footer text-muted"> 
            { this.state.isError &&<div className="alert alert-warning" role="alert">All the fields are required to fill!</div> }
                
            </div>

        </div>
        )
        )
    }
}

export default Edit