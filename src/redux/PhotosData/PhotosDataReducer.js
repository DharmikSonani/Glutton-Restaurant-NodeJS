import { FETCH_PHOTOS_DATA, REMOVE_PHOTOS_DATA } from "../Constants";

const initialState = [];

export const PhotosDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PHOTOS_DATA:
            return action.data;
        case REMOVE_PHOTOS_DATA:
            return [];
        default:
            return state;
    }
}