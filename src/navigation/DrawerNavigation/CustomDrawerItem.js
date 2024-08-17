import { StyleSheet, TouchableOpacity, Text, } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const CustomDrawerItem = ({ label, onPress, style, labelStyle, icon }) => {
    return (
        <TouchableOpacity
            style={[styles.ButtonStyle, style]}
            onPress={onPress}
            activeOpacity={1}
        >
            {icon}
            <Text style={[
                styles.LabelStyle,
                labelStyle,
            ]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default CustomDrawerItem

const styles = StyleSheet.create({
    ButtonStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 7,
        marginBottom: 15,
    },
    LabelStyle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLOR.BLACK,
        marginLeft: 15,
    },
})