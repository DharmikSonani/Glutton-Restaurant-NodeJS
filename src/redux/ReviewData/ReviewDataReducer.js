import { FETCH_REVIEW_DATA, REMOVE_REVIEW_DATA } from "../Constants";

const initialState = [];

export const ReviewDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REVIEW_DATA:
            return action.data;
        case REMOVE_REVIEW_DATA:
            return [];
        default:
            return state;
    }
}