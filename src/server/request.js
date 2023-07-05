import axios from "axios";

const request = axios.create({
    baseURL: '/api',
    // baseURL: '/api',
    timeout: 1000 * 30,
    withCredentials: false
})

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        return response   
    },
    error => {
        return Promise.reject(error)
    }
)

export default request