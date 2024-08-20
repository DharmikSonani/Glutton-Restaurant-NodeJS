import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { NavigationScreens, } from '../../constants/Strings';
import DataDisplayCard from '../DataDisplayCard';
import CustomButton from '../button/CustomButton';
import moment from 'moment';
import { format } from 'date-fns';
import { BookingStatusFilter, bookingStatus } from '../../constants/Helper';
import FieldValuePairLabel from '../labels/FieldValuePairLabel';

const BookingDetailModal = ({
    data,
    modalVisible,
    setModalVisible,
    navigation,
}) => {

    let custData = [];

    custData.push({
        field: 'Name',
        value: data?.customer?.name,
    })

    data?.customer?.contact && custData.push({
        field: 'Contact No.',
        value: `+91 ${data?.customer?.contact}`,
    });

    data?.customer?.email && custData.push({
        field: 'E-Mail',
        value: data?.customer?.email,
    });

    let bookingData = [];

    bookingData.push({
        field: 'Booking ID',
        value: data._id,
    });

    data?.booking?.noOfGuest && bookingData.push({
        field: 'Person',
        value: data?.booking?.noOfGuest,
    });

    data?.booking?.time && bookingData.push({
        field: 'Time',
        value: moment(data?.booking?.time, ['hh:mm']).format('hh:mm A'),
    });

    data?.booking?.date && bookingData.push({
        field: 'Date',
        value: format(new Date(data?.booking?.date), 'do MMMM, yyyy'),
    });

    const status = data.status == "Not Verified" ? bookingStatus["Pending"] : bookingStatus[data.status];

    return (
        <Modal
            animationType='slide'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.Container}>
                    <DataDisplayCard
                        title={'Customer Details'}
                        data={custData}
                        style={{ paddingBottom: 0 }}
                    />

                    <DataDisplayCard
                        title={'Booking Details'}
                        data={bookingData}
                        marginTop={30}
                    >
                        <FieldValuePairLabel
                            field={'Status'}
                            gradientValue={status}
                            style={{ marginBottom: 0 }}
                        />
                    </DataDisplayCard>

                    {
                        data.status == BookingStatusFilter[1] &&
                        <CustomButton
                            onPress={() => {
                                setModalVisible(false)
                                navigation.navigate(NavigationScreens.InvoiceScreen, {
                                    invoiceId: data._id,
                                });
                            }}
                            colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                            text={'View Invoice'}
                        />
                    }
                    <TouchableOpacity
                        style={styles.CloseButton}
                        onPress={() => { setModalVisible(false) }}
                        activeOpacity={1}
                    >
                        <Ionicons name='close' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default BookingDetailModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    Container: {
        width: '90%',
        alignItems: "center",
        justifyContent: "center",
        elevation: 20,
        shadowColor: COLOR.BLACK_60,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        padding: 30,
    },
    CloseButton: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        aspectRatio: 1 / 1,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        position: 'absolute',
        right: -15,
        top: -15,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.BLACK,
    },
})