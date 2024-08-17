import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';

const PackageCard = ({
    data,
    onSelect,
    selectedPackage,
}) => {
    return (
        <TouchableOpacity
            style={[styles.Container, { shadowColor: data.packageName == selectedPackage.packageName ? COLOR.BLACK : COLOR.ORANGE, }]}
            onPress={() => onSelect(data)}
            activeOpacity={1}
        >
            <LinearGradient
                colors={data.packageName == selectedPackage.packageName ? GRADIENTCOLOR.BLACK_50_100_100_100 : GRADIENTCOLOR.ORANGE}
                style={styles.GradientStyle}
                angle={150}
                useAngle
            >
                <Text style={styles.PackageNameText}>{data.packageName}</Text>
                <Text style={styles.PackagePriceText}>₹ {data.price && parseFloat(data.price).toFixed(2)}/-</Text>
                <Text style={styles.PackageDurationText}>Duration : {data.duration} Month{data.duration > 1 ? 's' : ''} </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default memo(PackageCard)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        elevation: 10,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        marginBottom: 15,
        padding: 1.5,
    },
    GradientStyle: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 18.5,
        alignItems: 'center',
        width: '100%',
    },
    PackageNameText: {
        color: COLOR.WHITE,
        fontSize: 17,
    },
    PackagePriceText: {
        color: COLOR.WHITE,
        fontSize: 30,
        marginVertical: 10,
        fontWeight: '800',
    },
    PackageDurationText: {
        color: COLOR.WHITE,
        fontSize: 13,
    },
})