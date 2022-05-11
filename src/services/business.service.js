import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('business/getAll');
}

const create = data => {
    return httpClient.post("business/createNews", data);
}

const get = id => {
    return httpClient.get(`/business/getNews/${id}`);
}

const update = data => {
    return httpClient.put('/business/updateNews/', data);
}

const remove = id => {
    return httpClient.delete(`/business/deleteNews/${id}`);
}
export default { getAll, create, get, update, remove };