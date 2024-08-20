import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { bookingStatus } from '../constants/Helper';

const BookingCardForHome = ({
    data,
    onPress,
}) => {

    const status = bookingStatus[data.status];

    return (
        <View style={styles.Container}>

            <Text style={[styles.TextStyle, { fontSize: 13 }]} numberOfLines={1}>{data?.customer?.name}</Text>
            <Text style={styles.IdText} numberOfLines={1}>ID : {data?._id}</Text>
            <Text style={styles.TextStyle} numberOfLines={1}>Booking Time : {moment(data?.booking?.time, ['hh:mm']).format('hh:mm A')}</Text>
            <Text style={styles.TextStyle} numberOfLines={1}>Guest : {data?.booking?.noOfGuest}</Text>

            {
                data.status == 'Verified' &&
                <TouchableOpacity
                    style={styles.ButtonStyle}
                    onPress={() => onPress(data)}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                        style={styles.ButtonGradientStyle}
                        angle={110}
                        useAngle
                    >
                        <MaterialIcons name='keyboard-arrow-right' size={20} color={COLOR.WHITE} />
                    </LinearGradient>
                </TouchableOpacity>
            }

            {
                status &&
                <View style={[styles.StatusContainer, { shadowColor: status.shadow_color, }]}>
                    <LinearGradient
                        colors={status.gradient_color}
                        style={styles.StatusGradientStyle}
                        angle={140}
                        useAngle
                    >
                        <Text style={styles.StatusTextStyle}>{status.title}</Text>
                    </LinearGradient>
                </View>
            }
        </View>
    )
}

export default memo(BookingCardForHome)

const styles = StyleSheet.create({
    Container: {
        padding: 10,
        marginTop: 10,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: COLOR.WHITE,
        elevation: 2,
        shadowColor: COLOR.BLACK_60,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    TextStyle: {
        color: COLOR.BLACK,
        fontSize: 12,
    },
    IdText: {
        color: COLOR.GRAY,
        fontSize: 10,
        marginBottom: 5,
    },
    ButtonStyle: {
        borderRadius: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    ButtonGradientStyle: {
        borderRadius: 10,
        padding: 7,
    },
    StatusContainer: {
        position: 'absolute',
        right: -1,
        top: -1,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
    },
    StatusGradientStyle: {
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    StatusTextStyle: {
        color: COLOR.WHITE,
        fontSize: 12,
        fontWeight: '500',
    },
})