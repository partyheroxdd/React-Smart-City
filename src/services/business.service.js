import httpClient from "../http-common";

const getAll = (token) => {
    return httpClient(token).get('business/getAll');
}

const create = (data, token) => {
    return httpClient(token).post("business/createNews", data);
}

const get = (id, token) => {
    return httpClient(token).get(`/business/getNews/${id}`);
}

const update = (data, token) => {
    return httpClient(token).put('/business/updateNews/', data);
}

const remove = (id, token) => {
    return httpClient(token).delete(`/business/deleteNews/${id}`);
}
export default { getAll, create, get, update, remove };