import axios from "axios";
import { refreshAccessTokenAPI } from "./authAPI";

const api = axios.create({
    baseURL : 'http://localhost:8000/api/v1',
    withCredentials:true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`  
    }
});

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        if (error.response && error.response.status === 401) {
       
      const refreshResponse = refreshAccessTokenAPI();
      const newToken = refreshResponse.data.accessToken;
      localStorage.setItem('token', newToken);

      
      error.config.headers.Authorization = `Bearer ${newToken}`;
      return axios(error.config);
        }
        return Promise.reject(error);
    }
);


export default api;