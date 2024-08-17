import { useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { BookingStatusFilter } from '../../constants/Helper';
import { RestaurantDBFields } from '../../constants/Database';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const allBookings = useSelector(state => state[Reducers.BookingDataReducer]);
    const restData = useSelector(state => state[Reducers.RestDataReducer]);
    const minDate = new Date(restData[RestaurantDBFields.createdAt]);
    const maxDate = new Date(addDays(new Date(), 6));

    // UseStates
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(BookingStatusFilter[0]);
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const [selectedBooking, setSelectedBooking] = useState('');
    const [isDetailViewVisible, setDetailViewVisibility] = useState(false);

    // UseEffects
    useEffect(() => { filterByStatus(status) }, [allBookings])

    // Methods
    const filterByStatus = (status) => {
        setStatus(status);
        selectedDate && setSelectedDate('');
        if (status == "All") {
            setData(allBookings);
        } else {
            setData(allBookings.filter((i) => i.status.toLowerCase() == status.toLowerCase()))
        }
    }

    const onCalendarPress = () => setDatePickerVisibility(true);

    const hideDatePicker = () => setDatePickerVisibility(false);

    const handleConfirm = (date) => {
        setStatus('date');
        setSelectedDate(format(new Date(date), 'do MMMM, yyyy').toString());
        setData(allBookings.filter((i) => i.date.toLowerCase().includes(format(new Date(date), 'yyyy-MM-dd').toString())))
        hideDatePicker();
    };

    const onViewBookingPress = (data) => {
        setSelectedBooking(data);
        setDetailViewVisibility(true);
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