import { ActivityIndicator, Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { NormalSnackBar } from '../../constants/SnackBars';
import CustomButton from '../button/CustomButton';
import DataDisplayCardBlack from '../DataDisplayCardBlack';
import FieldValuePairLabel from '../labels/FieldValuePairLabel';
import FieldValuePairInput from '../input/FieldValuePairInput';
import { keyboardType } from '../../constants/Strings';
import { removeMenuItemAPI, updateMenuItemAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const EditItemModal = ({
    restId,
    data,
    modalVisible,
    setModalVisible,
}) => {
    const [process, setProcess] = useState(false);

    const [price, setPrice] = useState(data['price'].toString());

    const onUpdateItemPress = async () => {
        try {
            if (!price || parseInt(price) <= 0) {
                NormalSnackBar('Price Must be greater then 0.');
                return;
            }
            setProcess(true);

            const res = await updateMenuItemAPI(data?._id, { price: parseInt(price) });

            if (res?.data && res?.data?.data) {
                NormalSnackBar(`${data.name} price updated.`);
                setModalVisible(false);
                socketServices.emit('MenuItemUpdate', res?.data?.data?.restId);
            } else {
                NormalSnackBar("Something wents wrong.");
            }
            setProcess(false);
        } catch (error) {
            console.log(error);
            setProcess(false);
            NormalSnackBar("Something wents wrong.");
        }
    }

    const onRemovePress = () => {
        Alert.alert(
            data.name,
            'Are you sure you want to remove this item?',
            [
                { text: 'No', onPress: () => { } },
                { text: 'Yes', onPress: () => { RemoveItem() } },

            ],
            { cancelable: false }
        )
    }

    const RemoveItem = async () => {
        try {
            setProcess(true);

            const res = await removeMenuItemAPI(data?._id);

            if (res?.data && res?.data?.data) {
                NormalSnackBar(`${data.name} removed.`);
                setModalVisible(false);
                socketServices.emit('MenuItemUpdate', res?.data?.data?.restId);
            } else {
                NormalSnackBar("Something wents wrong.");
            }
            setProcess(false);
        } catch (e) {
            console.log(e);
            setProcess(false);
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
                    <DataDisplayCardBlack
                        title={data?.category?.name}
                        style={{ marginTop: 0 }}
                    >
                        <FieldValuePairLabel
                            field={'Item Name'}
                            value={data['name']}
                        />

                        <FieldValuePairInput
                            field={'Price (Rs.)'}
                            value={price}
                            onChangeText={setPrice}
                            maxLength={5}
                            keyboardType={keyboardType.numeric}
                            style={{ marginBottom: 0 }}
                        />
                    </DataDisplayCardBlack>
                    {
                        process ?
                            <View style={styles.ProcessContainer}>
                                <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                                <Text
                                    style={styles.ProcessText}
                                    numberOfLines={1}
                                >
                                    Processing...
                                </Text>
                            </View>
                            :
                            <View style={styles.ButtonContainer}>
                                <CustomButton
                                    onPress={onUpdateItemPress}
                                    colors={GRADIENTCOLOR.ORANGE}
                                    text={'Update'}
                                    style={styles.Button}
                                />
                                <View style={{ width: 10 }} />
                                <CustomButton
                                    onPress={onRemovePress}
                                    colors={GRADIENTCOLOR.CANCELLED}
                                    text={'Remove'}
                                    style={styles.Button}
                                />
                            </View>
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

export default EditItemModal

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
    ButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    Button: {
        flex: 1,
        width: 'auto',
    },
    ProcessContainer: {
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