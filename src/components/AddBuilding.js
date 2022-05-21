import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import React from 'react';
import buildingService from "../services/building.service";

const AddBuilding = ({token}) => {
    const[name, setName] = useState('');
    const[category, setCategory] = useState('');
    const[address, setAddress] = useState('');
    const[contactInfo, setContactInfo] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const createBuilding = (e) => {
        e.preventDefault();
        
        const building = {name: name, category: category, address: address, contactInfo: contactInfo, id};
        if (id) {
            buildingService.update(building, token)
                .then(response => {
                    console.log('Building data updated successfully', response.data);
                    history.push('/getAllBuilding');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            buildingService.create(building, token)
            .then(response => {
                console.log("Building added successfully", response.data);
                history.push("/getAllBuilding");
            })
            .catch(error => {
                console.log('Something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            buildingService.get(id, token)
                .then(building => {
                    setName(building.data.name);
                    setCategory(building.data.category);
                    setAddress(building.data.address);
                    setContactInfo(building.data.contactInfo);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add Building</h3>
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
                    <button onClick={(e) => createBuilding(e)} className="btn btn-success">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/getAllBuilding">Back to List</Link>
        </div>
    )
}

export default AddBuilding;