import { ActivityIndicator, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { NormalSnackBar } from '../../constants/SnackBars';
import { NavigationScreens, keyboardType } from '../../constants/Strings';
import DataDisplayCard from '../DataDisplayCard';
import CustomButton from '../button/CustomButton';
import { tableAllocationAPI } from '../../api/utils';

const TableAllocationModal = ({
    data,
    modalVisible,
    setModalVisible,
    navigation,
}) => {

    const [table, setTable] = useState('');
    const [allocating, setAllocating] = useState(false);
    const invoiceId = data?._id;
    const customer = data?.customer;

    const custData = [
        {
            field: 'Name',
            value: customer?.name,
        },
    ]

    customer?.contact && custData.push({
        field: 'Contact No.',
        value: `+91 ${customer?.contact}`,
    });

    const onAllocatePress = async () => {
        if (table == '') {
            NormalSnackBar('Enter Table Number.');
        } else {
            try {
                setAllocating(true);
                const res = await tableAllocationAPI(invoiceId, { tableNo: table });
                if (res?.data && res?.data?.data) {
                    setModalVisible(false);
                    navigation.navigate(NavigationScreens.ItemAddToBillScreen, {
                        invoiceId: invoiceId,
                        dis: data?.booking?.discount,
                        tableNo: res?.data?.data?.restaurant?.tableNo,
                    });
                    setTable('');
                } else {
                    NormalSnackBar('Something wents wrong.');
                }
                setAllocating(false);
            } catch (e) {
                console.log(e);
                setAllocating(false);
                NormalSnackBar('Something wents wrong.');
            }
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
                        title={'Allocate Table'}
                        data={custData}
                    >
                        <TextInput
                            style={styles.TableNoInputStyle}
                            placeholder={'Table No'}
                            placeholderTextColor={COLOR.GRAY}
                            numberOfLines={1}
                            keyboardType={keyboardType.default}
                            value={table}
                            onChangeText={setTable}
                            maxLength={5}
                        />
                    </DataDisplayCard>

                    {
                        allocating ?
                            <View style={styles.AllocationProcessContainer}>
                                <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                                <Text
                                    style={styles.ProcessText}
                                    numberOfLines={1}
                                >
                                    Table Allocating...
                                </Text>
                            </View>
                            :
                            <CustomButton
                                onPress={onAllocatePress}
                                colors={GRADIENTCOLOR.ORANGE}
                                text={'Allocate'}
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

export default TableAllocationModal

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
    TableNoInputStyle: {
        borderRadius: 12,
        height: 40,
        paddingHorizontal: 15,
        color: COLOR.BLACK,
        fontSize: 12,
        width: '100%',
        backgroundColor: COLOR.BORDERCOLOR,
    },
    AllocationProcessContainer: {
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