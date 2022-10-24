import httpClient from "../http-common";

const getAll = (token) => {
  return httpClient(token).get('admin/getAll');
}

const create = (data, token) => {
  return httpClient(token).post("admin/createBuilding", data);
}

const get = (id, token) => {
  return httpClient(token).get(`/admin/getBuilding/${id}`);
}

const update = (data, token) => {
  return httpClient(token).put('/admin/updateBuilding/', data);
}

const remove = (id, token) => {
  return httpClient(token).delete(`/admin/deleteBuilding/${id}`);
}
export default {getAll, create, get, update, remove};