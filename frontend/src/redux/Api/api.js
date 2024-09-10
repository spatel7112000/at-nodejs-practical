import axios from 'axios';

const BASE_URL_API = import.meta.env.VITE_API_BASE_URL;
export const adminLoginApi = async (reqData) => {
    return await axios.post(`${BASE_URL_API}/login`, reqData, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    });
};
export const registrationLoginApi = async (reqData) => {
    return await axios.post(`${BASE_URL_API}/register`, reqData, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    });
};
export const getProfileDataApi = async (config) => {
    return await axios.get(`${BASE_URL_API}/get_profile`, config);
};
export const profileUpdateApi = async (reqData, config) => {
    return await axios.put(`${BASE_URL_API}/edit_profile`, reqData, config);
};
export const changePassApi = async (reqData, config) => {
    return await axios.post(`${BASE_URL_API}/change_password`, reqData, config);
};
