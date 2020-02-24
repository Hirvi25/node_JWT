import React from "react";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            listEmployee : []
        }
    }

    componentDidMount(){
        this.getItem()
    }

    getItem(){
        let token = localStorage.getItem('tokens');
        token = token.substr(1,token.length -2);
       
        axios.get(`http://localhost:4000/api/user`,{ headers: {
            Authorization: "Bearer " + token
         }})
        .then(response => {
            if(response.data.success){
                const data = response.data.data
                // console.log(data)
                this.setState({
                    listEmployee: data
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

    onDelete(id){
        let token = localStorage.getItem('tokens');
        token = token.substr(1,token.length -2);
      
        axios.delete(`http://localhost:4000/api/user`,{ headers: {
            Authorization: "Bearer " + token}, data:{id} })
         .then(response=>{
             console.log(response)
            if (response.data.success == 1) {
                Swal.fire(
                    'Deleted!',
                    response.data.message,
                    'success'
                )       
            }
            else{
                Swal.fire(
                    'Cancled',
                    'Something went wrong..',
                    'error'
                    ) 
            }
        })
        .catch(e => {
           alert(e)
        });   
        this.getItem();
    }

    render(){
        return (
            <table className="table table-hover table-striped">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">FirstName</th>
                  <th scope="col">LastName</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody> 
                {this.loadFillData()}
              </tbody>
            </table>
          );
    }

    loadFillData(){
        
        return this.state.listEmployee.map((data) => {
            return(
            <tr key={data.id}>  
                <td>{data.id}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.gender}</td>
                <td>{data.email}</td>
                <td>{data.number}</td>
                <td>
                    <Link className="btn btn-outline-info " to={"/edit/"+data.id}> Edit </Link>
                </td>
                <td>
                    <button className="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
                </td>
            </tr>
            )
        });
    }

}

export default Dashboard;