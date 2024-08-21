import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { NormalSnackBar } from '../../constants/SnackBars';
import CustomButton from '../button/CustomButton';
import { keyboardType } from '../../constants/Strings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SelectList } from 'react-native-dropdown-select-list';
import DataDisplayCardBlack from '../DataDisplayCardBlack';
import FieldValuePairInput from '../input/FieldValuePairInput';
import { addMenuItemAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const AddNewItemModal = ({
    restId,
    modalVisible,
    setModalVisible,
    categories,
}) => {
    const [process, setProcess] = useState(false);

    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const onAddItemPress = async () => {
        try {
            if (!itemName) {
                NormalSnackBar('Enter Item Name.');
                return;
            }
            if (!price || parseInt(price) <= 0) {
                NormalSnackBar('Price Must be greater then 0.');
                return;
            }
            if (!category) {
                NormalSnackBar('Select Item Category.');
                return;
            }

            setProcess(true);

            const params = {
                restId: restId,
                name: itemName,
                price: price,
                category: {
                    id: category?.key,
                    name: category?.value,
                }
            };

            const res = await addMenuItemAPI(params);

            if (res?.data && res?.data?.data) {
                NormalSnackBar(`${itemName} added.`);
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
                    <DataDisplayCardBlack title={'Add New Food Item'} style={{ marginTop: 0 }}>
                        <FieldValuePairInput
                            field={'Item Name'}
                            value={itemName}
                            onChangeText={setItemName}
                        />
                        <FieldValuePairInput
                            field={'Price (Rs.)'}
                            value={price}
                            onChangeText={setPrice}
                            keyboardType={keyboardType.numeric}
                            maxLength={5}
                        />
                        <FieldValuePairInput
                            field={'Category'}
                            style={{ marginBottom: 0 }}
                        >
                            <View style={{ flex: 1, }}>
                                <SelectList
                                    data={categories}
                                    setSelected={(val) => setCategory(categories?.find((item) => item.key == val))}

                                    searchPlaceholder={'Search Category'}
                                    placeholder={'Select Category'}
                                    notFoundText={'Category Not Found.'}

                                    searchicon={<FontAwesome name='search' size={15} color={COLOR.GRAY} style={{ marginRight: 10, }} />}
                                    closeicon={<Ionicons name='ios-close' size={16} color={COLOR.BLACK} />}

                                    dropdownStyles={styles.dropdownStyles}
                                    boxStyles={[styles.boxStyles]}
                                    dropdownTextStyles={styles.dropdownTextStyles}
                                    dropdownItemStyles={styles.dropdownItemStyles}
                                    inputStyles={[styles.inputStyles, {
                                        color: category ? COLOR.BLACK : COLOR.GRAY,
                                    }]}
                                />
                            </View>
                        </FieldValuePairInput>
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
                            <CustomButton
                                onPress={onAddItemPress}
                                colors={GRADIENTCOLOR.ORANGE}
                                text={'Add Item'}
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

export default AddNewItemModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
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
    boxStyles: {
        borderRadius: 12,
        height: 40,
        paddingHorizontal: 15,
        color: COLOR.BLACK,
        fontSize: 12,
        backgroundColor: COLOR.BORDERCOLOR,
        alignItems: 'center',
        marginLeft: 5,
        borderWidth: 0,
    },
    dropdownStyles: {
        borderRadius: 12,
        paddingHorizontal: 0,
        borderColor: COLOR.BORDERCOLOR,
    },
    dropdownTextStyles: {
        color: COLOR.BLACK,
        fontSize: 11,
    },
    dropdownItemStyles: {
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        borderColor: COLOR.BORDERCOLOR,
        marginHorizontal: 10,
        paddingHorizontal: 5,
    },
    inputStyles: {
        fontSize: 12,
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