import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import vacancyService from '../services/vacancy.service';
import _ from "lodash";

const pageSize = 5;
const VacancyList = () => {

  const [vacancy, setVacancy] = useState([]);
  const [paginatedVacancy, setPaginatedVacancy] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const init = () => {
    vacancyService.getAll(localStorage.getItem("token"))
    .then(response => {
      console.log('Printing vacancy data', response.data);
      setVacancy(response.data);
      setPaginatedVacancy(_(response.data).slice(0).take(pageSize).value());
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
  }

  useEffect(() => {
    init();
  }, []);

  const pageCount = vacancy ? Math.ceil(vacancy.length / pageSize) : 0;
  const pages = _.range(1, pageCount + 1);
  const handleDelete = (id) => {
    console.log('Printing id', id);
    vacancyService.remove(id, localStorage.getItem("token"))
    .then(response => {
      console.log('Vacancy deleted successfully', response.data);
      init();
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
  }

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedVac = _(vacancy).slice(startIndex).take(pageSize).value();
    setPaginatedVacancy(paginatedVac)
  }

  return (
      <div className="container">
        <h3>List of Vacancies</h3>
        <hr/>
        <div>
          <Link to="/createVacancy" className="btn btn-primary mb-2">Add
            Vacancy</Link>
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Company</th>
              <th>Description</th>
              <th>Salary</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {
              paginatedVacancy.map(v => (
                  <tr key={v.id}>
                    <td>{v.title}</td>
                    <td>{v.company}</td>
                    <td>{v.description}</td>
                    <td>{v.salary}</td>
                    <td>
                      <Link className="btn btn-info"
                            to={`/updateVacancy/${v.id}`}>Update</Link>

                      <button className="btn btn-danger ml-2" onClick={() => {
                        handleDelete(v.id);
                      }}>Delete
                      </button>
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
              pages.map((page) => (
                  <li className={
                    page === currentPage ? "page-item active" : "page-item"
                  }
                  >
                    <p className="page-link"
                       onClick={() => pagination(page)}>
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

export default VacancyList;