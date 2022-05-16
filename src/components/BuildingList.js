import { useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import React from 'react';
import _ from "lodash";
import buildingService from '../services/building.service';
const pageSize = 5;
const BuildingList = ({token, setToken}) => {

  const [buildings, setBuildings] = useState([]);
  const [paginatedBuildings, setPaginatedBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const init = () => {
    buildingService.getAll(token)
      .then(response => {
        console.log('Printing buildings data', response.data);
        setBuildings(response.data);
        setPaginatedBuildings(_(response.data).slice(0).take(pageSize).value());
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const pageCount = buildings? Math.ceil(buildings.length/pageSize) :0;
  const pages = _.range(1, pageCount+1);
  const handleDelete = (id) => {
    console.log('Printing id', id);
    buildingService.remove(id, token)
      .then(response => {
        console.log('Building deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  const pagination=(pageNo)=>{
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedBuildings = _(buildings).slice(startIndex).take(pageSize).value();
    setPaginatedBuildings(paginatedBuildings)
  }

  return (
    <div className="container">
      <h3>List of Buildings</h3>
      <hr/>
      <div>
        <Link to="/createBuilding" className="btn btn-primary mb-2">Add Building</Link>
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
            paginatedBuildings.map(b => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.category}</td>
                <td>{b.address}</td>
                <td>{b.contactInfo}</td>
                <td>
                  <Link className="btn btn-info" to={`/updateBuilding/${b.id}`}>Update</Link>
                  
                  <button className="btn btn-danger ml-2" onClick={() => {
                    handleDelete(b.id);
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

export default BuildingList;