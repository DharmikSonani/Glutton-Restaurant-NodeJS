import { useSelector } from 'react-redux';
import { Reducers } from '../../constants/Strings';
import { useEffect, useState } from 'react';
import { RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';
import { requestLocationPermission } from '../../constants/AppPermission';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Linking, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ActionSnackBar, NormalSnackBar } from '../../constants/SnackBars';
import axios from 'axios';
import storage from '@react-native-firebase/storage';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restId = useSelector(state => state[Reducers.AuthReducer]);
    const restData = useSelector(state => state[Reducers.RestDataReducer]);
    const email = restData ? restData[RestaurantDBFields.email] : '';
    const contact = restData ? restData[RestaurantDBFields.contactNo] : '';

    const s = {
        region: {
            latitude: restData ? parseFloat(restData[RestaurantDBFields.coordinates].latitude) : 0.0000,
            longitude: restData ? parseFloat(restData[RestaurantDBFields.coordinates].longitude) : 0.0000,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
        }
    }

    // UseStates
    const [loading, setLoading] = useState(false);
    const [stat, setStat] = useState(s)

    const [image, setImage] = useState(restData && restData[RestaurantDBFields.restImage]);

    const [restName, setRestName] = useState(restData && restData[RestaurantDBFields.restaurantName]);
    const [ownerName, setOwnerName] = useState(restData && restData[RestaurantDBFields.ownerName]);
    const [tables, setTables] = useState(restData && restData[RestaurantDBFields.tables].toString());
    const [openTime, setOpenTime] = useState(restData && restData[RestaurantDBFields.openTime]);
    const [closeTime, setCloseTime] = useState(restData && restData[RestaurantDBFields.closeTime]);
    const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);

    const [address, setAddress] = useState(restData && restData[RestaurantDBFields.address]);
    const [city, setCity] = useState(restData && restData[RestaurantDBFields.city]);
    const [state, setState] = useState(restData && restData[RestaurantDBFields.state]);
    const [pincode, setPincode] = useState(restData && restData[RestaurantDBFields.pincode]);
    const [latitude, setLatitude] = useState(s.region.latitude);
    const [longitude, setLongitude] = useState(s.region.longitude);

    // UseEffects
    useEffect(() => {
        requestLocationPermission();
    }, [])

    // Methods
    const onSelectTimePress = () => {
        setIsTimeModalVisible(true);
    }

    const onImageSelectPress = async () => {
        const granted = await checkPermission(
            Platform.OS == 'ios' ?
                PERMISSIONS.IOS.PHOTO_LIBRARY :
                PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        );
        if (granted) {
            ImageCropPicker.openPicker({
                width: 1080,
                height: 540,
                cropping: true,
                compressImageQuality: 1
            }).then(image => {
                setImage(image.path);
            }).catch((e) => { console.log(e); });
        } else {
            ActionSnackBar('Please allow photo permission from settings.', 'Open', () => { Linking.openSettings() });
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

    const getAddressFromCoordinates = async (latitude, longitude) => {
        try {
            const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const { address } = response.data;
            // console.log(response.data);
            setCity(
                address.city ?
                    address.city :
                    address.state_district ? address.state_district.toString().replace(" District", "") : "")
            setState(address.state);
        } catch (error) {
            console.log('Error retrieving address:', error);
        }
    };

    const onValueChanged = (region) => {
        setStat({ region: region });
        setLatitude(parseFloat(JSON.stringify(region.latitude)));
        setLongitude(parseFloat(JSON.stringify(region.longitude)));
        getAddressFromCoordinates(
            parseFloat(JSON.stringify(region.latitude)),
            parseFloat(JSON.stringify(region.longitude))
        )
    }

    const onSavePress = async () => {
        setLoading(true);
        try {
            const imageUri = image.includes('http') ? image : await uploadImage(restId);

            let data = {};

            data[RestaurantDBFields.restImage] = imageUri;

            restName.trim() && (data[RestaurantDBFields.restaurantName] = restName.trimEnd());
            ownerName.trim() && (data[RestaurantDBFields.ownerName] = ownerName.trimEnd());
            openTime.trim() && (data[RestaurantDBFields.openTime] = openTime);
            closeTime.trim() && (data[RestaurantDBFields.closeTime] = closeTime);
            tables && parseInt(tables) > 0 && (data[RestaurantDBFields.tables] = parseInt(tables));

            address.trim() && (data[RestaurantDBFields.address] = address.trimEnd());
            city.trim() && (data[RestaurantDBFields.city] = city.trimEnd());
            state.trim() && (data[RestaurantDBFields.state] = state.trimEnd());
            pincode.trim() && (data[RestaurantDBFields.pincode] = pincode.trimEnd());
            latitude && longitude && (data[RestaurantDBFields.coordinates] = {
                latitude: latitude,
                longitude: longitude,
            });

            RestaurantDBPath
                .doc(restId)
                .update(data)
                .then(() => {
                    setLoading(false);
                    NormalSnackBar('Details Updated');
                    navigation.pop(1);
                })
        } catch (error) {
            console.log(error);
            NormalSnackBar('Something wents wrong.');
            setLoading(false);
        }
    }

    const uploadImage = async (authId) => {
        try {
            if (image == null) {
                return null
            }
            const uploadUri = image;

            const filename = restName.trimEnd() + ' (' + authId + ')';
            const ext = image.split('/').pop().split('.').pop();

            const refString = `All_Restaurants/${authId}/${filename}.${ext}`;

            const storageRef = storage().ref(refString);
            const task = storageRef.putFile(uploadUri);
            task.on('state_changed', taskSnapshot => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            });
            await task
            const uri = storageRef.getDownloadURL()
            return uri;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    const onResetPositionPress = (_map) => {
        setLatitude(parseFloat(restData.coordinates.latitude));
        setLongitude(parseFloat(restData.coordinates.longitude));
        _map.current.animateToRegion({
            ...stat.region,
            latitude: parseFloat(restData.coordinates.latitude),
            longitude: parseFloat(restData.coordinates.longitude),
        })
    }

    return {
        navigation,
        email,
        contact,

        loading,
        stat,

        image, setImage,

        restName, setRestName,
        ownerName, setOwnerName,
        tables, setTables,
        openTime, setOpenTime,
        closeTime, setCloseTime,
        isTimeModalVisible, setIsTimeModalVisible,

        address, setAddress,
        city, setCity,
        state, setState,
        pincode, setPincode,

        onSelectTimePress,
        onImageSelectPress,
        onValueChanged,
        onSavePress,
        onResetPositionPress,

    };
}

export default useScreenHooks