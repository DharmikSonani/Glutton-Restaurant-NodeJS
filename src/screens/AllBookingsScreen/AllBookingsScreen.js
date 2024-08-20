import {
    View,
    Text,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './AllBookingsScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DataFilter from '../../components/DataFilter';
import { BookingDataTableHeader, BookingStatusFilter } from '../../constants/Helper';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from './styles';
import BookingTableRow from '../../components/BookingTableRow';
import BookingDetailModal from '../../components/modal/BookingDetailModal';

const AllBookingsScreen = (props) => {

    const {
        navigation,
        minDate,
        maxDate,

        data,
        status,
        selectedDate,
        isDatePickerVisible,
        selectedBooking,
        isDetailViewVisible, setDetailViewVisibility,

        filterByStatus,
        handleConfirm,
        hideDatePicker,

        onCalendarPress,
        onViewBookingPress,

    } = useScreenHooks(props);

    const ListEmptyComponent = () => {
        return <Text style={styles.EmptyText}>
            {selectedDate ? `No Bookings for ${selectedDate}` : `Bookings not found.`}
        </Text>
    }

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Table Bookings'}
            onRightPress={onCalendarPress}
            rightButtonIcon={<Ionicons name={'calendar'} size={27} color={COLOR.BLACK} />}
        >
            <DataFilter
                data={BookingStatusFilter}
                seleted={status}
                setSelected={filterByStatus}
                style={{ marginTop: 55 }}
            />

            <View style={styles.HeaderContainer}>
                {
                    BookingDataTableHeader.map((item, i) =>
                        <LinearGradient
                            colors={GRADIENTCOLOR.ORANGE}
                            style={[styles.HeaderGradient, { width: item.width, }]}
                            angle={160}
                            useAngle
                            key={i}
                        >
                            <Text style={[styles.HeaderTextStyle]}>{item.title}</Text>
                        </LinearGradient>
                    )
                }
            </View>

            <FlatList
                data={data}
                renderItem={({ item }) => <BookingTableRow data={item} onViewPress={onViewBookingPress} />}
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                ListEmptyComponent={ListEmptyComponent}
                bounces={false}
            />


            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={minDate}
                maximumDate={maxDate}
                buttonTextColorIOS={COLOR.BLACK}
            />

            {
                selectedBooking &&
                <BookingDetailModal
                    data={selectedBooking}
                    navigation={navigation}
                    modalVisible={isDetailViewVisible}
                    setModalVisible={setDetailViewVisibility}
                />
            }
        </ScreenHeader>
    )
}

export default AllBookingsScreen