import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../../constants/Colors';
import TimeController from './TimeController';
import CustomButton from '../../button/CustomButton';

const TimeSelectionModal = ({
    openTime,
    setOpenTime,
    closeTime,
    setCloseTime,
    modalVisible,
    setModalVisible,
}) => {

    const data = ['AM', 'PM'];

    const closeTimeList = closeTime.replace(':', ' ').split(' ');
    const [hour, setHour] = useState(closeTime ? parseInt(closeTimeList[0]) : 1);
    const [minute, setMinute] = useState(closeTime ? parseInt(closeTimeList[1]) : 0);
    const [ampm, setAmPm] = useState(closeTime ? closeTimeList[2] : data[1]);

    const openTimeList = openTime.replace(':', ' ').split(' ');
    const [ohour, setOHour] = useState(openTime ? parseInt(openTimeList[0]) : 1);
    const [ominute, setOMinute] = useState(openTime ? parseInt(openTimeList[1]) : 0);
    const [oampm, setOAmPm] = useState(openTime ? openTimeList[2] : data[0]);

    const onSetTimePress = () => {

        let otime = ohour + ':' + ominute + " " + oampm;;
        if (ominute == 0) {
            otime = ohour + ':' + ominute + "0 " + oampm;
        }

        setOpenTime(otime);

        let ctime = hour + ':' + minute + " " + ampm;;
        if (minute == 0) {
            ctime = hour + ':' + minute + "0 " + ampm;
        }
        setCloseTime(ctime);

        setModalVisible(false);
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.Container}>
                <View style={styles.ContentContainer}>

                    <TimeController
                        title={'Open Time'}
                        data={data}
                        hour={ohour}
                        setHour={setOHour}
                        minute={ominute}
                        setMinute={setOMinute}
                        ampm={oampm}
                        setAmPm={setOAmPm}
                    />

                    <TimeController
                        title={'Close Time'}
                        data={data}
                        hour={hour}
                        setHour={setHour}
                        minute={minute}
                        setMinute={setMinute}
                        ampm={ampm}
                        setAmPm={setAmPm}
                    />

                    <CustomButton
                        colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                        onPress={onSetTimePress}
                        text={'Set Time'}
                        style={{ marginTop: 0 }}
                    />

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

export default TimeSelectionModal

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR.BLACK_60,
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
    ContentContainer: {
        elevation: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        backgroundColor: COLOR.WHITE,
        padding: 20,
        borderRadius: 20,
        width: '75%',
    },
    SetTimeButton: {
        alignItems: 'center',
        backgroundColor: COLOR.BLACK,
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
    },
})