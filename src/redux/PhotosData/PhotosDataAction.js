import { FETCH_PHOTOS_DATA, REMOVE_PHOTOS_DATA } from "../Constants"

export const setPhotosDataInRedux = (data) => {
    return {
        type: FETCH_PHOTOS_DATA,
        data: data,
    }
}

export const removePhotosDataFromRedux = () => {
    return {
        type: REMOVE_PHOTOS_DATA,
        data: [],
    }
}