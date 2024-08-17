import { FETCH_MENU_DATA, REMOVE_MENU_DATA } from "../Constants"

export const setMenuDataInRedux = (data) => {
    return {
        type: FETCH_MENU_DATA,
        data: data,
    }
}

export const removeMenuDataFromRedux = () => {
    return {
        type: REMOVE_MENU_DATA,
        data: [],
    }
}