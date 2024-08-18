import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'

const PrimaryButton = ({
    onPress,
    title,
    isLoading = false,
    style,
    flex = 0,
}) => {
    return (
        <View style={{ flex }}>
            {
                isLoading ?
                    <View style={[styles.Container, style && style]}>
                        <ActivityIndicator size={'small'} color={COLOR.WHITE} />
                    </View>
                    :
                    <TouchableOpacity style={[styles.Container, style && style]}
                        onPress={onPress}>
                        <LinearGradient
                            colors={GRADIENTCOLOR.PRIMARYBUTTONCOLOR}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            useAngle angle={120}
                            style={styles.GradientStyle}
                        >
                            <Text style={styles.TextStyle}>
                                {title}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>
            }
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    Container: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
    },
    GradientStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextStyle: {
        color: COLOR.WHITE,
    },
})