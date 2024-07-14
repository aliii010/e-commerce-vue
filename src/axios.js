import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:8000/auth'
})

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default instance