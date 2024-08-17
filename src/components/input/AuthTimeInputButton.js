import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const AuthTimeInputButton = ({
    onPress,
    openTime,
    closeTime,
}) => {
    return (
        <TouchableOpacity style={styles.Container}
            onPress={onPress}
        >
            <Text style={{ color: COLOR.WHITE_60 }}>{!openTime && !closeTime && 'Select '}Time</Text>
            {openTime && closeTime && <Text style={{ color: COLOR.WHITE }}>{openTime} {' to '} {closeTime}</Text>}
        </TouchableOpacity>
    )
}

export default AuthTimeInputButton

const styles = StyleSheet.create({
    Container: {
        borderRadius: 7,
        height: 40,
        marginBottom: 10,
        borderColor: COLOR.WHITE_60,
        borderWidth: 1,
        width: '100%',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})