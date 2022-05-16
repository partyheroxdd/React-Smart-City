 import axios from "axios";

export default (token) => {
    return axios.create({
        baseURL: 'http://localhost:8080/',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
}

