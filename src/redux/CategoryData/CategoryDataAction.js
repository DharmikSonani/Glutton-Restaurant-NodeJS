import { FETCH_CATEGORY_DATA, REMOVE_CATEGORY_DATA } from "../Constants"

export const setCategoryDataInRedux = (data) => {
    return {
        type: FETCH_CATEGORY_DATA,
        data: data,
    }
}

export const removeCategoryDataFromRedux = () => {
    return {
        type: REMOVE_CATEGORY_DATA,
        data: [],
    }
}