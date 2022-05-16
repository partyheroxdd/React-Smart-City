import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import React from 'react';
import studentPlaceService from "../services/studentplace.service";

const AddStudentPlace = ({token}) => {
    const[name, setName] = useState('');
    const[category, setCategory] = useState('');
    const[address, setAddress] = useState('');
    const[contactInfo, setContactInfo] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const createStudentPlace = (e) => {
        e.preventDefault();
        
        const studentPlace = {name: name, category: category, address: address, contactInfo: contactInfo, id};
        if (id) {
            studentPlaceService.update(studentPlace, token)
                .then(response => {
                    console.log('Student place data updated successfully', response.data);
                    history.push('/getAllStudentPlace');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            studentPlaceService.create(studentPlace, token)
            .then(response => {
                console.log("Student place added successfully", response.data);
                history.push("/getAllStudentPlace");
            })
            .catch(error => {
                console.log('Something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            studentPlaceService.get(id)
                .then(studentPlace => {
                    setName(studentPlace.data.name);
                    setCategory(studentPlace.data.category);
                    setAddress(studentPlace.data.address);
                    setContactInfo(studentPlace.data.contactInfo);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add Student Place</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter name"
                    />

                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="Enter category"
                    />

                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter address"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="ContactInfo"
                        value={contactInfo}
                        onChange={(e) => setContactInfo(e.target.value)}
                        placeholder="Enter contactInfo"
                    />
                </div>
                <div >
                    <button onClick={(e) => createStudentPlace(e)} className="btn btn-success">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/getAllStudentPlace">Back to List</Link>
        </div>
    )
}

export default AddStudentPlace;