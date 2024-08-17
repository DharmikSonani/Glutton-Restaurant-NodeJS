import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import FieldValuePairLabel from './labels/FieldValuePairLabel'
import { COLOR } from '../constants/Colors'

const DataDisplayCard = ({
    title,
    data,
    children,
    style,
    marginTop,
}) => {
    return (
        <View style={[styles.Container, marginTop && { marginTop }]}>

            <Text style={styles.TitleText} numberOfLines={1}>
                {title}
            </Text>

            <View style={[styles.ContentContainer, style && style]} >

                {data && data.map((item, i) => <FieldValuePairLabel key={i} field={item.field} value={item.value} />)}

                {children}

            </View>

        </View>
    )
}

export default DataDisplayCard

const styles = StyleSheet.create({
    Container: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    ContentContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        paddingTop: 30,
    },
    TitleText: {
        color: COLOR.BLACK,
        backgroundColor: COLOR.BORDERCOLOR,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 15,
        overflow: 'hidden',
        position: 'absolute',
        top: -17,
        zIndex: 10,
    },
})