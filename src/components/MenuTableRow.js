import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { MenuDataTableHeader } from '../constants/Helper';

const MenuTableRow = ({
    index = 0,
    data,
    onEditPress,
}) => {
    return (
        <View style={styles.Container} >
            <Text style={[{ width: MenuDataTableHeader[0].width }, styles.ListTextStyle]} numberOfLines={1}>{index}.</Text>
            <Text style={[styles.ListTextStyle, { width: MenuDataTableHeader[1].width, textAlign: 'left', }]}>{data.name?.trim()}</Text>
            <Text style={[{ width: MenuDataTableHeader[2].width }, styles.ListTextStyle]}>{data?.category?.name}</Text>
            <Text style={[styles.ListTextStyle, { width: MenuDataTableHeader[3].width, textAlign: 'right' },]} numberOfLines={1}>₹{data.price}</Text>
            <View style={[{ width: MenuDataTableHeader[4].width, }, styles.ButtonContainer]}>
                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => { onEditPress(data) }}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                        style={styles.GradientStyle}
                        angle={150}
                        useAngle
                    >
                        <Feather name='edit-3' size={13} color={COLOR.WHITE} />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default memo(MenuTableRow)

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        alignItems: 'center',
        paddingVertical: 6,
    },
    ListTextStyle: {
        color: COLOR.BLACK,
        fontSize: 12,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '300',
        paddingHorizontal: 5,
    },
    ButtonContainer: {
        padding: 2,
        aspectRatio: 1 / 1,
    },
    Button: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: COLOR.WHITE,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        padding: 1,
    },
    GradientStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        flex: 1,
    },
})