 import axios from "axios";

 export default axios.create({
     baseURL: 'http://localhost:8080/',
     headers: {
         'Content-Type': 'application/json',
         'Authorization': 'Bearer e55KNLny4Nv5cYkS8C4k'
     }
 });