import { useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import touristicPlaceService from '../services/touristicplace.service';
import React from 'react';
import _ from "lodash";

const pageSize = 5;
const TouristicPlaceList = () => {

  const [touristcPlaces, setTouristicPlaces] = useState([]);
  const [paginatedTouristicPlaces, setPaginatedTouristicPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const init = () => {
    touristicPlaceService.getAll(localStorage.getItem("token"))
      .then(response => {
        console.log('Printing touristic place data', response.data);
        setTouristicPlaces(response.data);
        setPaginatedTouristicPlaces(_(response.data).slice(0).take(pageSize).value());
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const pageCount = touristcPlaces? Math.ceil(touristcPlaces.length/pageSize) :0;
  const pages = _.range(1, pageCount+1);
  const handleDelete = (id) => {
    console.log('Printing id', id);
    touristicPlaceService.remove(id, localStorage.getItem("token"))
      .then(response => {
        console.log('Touristic place deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  const pagination=(pageNo)=>{
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedStudentPlaces = _(touristcPlaces).slice(startIndex).take(pageSize).value();
    setPaginatedTouristicPlaces(paginatedStudentPlaces)
  }

  return (
    <div className="container">
      <h3>List of Touristic Places</h3>
      <hr/>
      <div>
        <Link to="/createTouristicPlace" className="btn btn-primary mb-2">Add Touristic Place</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>
              <th>ContactInfo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            paginatedTouristicPlaces.map(t => (
              <tr key={t.id}>
                <td>{t.name}</td>
                <td>{t.type}</td>
                <td>{t.address}</td>
                <td>{t.contactInfo}</td>
                <td>
                  <Link className="btn btn-info" to={`/updateTouristicPlace/${t.id}`}>Update</Link>
                  
                  <button className="btn btn-danger ml-2" onClick={() => {
                    handleDelete(t.id);
                  }}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
        
      </div>
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {
            pages.map((page)=>(
              <li className={
                page === currentPage? "page-item active":"page-item"
              }
              > 
                <p className="page-link" 
                onClick={()=>pagination(page)}>
                {page}
                </p>
                </li>
            ))
          }
        </ul>
      </nav>
    </div>
  );
}

export default TouristicPlaceList;