import { FETCH_REST_DATA, REMOVE_REST_DATA } from "../Constants";

const initialState = {};

export const RestDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REST_DATA:
            return action.data;
        case REMOVE_REST_DATA:
            return {};
        default:
            return state;
    }
}