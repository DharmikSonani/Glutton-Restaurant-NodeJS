import { StyleSheet, View, StatusBar, KeyboardAvoidingView, Platform, Text } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'
import { headerBackgroundContainerStyle, headerStyle } from '../constants/Styles'
import BackButton from './button/BackButton'
import HeaderRightButton from './button/HeaderRightButton'

const ScreenHeader = ({
    navigation,
    children,
    containerStyle,
    isDashboard,
    title,
    onRightPress,
    rightButtonIcon,
}) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' && 'padding'}
            style={{ flex: 1, backgroundColor: COLOR.WHITE, }}>

            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLOR.TRANSPARANT}
                translucent
            />

            {/* Header */}
            <View style={[styles.Container, headerBackgroundContainerStyle, headerStyle,]}>
                <BackButton navigation={navigation} isDashboard={isDashboard} />
                {title && <Text style={styles.TitleText} numberOfLines={1}>{title}</Text>}
                <HeaderRightButton onPress={onRightPress} icon={rightButtonIcon} />
            </View>

            {/* Details */}
            <View style={[styles.ContainerStyle, containerStyle]}>
                {children}
            </View>
        </KeyboardAvoidingView>
    )
}

export default ScreenHeader

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        paddingTop: 45,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        backgroundColor: COLOR.WHITE,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    ContainerStyle: {
        flex: 1,
        zIndex: -10,
        paddingTop: headerStyle.height - 40,
        backgroundColor: COLOR.WHITE,
    },
    TitleText: {
        fontSize: 20,
        color: COLOR.BLACK,
        fontWeight: '700',
        maxWidth: '65%',
    },
})