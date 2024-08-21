import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { NormalSnackBar } from '../../constants/SnackBars';
import DataDisplayCard from '../DataDisplayCard';
import CustomButton from '../button/CustomButton';
import { addInvoiceItemAPI } from '../../api/utils';

const AddItemToOrderModal = ({
    data,
    modalVisible,
    setModalVisible,
    invoiceId,
    onComplete,
}) => {

    const [qty, setQty] = useState(1);

    const itemDisplayData = [
        {
            field: 'Category',
            value: data?.category?.name,
        },
        {
            field: 'Price',
            value: `₹ ${parseFloat(data?.price).toFixed(2)}`,
        },
    ]

    const onAddToOrderPress = async () => {
        try {
            const params = {
                invoiceId: invoiceId,
                name: data?.name,
                qty: qty,
                price: data?.price
            }

            const res = await addInvoiceItemAPI(params);

            if (res?.data && res?.data?.data) {
                onComplete(`${qty?.toString()} ${data?.name} added.`);
                setModalVisible(false);
            } else {
                onComplete("Something wents wrong.");
            }
        } catch (e) {
            console.log(e);
            NormalSnackBar('Something wents wrong.');
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
                    <DataDisplayCard
                        title={data?.name}
                        data={itemDisplayData}
                    >
                        <View style={styles.QuantityContainer}>
                            <Text style={[styles.QuantityText, { flex: 1 }]} numberOfLines={1}>Quantity</Text>
                            <View style={[styles.QuantityValueContainer]}>
                                <TouchableOpacity
                                    style={styles.QuantityButton}
                                    onPress={() => { qty > 1 && setQty(qty - 1) }}
                                    disabled={qty == 1}
                                >
                                    <FontAwesome5 name='minus' size={12} color={qty > 1 ? COLOR.BLACK : COLOR.GRAY} />
                                </TouchableOpacity>

                                <Text style={[styles.QuantityText, { paddingHorizontal: 2, }]}>{qty}</Text>

                                <TouchableOpacity
                                    style={styles.QuantityButton}
                                    onPress={() => { qty < 20 && setQty(qty + 1) }}
                                    disabled={qty == 20}
                                >
                                    <FontAwesome5 name='plus' size={12} color={qty < 20 ? COLOR.BLACK : COLOR.GRAY} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </DataDisplayCard>

                    <CustomButton
                        onPress={onAddToOrderPress}
                        colors={GRADIENTCOLOR.ORANGE}
                        text={'Add Item In Order'}
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

export default AddItemToOrderModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        width: '80%',
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
    QuantityContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    QuantityText: {
        color: COLOR.BLACK,
        fontSize: 14,
    },
    QuantityValueContainer: {
        backgroundColor: COLOR.BORDERCOLOR,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    QuantityButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
})