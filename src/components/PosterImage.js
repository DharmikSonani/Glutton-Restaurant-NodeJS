import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PosterImage = ({
    img,
    onPress,
}) => {
    return (
        <View style={styles.Container}>
            <SkeletonPlaceholder speed={1000}>
                <View style={styles.SkeletonPlaceholderStyle} />
            </SkeletonPlaceholder>
            {
                img &&
                <FastImage
                    source={{ uri: img }}
                    style={styles.ImageStyle}
                    resizeMode='cover'
                />
            }
            {
                onPress &&
                <TouchableOpacity
                    style={[styles.ChangeButton]}
                    onPress={onPress}
                >
                    <MaterialIcons name='add-circle' size={35} color={COLOR.BLACK} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default PosterImage

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        aspectRatio: 2 / 1,
        borderRadius: 15,
        backgroundColor: COLOR.WHITE,
        elevation: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    SkeletonPlaceholderStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        overflow: 'hidden',
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 15,
        position: 'absolute',
        borderColor: COLOR.WHITE,
        borderWidth: 1,
        zIndex: 1,
    },
    ChangeButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderRadius: 40,
        backgroundColor: COLOR.WHITE,
        zIndex: 100,
        elevation: 2,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
})