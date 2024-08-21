import { useDispatch, useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { BookingStatusFilter } from '../../constants/Helper';
import { getAllBookingsAPI } from '../../api/utils';
import { setBookingDataInRedux } from '../../redux/BookingData/BookingDataAction';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);
    const allBookings = useSelector(state => state[Reducers.BookingDataReducer]);
    const restData = useSelector(state => state[Reducers.RestDataReducer]);
    const minDate = new Date(restData['createdAt']);
    const maxDate = new Date(addDays(new Date(), 6));
    const dispatch = useDispatch();

    // UseStates
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(BookingStatusFilter[0]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState('');
    const [isDetailViewVisible, setDetailViewVisibility] = useState(false);

    // UseEffects
    useEffect(() => { filterByStatus(status) }, [allBookings]);
    useEffect(() => { !allBookings && fetchAllBookings() }, [])

    // Methods
    const filterByStatus = (status) => {
        setStatus(status);
        selectedDate && setSelectedDate('');
        if (status == "All") {
            setData(allBookings);
        } else {
            setData(allBookings.filter((i) => i?.status?.toLowerCase() == status?.toLowerCase()))
        }
    }

    const onCalendarPress = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        setStatus('date');
        setSelectedDate(format(new Date(date), 'do MMMM, yyyy').toString());
        setData(allBookings.filter((i) => i?.booking?.date.toLowerCase() == format(new Date(date), 'yyyy-MM-dd').toString()))
        hideDatePicker();
    };

    const onViewBookingPress = (data) => {
        setSelectedBooking(data);
        setDetailViewVisibility(true);
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
        minDate,
        maxDate,

        data, setData,
        status, setStatus,
        selectedDate, setSelectedDate,
        isDatePickerVisible, setDatePickerVisibility,
        selectedBooking, setSelectedBooking,
        isDetailViewVisible, setDetailViewVisibility,

        filterByStatus,
        handleConfirm,
        hideDatePicker,

        onCalendarPress,
        onViewBookingPress,
    };
}

export default useScreenHooks