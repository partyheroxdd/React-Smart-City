import httpClient from "../http-common";

const getAll = (token) => {
  return httpClient(token).get('student/getAll');
}

const create = (data, token) => {
  return httpClient(token).post("student/createStudentPlace", data);
}

const get = (id, token) => {
  return httpClient(token).get(`/student/getStudentPlace/${id}`);
}

const update = (data, token) => {
  return httpClient(token).put('/student/updateStudentPlace/', data);
}

const remove = (id, token) => {
  return httpClient(token).delete(`/student/deleteStudentPlace/${id}`);
}
export default {getAll, create, get, update, remove};