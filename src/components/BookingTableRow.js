import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import moment from 'moment'
import { format } from 'date-fns'
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../constants/Colors';
import { BookingDataTableHeader } from '../constants/Helper';

const BookingTableRow = ({
    data,
    onViewPress,
}) => {
    return (
        <View style={styles.Container}>
            <Text style={[{ width: BookingDataTableHeader[0].width }, styles.ListTextStyle]} numberOfLines={1}>{data?.booking?.time && moment(data?.booking?.time, ['hh:mm']).format('hh:mm A')}</Text>
            <Text style={[{ width: BookingDataTableHeader[1].width }, styles.ListTextStyle]} numberOfLines={1}>{data?.booking?.date && format(new Date(data?.booking?.date), 'do MMM, yyyy')}</Text>
            <Text style={[{ width: BookingDataTableHeader[2].width }, styles.ListTextStyle]} numberOfLines={1}>{data?.booking?.noOfGuest}</Text>
            <View style={[{ width: BookingDataTableHeader[3].width }, styles.ListTextStyle]}>
                {
                    data.status == "Verified" ?
                        <Octicons name='issue-closed' size={17} color={COLOR.VERIFIED} />
                        :
                        data.status == "Cancelled" ?
                            <SimpleLineIcons name='close' size={17} color={COLOR.CANCELLED} />
                            :
                            <Text style={{ color: COLOR.PENDING, fontSize: 11, textAlign: 'center', }}>{'Not\nVerified'}</Text>
                }
            </View>

            <View style={[{ width: BookingDataTableHeader[4].width }, styles.ListTextStyle]}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => { onViewPress(data) }}
                >
                    <Ionicons name='ios-eye' size={15} color={COLOR.BLACK} />
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default memo(BookingTableRow)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        alignItems: 'center',
        paddingVertical: 8,
    },
    ListTextStyle: {
        color: COLOR.BLACK,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500',
        alignItems: 'center',
    },
    Button: {
        backgroundColor: COLOR.BORDERCOLOR,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        aspectRatio: 1 / 1,
        borderRadius: 8,
    },
})