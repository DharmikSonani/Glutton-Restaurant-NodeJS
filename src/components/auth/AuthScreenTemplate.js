import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors'
import { BackgroundImage } from '../../constants/Assets'
import FastImage from 'react-native-fast-image'
import { BlurView } from '@react-native-community/blur'
import LinearGradient from 'react-native-linear-gradient'

const AuthScreenTemplate = ({
    children
}) => {
    return (
        <View style={styles.Container}>
            <StatusBar
                backgroundColor={COLOR.TRANSPARANT}
                translucent={true}
                barStyle={'light-content'}
            />

            <FastImage
                style={styles.absolute}
                source={BackgroundImage}
            />

            <View style={styles.ContentContainer}>

                <BlurView
                    style={[styles.absolute]}
                    blurAmount={5}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.WHITE_15_TO_05}
                        style={styles.Container}
                        useAngle
                        angle={125}
                    >
                    </LinearGradient>
                </BlurView>

                <View style={styles.InnerContentContainer}>
                    {children}
                </View>
            </View>
        </View>
    )
}

export default AuthScreenTemplate

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    absolute: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
    },
    ContentContainer: {
        width: '80%',
        overflow: 'hidden',
        borderRadius: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        aspectRatio: 1 / 1.9,
    },
    InnerContentContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
        borderWidth: 1.5,
        padding: 20,
        borderColor: COLOR.WHITE_50,
        justifyContent: 'center',
        alignItems: 'center',
    },
})