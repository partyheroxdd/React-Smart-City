import { useEffect, useState} from 'react';
import { Link} from 'react-router-dom';
import businessService from '../services/business.service';
import React from 'react';
import _ from "lodash";
const pageSize = 5;
const BusinessNewsList = ({token, setToken}) => {
  const [businessNews, setBusinessNews] = useState([]);
  const [paginatedBusinessNews, setPaginatedBusinessNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const init = () => {
    businessService.getAll(token)
      .then(response => {
        console.log('Printing business news data', response.data);
        setBusinessNews(response.data);
        setPaginatedBusinessNews(_(response.data).slice(0).take(pageSize).value());
      })
      .catch(error => {
        console.log('Something went wrong', error);
      }) 
  }

  useEffect(() => {
    init();
  }, []);

  const pageCount = businessNews? Math.ceil(businessNews.length/pageSize) :0;
  const pages = _.range(1, pageCount+1);
  const handleDelete = (id) => {
    console.log('Printing id', id);
    businessService.remove(id, token)
      .then(response => {
        console.log('Business news deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  const pagination=(pageNo)=>{
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedBusinessNew = _(businessNews).slice(startIndex).take(pageSize).value();
    setPaginatedBusinessNews(paginatedBusinessNew)
  }

  return (
    <div className="container">
      <h3>List of Business News</h3>
      <hr/>
      <div>
        <Link to="/createNews" className="btn btn-primary mb-2">Add Business News</Link>
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {
            paginatedBusinessNews.map(b => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.company}</td>
                <td>{b.description}</td>
                <td>
                  <Link className="btn btn-info" to={`/updateNews/${b.id}`}>Update</Link>
                  
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

export default BusinessNewsList;