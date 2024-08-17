import { FETCH_MENU_DATA, REMOVE_MENU_DATA } from "../Constants";

const initialState = [];

export const MenuDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MENU_DATA:
            return action.data;
        case REMOVE_MENU_DATA:
            return [];
        default:
            return state;
    }
}