import httpClient from "../http-common-reg";

const register = data => {
    return httpClient.post("auth/register", data);
}

const getJWT = data => {
    return httpClient.post("auth/getJWT", data);
}

export default { register, getJWT };