import React, {useState} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {useEffect} from "react/cjs/react.development";
import touristicPlaceService from "../services/touristicplace.service";

const AddTouristicPlace = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const history = useHistory();
  const {id} = useParams();

  const createTouristicPlace = (e) => {
    e.preventDefault();

    const touristicPlace = {
      name: name,
      type: type,
      address: address,
      contactInfo: contactInfo,
      id
    };
    if (id) {
      touristicPlaceService.update(touristicPlace,
          localStorage.getItem("token"))
      .then(response => {
        console.log('Touristic place data updated successfully', response.data);
        history.push('/getAllTouristicPlace');
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
    } else {
      touristicPlaceService.create(touristicPlace,
          localStorage.getItem("token"))
      .then(response => {
        console.log("Touristic place added successfully", response.data);
        history.push("/getAllTouristicPlace");
      })
      .catch(error => {
        console.log('Something went wroing', error);
      })
    }
  }

  useEffect(() => {
    if (id) {
      touristicPlaceService.get(id, localStorage.getItem("token"))
      .then(touristicPlace => {
        setName(touristicPlace.data.name);
        setType(touristicPlace.data.type);
        setAddress(touristicPlace.data.address);
        setContactInfo(touristicPlace.data.contactInfo);
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
    }
  }, [])
  return (
      <div className="container">
        <h3>Add Tourstic Place</h3>
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
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Enter type"
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
          <div>
            <button onClick={(e) => createTouristicPlace(e)}
                    className="btn btn-success">Save
            </button>
          </div>
        </form>
        <hr/>
        <Link to="/getAllTouristicPlace">Back to List</Link>
      </div>
  )
}

export default AddTouristicPlace;