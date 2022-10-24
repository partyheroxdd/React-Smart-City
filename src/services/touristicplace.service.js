import httpClient from "../http-common";

const getAll = (token) => {
  return httpClient(token).get('tourism/getAll');
}

const create = (data, token) => {
  return httpClient(token).post("tourism/createTouristicPlace", data);
}

const get = (id, token) => {
  return httpClient(token).get(`/tourism/getTouristicPlace/${id}`);
}

const update = (data, token) => {
  return httpClient(token).put('/tourism/updateTouristicPlace/', data);
}

const remove = (id, token) => {
  return httpClient(token).delete(`/tourism/deleteTouristicPlace/${id}`);
}
export default {getAll, create, get, update, remove};