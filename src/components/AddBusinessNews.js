import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import businessService from "../services/business.service";
import React from 'react';

const AddBusinessNews = ({token}) => {
    const[title, setTitle] = useState('');
    const[company, setCompany] = useState('');
    const[description, setDescription] = useState('');
    const history = useHistory();
    const {id} = useParams();

    const createNews = (e) => {
        e.preventDefault();
        
        const businessNews = {title, company, description, id};
        if (id) {
            businessService.update(businessNews, token)
                .then(response => {
                    console.log('Business news data updated successfully', response.data);
                    history.push('/getAllNews');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                }) 
        } else {
            businessService.create(businessNews, token)
            .then(response => {
                console.log("Business news added successfully", response.data);
                history.push("/getAllNews");
            })
            .catch(error => {
                console.log('Something went wroing', error);
            })
        }
    }

    useEffect(() => {
        if (id) {
            businessService.get(id, token)
                .then(businessNews => {
                    setTitle(businessNews.data.title);
                    setCompany(businessNews.data.company);
                    setDescription(businessNews.data.description);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])
    return(
        <div className="container">
            <h3>Add Business News</h3>
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
                <div >
                    <button onClick={(e) => createNews(e)} className="btn btn-success">Save</button>
                </div>
            </form>
            <hr/>
            <Link to="/getAllNews">Back to List</Link>
        </div>
    )
}

export default AddBusinessNews;