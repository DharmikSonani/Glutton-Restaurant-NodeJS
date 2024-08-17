import { FETCH_REVIEW_DATA, REMOVE_REVIEW_DATA } from "../Constants"

export const setReviewDataInRedux = (data) => {
    return {
        type: FETCH_REVIEW_DATA,
        data: data,
    }
}

export const removeReviewDataFromRedux = () => {
    return {
        type: REMOVE_REVIEW_DATA,
        data: [],
    }
}