import { useDispatch, useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { NormalSnackBar } from '../../constants/SnackBars';
import { setReviewDataInRedux } from '../../redux/ReviewData/ReviewDataAction';
import { setCategoryDataInRedux } from '../../redux/CategoryData/CategoryDataAction';
import { setMenuDataInRedux } from '../../redux/MenuData/MenuDataAction';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { setPhotosDataInRedux } from '../../redux/PhotosData/PhotosDataAction';
import { setBookingDataInRedux } from '../../redux/BookingData/BookingDataAction';
import {
    getAllBookingsAPI,
    getMenuCategoryByRestIDAPI,
    getMenuItemsAPI,
    getRestaurantbyUIDAPI,
    getRestaurantPhotosAPI,
    getRestaurantReviewsAPI,
    getTempInvoiceAPI,
    getTodayBookingsAPI,
} from '../../api/utils';
import socketServices from '../../api/Socket';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);
    const restData = useSelector(state => state[Reducers.RestDataReducer]);
    const today = format(new Date(), 'yyyy-MM-dd').toString();
    const currentTime = moment(new Date()).format('HH:mm').toString();
    const dispatch = useDispatch();

    // UseStates
    const [selectedBooking, setSelectedBooking] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [isQRScannerModalVisible, setIsQRScannerModalVisible] = useState(false);
    const [isTableModelVisible, setIsTableModelVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    // UseEffects
    useEffect(() => {
        getBookings();
        fetchReviews();
        fetchCategory();
        fetchMenuItems();
        fetchPhotos();
        fetchAllBookings();
        Object.keys(restData).length === 0 && fetchRestData(restId);
        restData?.isActive == false && NormalSnackBar('Please Active New Package.');

        socketServices.on("NewBookingForToday", getBookings);
        socketServices.on("NewBookingForRestaurant", fetchAllBookings);
        socketServices.on("CancelBookingForToday", getBookings);
        socketServices.on("CancelBookingForRestaurant", fetchAllBookings);
        socketServices.on("VerifyBookingForToday", getBookings);
        socketServices.on("VerifyBookingForRestaurant", fetchAllBookings);

        socketServices.on("RestReviewAdded", () => {
            fetchReviews();
            fetchRestData(restId);
        });

        socketServices.on("MenuItemUpdateOnRestaurant", () => {
            fetchMenuItems();
            fetchCategory();
        });

        return () => {
            socketServices.removeListener('NewBookingForToday');
            socketServices.removeListener('NewBookingForRestaurant');
            socketServices.removeListener('CancelBookingForToday');
            socketServices.removeListener('CancelBookingForRestaurant');
            socketServices.removeListener('VerifyBookingForToday');
            socketServices.removeListener('VerifyBookingForRestaurant');

            socketServices.removeListener('RestReviewAdded');

            socketServices.removeListener('MenuItemUpdateOnRestaurant');
        }
    }, []);

    useEffect(() => { restId && socketServices.emit('JoinSocket', restId); }, [restId])

    // Methods
    const fetchRestData = async (uid) => {
        try {
            const res = await getRestaurantbyUIDAPI(uid);
            res && res?.data && res?.data?.data && dispatch(setRestDataInRedux(res?.data?.data));
        } catch (e) {
            console.log(e);
        }
    }

    const getBookings = async () => {
        try {
            setLoading(true);
            try {
                const res = await getTodayBookingsAPI(restId, { date: today });
                if (res?.data && res?.data?.data) {
                    setBookings(res?.data?.data);
                }
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const goToNextScreen = async (data) => {
        try {
            const invoiceId = data._id;

            const invoice = await getTempInvoiceAPI(invoiceId);

            if (invoice?.data && invoice?.data?.data) {
                const invoiceData = invoice?.data?.data;
                if (invoiceData?.restaurant?.tableNo) {
                    if (invoiceData?.isGenerated) {
                        navigation.navigate(NavigationScreens.InvoiceScreen, { invoiceId: invoiceId, });
                    } else {
                        navigation.navigate(NavigationScreens.ItemAddToBillScreen, {
                            invoiceId: invoiceId,
                            dis: invoiceData?.booking?.discount,
                            tableNo: invoiceData?.restaurant?.tableNo,
                        });
                    }
                } else {
                    setSelectedBooking(data);
                    setIsTableModelVisible(true);
                }
            } else {
                NormalSnackBar('Something wents wrong.');
            }
        } catch (e) {
            console.log(e);
            NormalSnackBar('Something wents wrong.');
        }
    }

    const fetchReviews = async () => {
        try {
            const res = await getRestaurantReviewsAPI(restId);
            res?.data && res?.data?.data && dispatch(setReviewDataInRedux(res?.data?.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchCategory = async () => {
        try {
            const res = await getMenuCategoryByRestIDAPI(restId);
            res?.data && res?.data?.data && dispatch(setCategoryDataInRedux(['All', ...res?.data?.data]));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchMenuItems = async () => {
        try {
            const res = await getMenuItemsAPI(restId);
            res?.data && res?.data?.data && dispatch(setMenuDataInRedux(res?.data?.data));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchPhotos = async () => {
        try {
            const res = await getRestaurantPhotosAPI(restId);
            res?.data && res?.data?.data && dispatch(setPhotosDataInRedux([0, ...res?.data?.data?.images]));
        } catch (e) {
            console.log(e);
        }
    }

    const fetchAllBookings = async () => {
        try {
            const res = await getAllBookingsAPI(restId);
            res?.data && res?.data?.data && dispatch(setBookingDataInRedux(res?.data?.data));
        } catch (e) {
            console.log(e);
        }
    }

    return {
        navigation,
        restData,
        today,
        currentTime,

        selectedBooking,
        bookings,
        isQRScannerModalVisible, setIsQRScannerModalVisible,
        isTableModelVisible, setIsTableModelVisible,
        loading,

        goToNextScreen,
    };
}

export default useScreenHooks