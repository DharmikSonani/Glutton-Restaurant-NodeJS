import axios from "axios";

// export const DOMAIN = `https://glutton-server.vercel.app/`; // Live Server
export const DOMAIN = `https://formally-valid-mite.ngrok-free.app/`; // NGROCK Live Server

export const SOCKET_URL = 'https://formally-valid-mite.ngrok-free.app/';

const BASE_URL = `${DOMAIN}api/`;

const USER_BASE_URL = `${BASE_URL}/user`;
const RESTAURANT_BASE_URL = `${BASE_URL}/restaurant`;
const RATING_BASE_URL = `${BASE_URL}/rating`;
const BOOKING_BASE_URL = `${BASE_URL}/booking`;
const INVOICE_BASE_URL = `${BASE_URL}/invoice`;
const INVOICE_ITEM_BASE_URL = `${BASE_URL}/invoice-item`;
const PACKAGE_BASE_URL = `${BASE_URL}/package`;
const MENU_ITEM_BASE_URL = `${BASE_URL}/menu-item`;
const MENU_CATEGORY_BASE_URL = `${BASE_URL}/menu-category`;

const CHECK_USER_URL = `${USER_BASE_URL}/check`;

const GET_PHOTOS_URL = `${RESTAURANT_BASE_URL}/photo`;
const ADD_PHOTO_URL = `${GET_PHOTOS_URL}/add`;
const REMOVE_PHOTO_URL = `${GET_PHOTOS_URL}/remove`;
const RESTAURANT_REGISTER_URL = `${RESTAURANT_BASE_URL}/register`;
const RESTAURANT_MOBILE_CHECK_URL = `${RESTAURANT_BASE_URL}/check-mobile`;
const PACKAGE_ACTIVATION_URL = `${RESTAURANT_BASE_URL}/package-activation`;
const RESTAURANT_UPDATE_URL = `${RESTAURANT_BASE_URL}/update`;

const VERIFY_BOOKING_URL = `${BOOKING_BASE_URL}/verify`;
const GET_ALL_BOOKINGS_URL = `${BOOKING_BASE_URL}/restaurant`;

const TEMP_INVOICE_URL = `${INVOICE_BASE_URL}/temp`;
const TABLE_ALLOCATE_URL = `${INVOICE_BASE_URL}/table-allocate`;
const GENERATE_INVOICE_URL = `${INVOICE_BASE_URL}/generate`;

const ADD_INVOICE_ITEM_URL = `${INVOICE_ITEM_BASE_URL}/add`;

const ADD_MENU_ITEM_URL = `${MENU_ITEM_BASE_URL}/add`;
const UPDATE_MENU_ITEM_URL = `${MENU_ITEM_BASE_URL}/update`;
const REMOVE_MENU_ITEM_URL = `${MENU_ITEM_BASE_URL}/remove`;
const MENU_CATEGORY_URL = `${MENU_ITEM_BASE_URL}/category`;

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

export const getTempInvoiceAPI = async (id) => {
    const res = await axios.get(`${TEMP_INVOICE_URL}/${id}`);
    return res;
}

export const getInvoiceByIDAPI = async (id) => {
    const res = await axios.get(`${INVOICE_BASE_URL}/${id}`);
    return res;
}

export const getPackagesAPI = async () => {
    const res = await axios.get(`${PACKAGE_BASE_URL}`);
    return res;
}

export const getMenuItemsAPI = async (id) => {
    const res = await axios.get(`${MENU_ITEM_BASE_URL}/${id}`);
    return res;
}

export const getMenuCategoryByRestIDAPI = async (id) => {
    const res = await axios.get(`${MENU_CATEGORY_URL}/${id}`);
    return res;
}

export const getAllMenuCategoriesAPI = async () => {
    const res = await axios.get(`${MENU_CATEGORY_BASE_URL}`);
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

export const getTodayBookingsAPI = async (id, params) => {
    const res = await axios.post(`${GET_ALL_BOOKINGS_URL}/${id}`, params);
    return res;
}

export const getAllBookingsAPI = async (id) => {
    const res = await axios.post(`${GET_ALL_BOOKINGS_URL}/${id}`);
    return res;
}

export const addMenuItemAPI = async (params) => {
    const res = await axios.post(`${ADD_MENU_ITEM_URL}`, params);
    return res;
}

export const addInvoiceItemAPI = async (params) => {
    const res = await axios.post(`${ADD_INVOICE_ITEM_URL}`, params);
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

export const verifyBookingAPI = async (id, params) => {
    const res = await axios.patch(`${VERIFY_BOOKING_URL}/${id}`, params);
    return res;
}

export const addPhotoAPI = async (uid, params) => {
    const res = await axios.patch(`${ADD_PHOTO_URL}/${uid}`, params);
    return res;
}

export const tableAllocationAPI = async (id, params) => {
    const res = await axios.patch(`${TABLE_ALLOCATE_URL}/${id}`, params);
    return res;
}

export const generateInvoiceAPI = async (id) => {
    const res = await axios.patch(`${GENERATE_INVOICE_URL}/${id}`);
    return res;
}

export const updateMenuItemAPI = async (id, params) => {
    const res = await axios.patch(`${UPDATE_MENU_ITEM_URL}/${id}`, params);
    return res;
}

// DELETE
export const removePhotoAPI = async (uid, params) => {
    const res = await axios.delete(`${REMOVE_PHOTO_URL}/${uid}`, { data: params });
    return res;
}

export const removeMenuItemAPI = async (id) => {
    const res = await axios.delete(`${REMOVE_MENU_ITEM_URL}/${id}`);
    return res;
}