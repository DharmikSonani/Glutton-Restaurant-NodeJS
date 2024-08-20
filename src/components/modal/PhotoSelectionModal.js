import { ActivityIndicator, Linking, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import { ActionSnackBar, NormalSnackBar } from '../../constants/SnackBars';
import CustomButton from '../button/CustomButton';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { addPhotoAPI } from '../../api/utils';
import { setPhotosDataInRedux } from '../../redux/PhotosData/PhotosDataAction';
import { useDispatch } from 'react-redux';

const PhotoSelectionModal = ({
    modalVisible,
    setModalVisible,
    onSuccess,
    restId,
}) => {

    const [image, setImage] = useState('');
    const [proccess, setProccess] = useState(false);
    const [tranfered, setTranfered] = useState('');
    const dispatch = useDispatch();

    const onImageSelectPress = async () => {
        const granted = await checkPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        if (granted) {
            ImageCropPicker.openPicker({
                width: 600,
                height: 900,
                compressImageQuality: 0.9,
                mediaType: 'photo',
            }).then(image => {
                setImage(image.path);
            }).catch((e) => { console.log(e); });
        } else {
            ActionSnackBar('Please allow photo permission from settings.', 'Open', () => { Linking.openSettings() });
        }
    }

    const onCameraPress = async () => {
        const granted = await checkPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.CAMERA :
                PERMISSIONS.ANDROID.CAMERA
        );
        if (granted) {
            ImageCropPicker.openCamera({
                width: 600,
                height: 900,
                compressImageQuality: 0.9,
                mediaType: 'photo',
            }).then(image => {
                setImage(image.path);
            }).catch((e) => { console.log(e); });
        } else {
            ActionSnackBar('Please allow camera permission from settings.', 'Open', () => { Linking.openSettings() });
        }
    }

    const checkPermission = async (permission) => {
        return check(permission)
            .then((result) => {
                switch (result) {
                    case RESULTS.DENIED:
                        return requestPermission(permission);
                    case RESULTS.GRANTED:
                        return true;
                    case RESULTS.UNAVAILABLE:
                        return Platform.OS == 'android' && requestPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
                }
            }).catch((error) => { console.log(error) })
    }

    const requestPermission = (permission) => {
        return request(permission, true).then((result) => {
            switch (result) {
                case RESULTS.GRANTED:
                    return true;
            }
        })
    }


    const uploadImage = async () => {
        try {
            if (image == null) {
                return null
            }

            const uploadUri = image;

            let filename = firestore.Timestamp.fromDate(new Date());
            let refString = `All_Restaurants/${restId}/Images/${filename}`;
            const storageRef = storage().ref(refString);
            const task = storageRef.putFile(uploadUri);

            task.on('state_changed', taskSnapshot => {
                const per = Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100);
                setTranfered(per);
            });

            await task
            const uri = storageRef.getDownloadURL()
            return uri;
        } catch (e) {
            console.log(e);
            setProccess(false);
            return null;
        }
    }

    const onUploadPress = async () => {
        if (image == '') {
            NormalSnackBar('Select Image');
            return;
        }
        try {
            setProccess(true)
            const imageUri = await uploadImage();

            const res = await addPhotoAPI(restId, { img: imageUri });

            if (res?.data && res?.data?.data) {
                setModalVisible(false);
                onSuccess();
                dispatch(setPhotosDataInRedux([0, ...res?.data?.data?.images]));
            }
            setProccess(false);
        } catch (e) {
            console.log(e);
            setProccess(false);
            NormalSnackBar('Something wents wrong.');
        }
    }


    return (
        <Modal
            animationType='fade'
            transparent
            visible={modalVisible}
            statusBarTranslucent
            onRequestClose={() => { setModalVisible(false) }}
        >
            <View style={styles.ViewWrapper}>
                <View style={styles.Container}>
                    <View style={styles.ImageContainer}>
                        {
                            image ?
                                <FastImage
                                    source={{ uri: image }}
                                    style={styles.ImageStyle}
                                    resizeMode='cover'
                                />
                                :
                                <MaterialIcons name='photo' size={50} color={COLOR.BORDERCOLOR} />
                        }
                    </View>

                    <View style={{ flexDirection: 'row', }}>
                        <CustomButton
                            onPress={onImageSelectPress}
                            colors={GRADIENTCOLOR.ORANGE}
                            text={'Gallery'}
                            style={styles.Button}
                        >
                            <MaterialIcons name='photo-library' size={20} color={COLOR.WHITE} />
                        </CustomButton>

                        <View style={{ width: 10 }} />

                        <CustomButton
                            onPress={onCameraPress}
                            colors={GRADIENTCOLOR.ORANGE}
                            text={'Camera'}
                            style={styles.Button}
                        >
                            <MaterialIcons name='photo-camera' size={20} color={COLOR.WHITE} />
                        </CustomButton>
                    </View>
                    {
                        image && (
                            proccess ?
                                <View style={styles.PaymentProcessContainer}>
                                    <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                                    <Text
                                        style={styles.ProcessText}
                                        numberOfLines={1}
                                    >
                                        {tranfered} % Uploading...
                                    </Text>
                                </View>
                                :
                                <CustomButton
                                    onPress={onUploadPress}
                                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                    text={'Upload Image'}
                                >
                                    <Entypo name='upload' size={15} color={'#fff'} style={[styles.ButtonIcons, { backgroundColor: '#ff000000' }]} />
                                </CustomButton>
                        )
                    }

                    <TouchableOpacity
                        style={styles.CloseButton}
                        onPress={() => { setModalVisible(false) }}
                        activeOpacity={1}
                    >
                        <Ionicons name='close' size={20} color={COLOR.WHITE} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default PhotoSelectionModal

const styles = StyleSheet.create({
    ViewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BLACK_30,
    },
    Container: {
        width: '85%',
        alignItems: "center",
        justifyContent: "center",
        elevation: 20,
        shadowColor: COLOR.BLACK_60,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: COLOR.WHITE,
        borderRadius: 20,
        padding: 30,
    },
    CloseButton: {
        alignItems: 'center',
        borderRadius: 10,
        padding: 5,
        elevation: 2,
        aspectRatio: 1 / 1,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        position: 'absolute',
        right: -15,
        top: -15,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
        backgroundColor: COLOR.BLACK,
    },
    ImageContainer: {
        width: '100%',
        aspectRatio: 1 / 1.5,
        backgroundColor: COLOR.WHITE,
        elevation: 1,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
    ImageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    Button: {
        flex: 1,
        width: 'auto',
    },
    PaymentProcessContainer: {
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 17,
        paddingHorizontal: 15,
        backgroundColor: COLOR.BORDERCOLOR,
    },
    ProcessText: {
        fontSize: 13,
        color: COLOR.BLACK,
        marginLeft: 10,
        maxWidth: '80%',
    },
})