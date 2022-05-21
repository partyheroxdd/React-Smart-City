import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import React from 'react';
import vacancyService from "../services/vacancy.service";


const AddVacancy = ({token}) => {
    const[title, setTitle] = useState('');
    const[company, setCompany] = useState('');
    const[description, setDescription] = useState('');
    const[salary, setSalary] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const createVacancy = (e) => {
        e.preventDefault();
        
        const vacancy = {title, company, description, salary, id};
        if (id) {
            vacancyService.update(vacancy, token)
                .then(response => {
                    console.log('Vacancy data updated successfully', response.data);
                    history.push('/getAllVacancy');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            vacancyService.create(vacancy, token)
            .then(response => {
                console.log("Vacancy added successfully", response.data);
                history.push("/getAllVacancy");
            })
            .catch(error => {
                console.log('something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            vacancyService.get(id, token)
                .then(vacan => {
                    setTitle(vacan.data.title);
                    setCompany(vacan.data.company);
                    setDescription(vacan.data.description);
                    setSalary(vacan.data.salary);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add Vacancy</h3>
            <hr/>
            <form>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter title"
                    />

                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company"
                    />

                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description"
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control col-4"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="Enter salary"
                    />
                </div>
                <div >
                    <button onClick={(e) => createVacancy(e)} className="btn btn-success">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/getAllVacancy">Back to List</Link>
        </div>
    )
}

export default AddVacancy;