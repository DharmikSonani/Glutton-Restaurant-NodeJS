import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors'

const AuthLabel = ({ title, desc }) => {
    return (
        <View style={styles.Container}>
            <Text style={styles.TitleText}>
                {title}
            </Text>

            <Text style={styles.DescText}>
                {desc}
            </Text>
        </View>
    )
}

export default AuthLabel

const styles = StyleSheet.create({
    Container: {
        width: '100%',
    },
    TitleText: {
        color: COLOR.WHITE,
        fontSize: 25,
    },
    DescText: {
        color: COLOR.WHITE_80,
        fontSize: 13,
        marginTop: 5,
    }
})