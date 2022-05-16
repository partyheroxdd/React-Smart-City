import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('jobseeker/getAll');
}

const create = data => {
    return httpClient.post("jobseeker/createVacancy", data);
}

const get = id => {
    return httpClient.get(`/jobseeker/getVacancy/${id}`);
}

const update = data => {
    return httpClient.put('/jobseeker/updateVacancy/', data);
}

const remove = id => {
    return httpClient.delete(`/jobseeker/deleteVacancy/${id}`);
}
export default { getAll, create, get, update, remove };