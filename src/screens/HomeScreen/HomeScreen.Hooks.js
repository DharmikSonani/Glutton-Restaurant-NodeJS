import { useDispatch, useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import moment from 'moment';
import { BookingsDBFields, BookingsDBPath, InvoiceDBFields, InvoiceDBPath, RatingDBFields, RatingDBPath, RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';
import { NormalSnackBar } from '../../constants/SnackBars';
import { setReviewDataInRedux } from '../../redux/ReviewData/ReviewDataAction';
import { setCategoryDataInRedux } from '../../redux/CategoryData/CategoryDataAction';
import { setMenuDataInRedux } from '../../redux/MenuData/MenuDataAction';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { convertTimeStampToDate } from '../../constants/Helper';
import { setPhotosDataInRedux } from '../../redux/PhotosData/PhotosDataAction';
import { setBookingDataInRedux } from '../../redux/BookingData/BookingDataAction';

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
        checkPackage();
        getBookings();
        fetchReviews();
        fetchCategory();
        fetchMenuItems();
        fetchPhotos();
        fetchAllBookings();
        Object.keys(restData).length === 0 && fetchRestData(restId);
    }, []);

    // Methods
    const fetchRestData = (authId) => {
        try {
            RestaurantDBPath
                .doc(authId)
                .onSnapshot(async (querySnap) => {
                    if (querySnap.exists) {
                        const data = querySnap.data();
                        data[RestaurantDBFields.createdAt] = convertTimeStampToDate(data[RestaurantDBFields.createdAt]);
                        dispatch(setRestDataInRedux(data));
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const getBookings = async () => {
        setLoading(true);
        try {
            BookingsDBPath
                .where(BookingsDBFields.date, '==', today)
                .where(BookingsDBFields.restId, '==', restId)
                .orderBy(BookingsDBFields.time, 'desc')
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const docId = doc.id;
                        const { custContactNo, custName, date, isCancel, isVerify, noOfGuest, time, discount, custId, } = doc.data();
                        let status = '';
                        if (isVerify == 'true') {
                            status = 'Verified';
                        } else if (isCancel == 'true') {
                            status = 'Cancelled';
                        } else if (isVerify == 'false' && isCancel == 'false') {
                            status = 'Pending';
                        }
                        return ({ docId, custContactNo, custName, date, isCancel, isVerify, noOfGuest, time, status, discount, custId, });
                    })
                    setBookings(list);
                    setLoading(false);
                })
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    const checkPackage = () => {
        try {
            RestaurantDBPath
                .doc(restId)
                .onSnapshot((querySnap) => {
                    if (querySnap.exists) {
                        const { isActive, endDate } = querySnap.data();
                        if (endDate != '') {
                            if (isActive == 'true' && new Date(today) > new Date(endDate)) {
                                try {
                                    RestaurantDBPath
                                        .doc(restId)
                                        .update({
                                            isActive: 'false',
                                        })
                                } catch (e) {
                                    console.log(e);
                                }
                            }
                        }
                        if (isActive == "false") {
                            NormalSnackBar('Please Active New Package.');
                        }
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const cancelBooking = (id) => {
        try {
            BookingsDBPath
                .doc(id)
                .update({
                    isCancel: 'true',
                })
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

    const fetchPhotos = () => {
        try {
            RestaurantDBPath
                .doc(restId)
                .collection('Images')
                .orderBy(RestaurantDBFields.Images.addedAt, 'desc')
                .onSnapshot((querySnap) => {
                    const list = [];
                    list.push({ id: 0, imgId: '', imgUrl: '' });
                    querySnap.docs.map((doc, i) => {
                        const imgId = doc.id;
                        const id = i + 1;
                        const { imgUrl } = doc.data();
                        list.push({ id, imgUrl, imgId });
                    })
                    dispatch(setPhotosDataInRedux(list));
                })
        } catch (e) {
            console.log(e);
        }
    }

    const fetchAllBookings = () => {
        try {
            BookingsDBPath
                .where(BookingsDBFields.restId, '==', restId)
                .orderBy(BookingsDBFields.date, 'desc')
                .orderBy(BookingsDBFields.time, 'desc')
                .onSnapshot((querySnap) => {
                    const list = querySnap.docs.map((doc, i) => {
                        const docId = doc.id;
                        const { custContactNo, custEmail, custName, date, isCancel, isVerify, noOfGuest, time } = doc.data();
                        let status = '';
                        if (isVerify == 'true') {
                            status = 'Verified';
                        } else if (isCancel == 'true') {
                            status = 'Cancelled';
                        } else if (isVerify == 'false' && isCancel == 'false') {
                            status = 'Not Verified';
                        }
                        return ({ docId, custContactNo, custEmail, custName, date, isCancel, isVerify, noOfGuest, time, status });
                    })
                    dispatch(setBookingDataInRedux(list));
                })
        } catch (e) {
            console.log(e);
        }
    }

    return {
        navigation,
        restData,
        today,
        currentTime,

        selectedBooking, setSelectedBooking,
        bookings, setBookings,
        isQRScannerModalVisible, setIsQRScannerModalVisible,
        isTableModelVisible, setIsTableModelVisible,
        loading, setLoading,

        cancelBooking,
        goToNextScreen,
    };
}

export default useScreenHooks