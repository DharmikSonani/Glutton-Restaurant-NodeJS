import { FETCH_CATEGORY_DATA, REMOVE_CATEGORY_DATA } from "../Constants";

const initialState = [];

export const CategoryDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_DATA:
            return action.data;
        case REMOVE_CATEGORY_DATA:
            return [];
        default:
            return state;
    }
}