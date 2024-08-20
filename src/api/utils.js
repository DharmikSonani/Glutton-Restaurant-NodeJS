import axios from "axios";

// export const DOMAIN = `https://glutton-server.vercel.app/`; // Live Server
export const DOMAIN = `https://formally-valid-mite.ngrok-free.app/`; // NGROCK Live Server

export const SOCKET_URL = 'https://formally-valid-mite.ngrok-free.app/';

const BASE_URL = `${DOMAIN}api/`;

const USER_BASE_URL = `${BASE_URL}/user`;
const CHECK_USER_URL = `${USER_BASE_URL}/check`;

const RESTAURANT_BASE_URL = `${BASE_URL}/restaurant`;
const GET_PHOTOS_URL = `${RESTAURANT_BASE_URL}/photo`;
const ADD_PHOTO_URL = `${GET_PHOTOS_URL}/add`;
const REMOVE_PHOTO_URL = `${GET_PHOTOS_URL}/remove`;
const RESTAURANT_REGISTER_URL = `${RESTAURANT_BASE_URL}/register`;
const RESTAURANT_MOBILE_CHECK_URL = `${RESTAURANT_BASE_URL}/check-mobile`;
const PACKAGE_ACTIVATION_URL = `${RESTAURANT_BASE_URL}/package-activation`;
const RESTAURANT_UPDATE_URL = `${RESTAURANT_BASE_URL}/update`;

const RATING_BASE_URL = `${BASE_URL}/rating`;

// GET
export const checkUserByUIDAPI = async (uid) => {
    const res = await axios.get(`${CHECK_USER_URL}/${uid}`);
    return res;
}

export const getRestaurantbyUIDAPI = async (uid) => {
    const res = await axios.get(`${RESTAURANT_BASE_URL}/${uid}`);
    return res;
}

export const getRestaurantReviewsAPI = async (id) => {
    const res = await axios.get(`${RATING_BASE_URL}/${id}`);
    return res;
}

export const getRestaurantPhotosAPI = async (id) => {
    const res = await axios.get(`${GET_PHOTOS_URL}/${id}`);
    return res;
}

// POST
export const registerRestaurantAPI = async (params) => {
    const res = await axios.post(`${RESTAURANT_REGISTER_URL}`, params);
    return res;
}

export const checkMobileNoOfRestaurantAPI = async (params) => {
    const res = await axios.post(`${RESTAURANT_MOBILE_CHECK_URL}`, params);
    return res;
}


// PATCH
export const packageActivationAPI = async (uid, params) => {
    const res = await axios.patch(`${PACKAGE_ACTIVATION_URL}/${uid}`, params);
    return res;
}

export const updateRestaurantAPI = async (uid, params) => {
    const res = await axios.patch(`${RESTAURANT_UPDATE_URL}/${uid}`, params);
    return res;
}

export const addPhotoAPI = async (uid, params) => {
    const res = await axios.patch(`${ADD_PHOTO_URL}/${uid}`, params);
    return res;
}

// DELETE
export const removePhotoAPI = async (uid, params) => {
    const res = await axios.delete(`${REMOVE_PHOTO_URL}/${uid}`, { data: params });
    return res;
}