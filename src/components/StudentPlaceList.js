import { useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import studentPlaceService from '../services/studentplace.service';
import React from 'react';
import _ from "lodash";

const pageSize = 5;
const StudentPlaceList = () => {

  const [studentPlaces, setStudentPlaces] = useState([]);
  const [paginatedStudentPlaces, setPaginatedStudentPlaces] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const init = () => {
    studentPlaceService.getAll(localStorage.getItem("token"))
      .then(response => {
        console.log('Printing student place data', response.data);
        setStudentPlaces(response.data);
        setPaginatedStudentPlaces(_(response.data).slice(0).take(pageSize).value());
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const pageCount = studentPlaces? Math.ceil(studentPlaces.length/pageSize) :0;
  const pages = _.range(1, pageCount+1);
  const handleDelete = (id) => {
    console.log('Printing id', id);
    studentPlaceService.remove(id, localStorage.getItem("token"))
      .then(response => {
        console.log('Student place deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  const pagination=(pageNo)=>{
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedStudentPlaces = _(studentPlaces).slice(startIndex).take(pageSize).value();
    setPaginatedStudentPlaces(paginatedStudentPlaces)
  }

  return (
    <div className="container">
      <h3>List of Student Places</h3>
      <hr/>
      <div>
        <Link to="/createStudentPlace" className="btn btn-primary mb-2">Add Student Place</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Address</th>
              <th>ContactInfo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            paginatedStudentPlaces.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.category}</td>
                <td>{s.address}</td>
                <td>{s.contactInfo}</td>
                <td>
                  <Link className="btn btn-info" to={`/updateStudentPlace/${s.id}`}>Update</Link>
                  
                  <button className="btn btn-danger ml-2" onClick={() => {
                    handleDelete(s.id);
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

export default StudentPlaceList;