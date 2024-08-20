import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import FastImage from 'react-native-fast-image'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const imgWidth = (width - 40) / 2;

const PhotoCard = ({
    data,
    onAddPress,
    onRemovePress,
    numOfColumns,
}) => {
    return (
        <View style={[styles.Container, { width: (width - 30 - ((numOfColumns - 1) * 10)) / numOfColumns }]}>
            {
                data == 0
                    ?
                    <TouchableOpacity
                        style={styles.ContentContainer}
                        onPress={onAddPress}
                    >
                        <LinearGradient
                            colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                            style={styles.GradientStyle}
                            angle={150}
                            useAngle
                        >
                            <MaterialIcons name='photo' size={50} color={COLOR.WHITE} />
                        </LinearGradient>
                    </TouchableOpacity>
                    :
                    <View style={styles.ContentContainer}>
                        <SkeletonPlaceholder speed={1000} >
                            <View style={styles.ContentContainer} />
                        </SkeletonPlaceholder>
                        <View style={[styles.ContentContainer, { position: 'absolute', zIndex: 100 }]}>
                            <FastImage
                                source={{ uri: data }}
                                style={styles.ContentContainer}
                                resizeMode='cover'
                            />
                            <TouchableOpacity
                                style={styles.RemoveButton}
                                onPress={() => {
                                    Alert.alert(
                                        'Delete',
                                        'Are you sure, you want to delete this image ?',
                                        [
                                            { text: 'No', onPress: () => { } },
                                            { text: 'Yes', onPress: () => { onRemovePress(data) } },

                                        ],
                                    )
                                }}
                            >
                                <Ionicons name='close' size={15} color={COLOR.BLACK} />
                            </TouchableOpacity>
                        </View>
                    </View>
            }
        </View>
    )
}

export default memo(PhotoCard)

const styles = StyleSheet.create({
    Container: {
        width: imgWidth,
        aspectRatio: 1 / 1.5,
        margin: 5,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 15,
        backgroundColor: COLOR.WHITE,
    },
    ContentContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
    },
    RemoveButton: {
        alignItems: 'center',
        borderRadius: 7,
        padding: 3,
        aspectRatio: 1 / 1,
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.WHITE,
        zIndex: 1000,
    },
    GradientStyle: {
        alignItems: 'center',
        borderRadius: 15,
        borderColor: COLOR.WHITE,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        padding: 10,
        justifyContent: 'center',
        borderWidth: 2,
    },
})