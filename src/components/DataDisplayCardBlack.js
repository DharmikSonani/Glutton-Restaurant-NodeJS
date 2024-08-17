import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FieldValuePairLabel from './labels/FieldValuePairLabel'
import { COLOR, GRADIENTCOLOR } from '../constants/Colors'
import LinearGradient from 'react-native-linear-gradient'

const DataDisplayCardBlack = ({
    title,
    data,
    children,
    style,
}) => {
    return (
        <View style={[styles.Container, style && style]}>
            <View style={styles.TitleContainer}>
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                    style={styles.TitleGradient}
                    angle={150}
                    useAngle
                >
                    <Text style={styles.TitleText} numberOfLines={1}>
                        {title}
                    </Text>
                </LinearGradient>
            </View>

            <View style={styles.ContentContainer} >

                {data && data.map((item, i) => <FieldValuePairLabel key={i} field={item.field} value={item.value} />)}

                {children}

            </View>

        </View>
    )
}

export default DataDisplayCardBlack

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
    ContentContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        paddingTop: 30,
        marginTop: 17,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        backgroundColor: COLOR.WHITE,
        shadowColor: COLOR.BLACK_60,
    },
    TitleContainer: {
        position: 'absolute',
        left: 20,
        zIndex: 10,
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        borderRadius: 15,
    },
    TitleGradient: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15,
    },
    TitleText: {
        color: COLOR.WHITE,
    },
})