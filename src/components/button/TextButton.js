import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const TextButton = ({ onPress, text, alignRight }) => {
    return (
        <TouchableOpacity
            style={[styles.Container, alignRight && { alignSelf: 'flex-end', }]}
            onPress={onPress}
        >
            <Text style={styles.TextStyle}>
                {text}
            </Text>
        </TouchableOpacity>
    )
}

export default TextButton

const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 5,
        paddingVertical: 10,
    },
    TextStyle: {
        color: COLOR.WHITE_80,
        fontSize: 12,
    },
})