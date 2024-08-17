import { FETCH_REST_DATA, REMOVE_REST_DATA } from "../Constants"

export const setRestDataInRedux = (data) => {
    return {
        type: FETCH_REST_DATA,
        data: data,
    }
}

export const removeRestDataFromRedux = () => {
    return {
        type: REMOVE_REST_DATA,
        data: {},
    }
}