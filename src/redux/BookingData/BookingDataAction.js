import { FETCH_BOOKINGS_DATA, REMOVE_BOOKINGS_DATA } from "../Constants"

export const setBookingDataInRedux = (data) => {
    return {
        type: FETCH_BOOKINGS_DATA,
        data: data,
    }
}

export const removeBookingDataFromRedux = () => {
    return {
        type: REMOVE_BOOKINGS_DATA,
        data: [],
    }
}