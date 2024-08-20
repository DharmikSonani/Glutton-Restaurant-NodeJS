import { useDispatch, useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { InvoiceDBFields, InvoiceDBPath, RatingDBFields, RatingDBPath, RestaurantDBPath } from '../../constants/Database';
import { NormalSnackBar } from '../../constants/SnackBars';
import { setReviewDataInRedux } from '../../redux/ReviewData/ReviewDataAction';
import { setCategoryDataInRedux } from '../../redux/CategoryData/CategoryDataAction';
import { setMenuDataInRedux } from '../../redux/MenuData/MenuDataAction';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { setPhotosDataInRedux } from '../../redux/PhotosData/PhotosDataAction';
import { setBookingDataInRedux } from '../../redux/BookingData/BookingDataAction';
import { getAllBookingsAPI, getRestaurantbyUIDAPI, getRestaurantPhotosAPI, getTodayBookingsAPI } from '../../api/utils';
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

        return () => {
            socketServices.removeListener('NewBookingForToday');
            socketServices.removeListener('NewBookingForRestaurant');
            socketServices.removeListener('CancelBookingForToday');
            socketServices.removeListener('CancelBookingForRestaurant');
            socketServices.removeListener('VerifyBookingForToday');
            socketServices.removeListener('VerifyBookingForRestaurant');
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
        setLoading(true);
        try {
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

    const goToNextScreen = (item) => {
        try {
            InvoiceDBPath
                .doc(item.docId)
                .get()
                .then((querySnap) => {
                    if (querySnap.exists) {
                        const { isComplete, tableNo } = querySnap.data();
                        if (tableNo == '') {
                            setSelectedBooking(item);
                            setIsTableModelVisible(true);
                        } else {
                            if (isComplete == 'true') {
                                navigation.navigate(NavigationScreens.InvoiceScreen, {
                                    invoiceId: item.docId,
                                });
                            } else {
                                navigation.navigate(NavigationScreens.ItemAddToBillScreen, {
                                    invoiceId: item.docId,
                                    dis: item.discount,
                                    tableNo: tableNo,
                                });
                            }
                        }
                    }
                    else {
                        try {

                            let data = {};

                            data[InvoiceDBFields.invoiceId] = item.docId;
                            data[InvoiceDBFields.date] = item.date;
                            data[InvoiceDBFields.time] = item.time;
                            data[InvoiceDBFields.custName] = item.custName;
                            data[InvoiceDBFields.discount] = item.discount;
                            data[InvoiceDBFields.custContactNo] = item.custContactNo;
                            data[InvoiceDBFields.restId] = restId;
                            data[InvoiceDBFields.custId] = item.custId;
                            data[InvoiceDBFields.isComplete] = 'false';
                            data[InvoiceDBFields.generatedAt] = '';
                            data[InvoiceDBFields.tableNo] = '';

                            InvoiceDBPath
                                .doc(item.docId)
                                .set(data)
                                .then(() => {
                                    setSelectedBooking(item);
                                    setIsTableModelVisible(true);
                                })

                        } catch (e) {
                            console.log(e);
                        }
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const fetchReviews = () => {
        try {
            RatingDBPath
                .orderBy(RatingDBFields.time, 'desc')
                .where(RatingDBFields.restId, '==', restId)
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const { rating, review, time, userId } = doc.data();
                        timeStamp = time.toDate().toString();
                        return { rating, review, timeStamp, userId, i }
                    })
                    dispatch(setReviewDataInRedux(list));
                })
        } catch (e) {
            console.log(e);
        }
    }

    const fetchCategory = () => {
        try {
            RestaurantDBPath
                .doc(restId)
                .collection('Menu')
                .orderBy('category', "asc")
                .onSnapshot((querySnap) => {
                    let catList = ["All"];
                    querySnap.docs.map((doc, i) => {
                        const { category } = doc.data();
                        if (!catList.some(cat => cat === category)) {
                            catList.push(category);
                        }
                    })
                    dispatch(setCategoryDataInRedux(catList));
                })
        } catch (e) {
            console.log(e);
        }
    }

    const fetchMenuItems = () => {
        try {
            RestaurantDBPath
                .doc(restId)
                .collection('Menu')
                .orderBy('itemName', 'asc')
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const itemId = doc.id;
                        const no = i + 1;
                        const { itemName, price, category } = doc.data();
                        return ({ itemId, itemName, price, category, no })
                    })
                    dispatch(setMenuDataInRedux(list));
                })
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