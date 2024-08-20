import { StyleSheet, Text, View, Dimensions, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { ActivityIndicator } from 'react-native';
import { COLOR } from '../../../constants/Colors';
import { NormalSnackBar } from '../../../constants/SnackBars';
import { useSelector } from 'react-redux';
import { Reducers } from '../../../constants/Strings';
import { verifyBookingAPI } from '../../../api/utils';
import socketServices from '../../../api/Socket';
import moment from 'moment';

const { width } = Dimensions.get('window');

const QRScannerModal = () => {

    const [verifying, setVerifying] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const animationDuration = 1500;
    const [animationType, setAnimationType] = useState(1);
    const restId = useSelector(state => state[Reducers.AuthReducer]);

    useEffect(() => {
        const id = setTimeout(() => {
            clearTimeout(id);
            setAnimationType(animationType == 1 ? 0 : 1);
        }, animationDuration);
        Animated.timing(animation, {
            toValue: animationType,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }, [animationType])

    const onSuccess = async (id) => {
        setVerifying(true);
        try {
            const res = await verifyBookingAPI(id, { restId: restId, datetime: moment(new Date()).format('HH:mm').toString() });
            if (res?.data) {
                if (res?.data?.data) {
                    socketServices.emit('VerifiyBooking', res?.data?.data)
                    NormalSnackBar('Booking verified successfully.');
                } else {
                    NormalSnackBar(res?.data?.message);
                }
            } else {
                NormalSnackBar('Something wents wrong.');
            }
            setVerifying(false);
        } catch (e) {
            console.log(e);
            setVerifying(false);
        }
    };

    return (
        <View style={styles.Container}>
            <Text style={styles.TitleText} numberOfLines={1}>
                Scan QR Code
            </Text>
            <Text style={styles.SubTitleText} numberOfLines={1}>
                To varify booking
            </Text>
            <View style={styles.QRCodeScannerMainContainer}>

                <View style={styles.WhiteStripStyle} />

                <View style={[styles.WhiteStripStyle, { transform: [{ rotate: '90deg' }] }]} />

                <View style={styles.QRScannerWhiteBoxStyle} />

                <Animated.View
                    style={[styles.QRScannerLineStyle, {
                        transform: [{
                            translateY: animation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, (width * 0.60) - 66],
                            })
                        }]
                    }]}
                />

                <QRCodeScanner
                    onRead={(e) => { onSuccess(e.data) }}
                    reactivate
                    reactivateTimeout={3000}
                    cameraContainerStyle={{
                        alignSelf: 'center',
                    }}
                    cameraStyle={{
                        height: (width * 0.60) - 40,
                        aspectRatio: 1 / 1,
                        overflow: 'hidden',
                        borderRadius: 10,
                    }}
                />
            </View>
            {
                verifying &&
                <View style={styles.VerificationContainer}>
                    <ActivityIndicator color={COLOR.BLACK} size={'small'} />
                    <Text style={[styles.VerificationTextStyle, { marginLeft: 5 }]}>Verifying</Text>
                </View>
            }
        </View>
    )
}

export default QRScannerModal

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        width: '100%',
    },
    TitleText: {
        color: COLOR.BLACK,
        fontSize: 23,
        fontWeight: '700',
    },
    SubTitleText: {
        color: COLOR.BLACK_60,
        fontSize: 13,
        marginTop: 5,
        fontWeight: '600',
    },
    QRCodeScannerMainContainer: {
        backgroundColor: COLOR.BLACK,
        width: width * 0.6,
        aspectRatio: 1 / 1,
        marginVertical: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    WhiteStripStyle: {
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        height: '100%',
        width: '45%',
    },
    QRScannerWhiteBoxStyle: {
        position: 'absolute',
        backgroundColor: COLOR.WHITE,
        width: (width * 0.60) - 10,
        aspectRatio: 1 / 1,
        borderRadius: 20,
    },
    QRScannerLineStyle: {
        position: 'absolute',
        backgroundColor: COLOR.ORANGE,
        width: (width * 0.60) - 35,
        height: 4,
        borderRadius: 20,
        zIndex: 100,
        top: 30,
    },
    VerificationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: -10,
    },
    VerificationTextStyle: {
        color: COLOR.BLACK,
        fontSize: 13,
    }
})