import { combineReducers } from "redux";
import { AuthReducer } from "./Authentication/AuthReducer";
import { RestDataReducer } from "./RestaurantData/RestDataReducer";
import { ReviewDataReducer } from "./ReviewData/ReviewDataReducer";
import { MenuDataReducer } from "./MenuData/MenuDataReducer";
import { CategoryDataReducer } from "./CategoryData/CategoryDataReducer";
import { PhotosDataReducer } from "./PhotosData/PhotosDataReducer";
import { BookingDataReducer } from "./BookingData/BookingDataReducer";

export default rootReducer = combineReducers({
    AuthReducer,
    RestDataReducer,
    ReviewDataReducer,
    MenuDataReducer,
    CategoryDataReducer,
    PhotosDataReducer,
    BookingDataReducer,
})
