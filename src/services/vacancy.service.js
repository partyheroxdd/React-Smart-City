import httpClient from "../http-common";

const getAll = (token) => {
  return httpClient(token).get('jobseeker/getAll');
}

const create = (data, token) => {
  return httpClient(token).post("jobseeker/createVacancy", data);
}

const get = (id, token) => {
  return httpClient(token).get(`/jobseeker/getVacancy/${id}`);
}

const update = (data, token) => {
  return httpClient(token).put('/jobseeker/updateVacancy/', data);
}

const remove = (id, token) => {
  return httpClient(token).delete(`/jobseeker/deleteVacancy/${id}`);
}
export default {getAll, create, get, update, remove};