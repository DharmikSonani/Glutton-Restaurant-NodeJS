import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import DataDisplayCard from '../DataDisplayCard';
import FieldValuePairLabel from '../labels/FieldValuePairLabel';
import { addMonths, format } from 'date-fns';
import CustomButton from '../button/CustomButton';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { packageActivationAPI } from '../../api/utils';
import { useDispatch } from 'react-redux';

const PaymentConfirmModal = ({
    restId,
    data,
    modalVisible,
    setModalVisible,
    onSuccess,
}) => {

    const [proccess, setProccess] = useState(false);
    const startDate = format(new Date(), 'yyyy-MM-dd').toString();
    const endDate = data && data['duration'] && format(addMonths(new Date(), data['duration']), 'yyyy-MM-dd').toString();

    const dispatch = useDispatch();

    const onProceedPress = async () => {
        try {
            setProccess(true);

            const params = {
                startDate: startDate,
                endDate: endDate,
            }

            const res = await packageActivationAPI(restId, params);

            if (res?.data && res?.data?.data) {
                onSuccess('Package Activeted');
                dispatch(setRestDataInRedux(res?.data?.data));
            } else {
                onSuccess('Something wents wrong.');
            }
            setProccess(false);
        } catch (e) {
            console.log(e);
            onSuccess("Something wents wrong.")
            setProccess(false);
        }
    }

    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.Container}>
                    <DataDisplayCard title={'Confirm Details'}>
                        <FieldValuePairLabel
                            field={'Package Name'}
                            value={data['packageName']}
                        />
                        <FieldValuePairLabel
                            field={'Price'}
                            value={`₹ ${data['price'] && parseFloat(data['price']).toFixed(2)}`}
                        />
                        <FieldValuePairLabel
                            field={'Duration'}
                            value={`${data['duration']} Month${data['duration'] > 1 ? 's' : ''}`}
                        />
                        <FieldValuePairLabel
                            field={'Start Date'}
                            value={startDate}
                        />
                        <FieldValuePairLabel
                            field={'End Date'}
                            value={endDate}
                            style={{ marginBottom: 0 }}
                        />
                    </DataDisplayCard>

                    {
                        proccess ?
                            <View style={styles.PaymentProcessContainer}>
                                <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                                <Text
                                    style={styles.ProcessText}
                                    numberOfLines={1}
                                >
                                    Processing...
                                </Text>
                            </View>
                            :
                            <CustomButton
                                onPress={onProceedPress}
                                colors={GRADIENTCOLOR.ORANGE}
                                text={'Proceed'}
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

export default PaymentConfirmModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        width: '85%',
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
    PaymentProcessContainer: {
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 17,
        paddingHorizontal: 15,
        backgroundColor: COLOR.BORDERCOLOR,
    },
    ProcessText: {
        fontSize: 13,
        color: COLOR.BLACK,
        marginLeft: 10,
        maxWidth: '80%',
    },
})