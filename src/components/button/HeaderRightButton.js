import { StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'

const HeaderRightButton = ({
    onPress,
    icon,
}) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.Button]}
            disabled={!onPress}
        >
            {onPress && icon && icon}
        </TouchableOpacity>
    )
}

export default HeaderRightButton

const styles = StyleSheet.create({
    Button: {
        marginRight: 18,
        height: '50%',
        aspectRatio: 1 / 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
    },
})