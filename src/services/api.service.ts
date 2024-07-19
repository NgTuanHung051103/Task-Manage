import axios from "axios";

export const fetchApi = axios.create({
    baseURL: "http://localhost:3000",
});
