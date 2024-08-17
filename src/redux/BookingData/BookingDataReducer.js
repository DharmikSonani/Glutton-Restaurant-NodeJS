import { FETCH_BOOKINGS_DATA, REMOVE_BOOKINGS_DATA, } from "../Constants";

const initialState = [];

export const BookingDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BOOKINGS_DATA:
            return action.data;
        case REMOVE_BOOKINGS_DATA:
            return [];
        default:
            return state;
    }
}