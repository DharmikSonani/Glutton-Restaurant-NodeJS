import { format } from "date-fns";
import { COLOR, GRADIENTCOLOR } from "./Colors";

// Constants

export const bookingStatus = {
    Verified: {
        title: 'Verified',
        gradient_color: GRADIENTCOLOR.VERIFIED,
        shadow_color: COLOR.VERIFIED,
    },
    Cancelled: {
        title: 'Cancelled',
        gradient_color: GRADIENTCOLOR.CANCELLED,
        shadow_color: COLOR.CANCELLED,
    },
    Pending: {
        title: 'Not Verified',
        gradient_color: GRADIENTCOLOR.PENDING,
        shadow_color: COLOR.PENDING,
    },
}

export const ItemTableFieldWidth = ['10%', '40%', '15%', '10%', '25%'];

export const RatingFilter = ['All', '5', '4', '3', '2', '1']

export const BookingStatusFilter = ['All', 'Verified', 'Not Verified', 'Cancelled',]

export const BookingDataTableHeader = [
    {
        title: 'Time',
        width: '23%',
    },
    {
        title: 'Date',
        width: '27%',
    },
    {
        title: 'Person',
        width: '15%',
    },
    {
        title: 'Status',
        width: '15%',
    },
    {
        title: 'View',
        width: '14%',
    },
]

export const MenuDataTableHeader = [
    {
        title: 'No.',
        width: '10%',
    },
    {
        title: 'Item Name',
        width: '37%',
    },
    {
        title: 'Category',
        width: '20%',
    },
    {
        title: 'Price',
        width: '18%',
    },
    {
        title: '',
        width: '10%',
    },
]

// Functions

export const convertTimeStampToDate = (timeStamp) => {
    const fireBaseTime = new Date(
        timeStamp.seconds * 1000 + timeStamp.nanoseconds / 1000000,
    );
    const date = fireBaseTime.toDateString();
    return format(new Date(date), 'yyyy-MM-dd');
}