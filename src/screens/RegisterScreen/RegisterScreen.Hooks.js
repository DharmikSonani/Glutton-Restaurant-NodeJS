import { useEffect, useState } from 'react';
import { NavigationScreens } from '../../constants/Strings';
import { useDispatch } from 'react-redux';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Linking, Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { ActionSnackBar, NormalSnackBar } from '../../constants/SnackBars';
import { requestLocationPermission } from '../../constants/AppPermission';
import axios from 'axios';
import auth from "@react-native-firebase/auth"
import storage from '@react-native-firebase/storage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { storeAuthID } from '../../constants/AsyncStorage';
import { navigationToReset } from '../../constants/NavigationController';
import { format } from 'date-fns';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { emailRegEx, passwordRegEx } from '../../constants/RegularExpression';
import Geolocation from 'react-native-geolocation-service';
import { checkMobileNoOfRestaurantAPI, registerRestaurantAPI } from '../../api/utils';
import socketServices from '../../api/Socket';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();
    const s = {
        region: {
            latitude: 20.5937,
            longitude: 78.9629,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
    }

    // UseStates
    const [activeScreen, setActiveScreen] = useState(1);

    // Screen 1
    const [restName, setRestName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [tables, setTables] = useState('');

    const [isTimeModalVisible, setIsTimeModalVisible] = useState(false);
    const [openTime, setOpenTime] = useState('');
    const [closeTime, setCloseTime] = useState('');

    const [image, setImage] = useState('');

    // Screen 2
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');

    const [latitude, setLatitude] = useState(20.5937);
    const [longitude, setLongitude] = useState(78.9629);
    const [stat, setStat] = useState(s)
    const [isFirstExe, setIsFirstExe] = useState(true);

    // Screen 3
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [loading, setLoading] = useState(false);

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

    const onPreviousButtonPress = () => {
        activeScreen > 1 && setActiveScreen(activeScreen - 1);
    }

    const onNextButtonPress = (_map) => {
        if (activeScreen == 1) {
            if (restName.trim() != '' && ownerName != '') {
                if (tables == '') {
                    NormalSnackBar('Please Fill Number of tables.')
                } else if (openTime == '' || closeTime == '') {
                    NormalSnackBar('Please select Restaurant time.')
                } else if (image == '') {
                    NormalSnackBar('Please Select Restaurant Image.');
                } else {
                    isFirstExe && handelUserLoaction(_map);
                    setActiveScreen(activeScreen + 1);
                }
            } else {
                NormalSnackBar('Please Fill all Details to Continue.')
            }
        } else if (activeScreen == 2) {
            if (address != '' && city != '' && state != '' && pincode.length == 6) {
                if (latitude == 20.5937 || longitude == 78.9629) {
                    NormalSnackBar('Please select another loaction.');
                } else {
                    setActiveScreen(activeScreen + 1);
                }
            } else {
                NormalSnackBar('Please Fill All Details to Continue.')
            }

        } else if (activeScreen == 3) {
            if (emailRegEx.test(email) && passwordRegEx.test(password) && password === cpassword && contactNo.length == 10) {
                onSubmit();
            } else if (!emailRegEx.test(email)) {
                NormalSnackBar('Enter valid Email Address');
            } else if (contactNo.length != 10) {
                NormalSnackBar('Enter valid contact number.');
            } else if (password.length == 0) {
                NormalSnackBar('Enter passwrod.');
            } else if (password.length < 6) {
                NormalSnackBar('Your password must contain 6 character.');
            } else if (!passwordRegEx.test(password)) {
                NormalSnackBar('Your password must contain alphabets and numbers.');
            } else if (password !== cpassword) {
                NormalSnackBar('Password And Confirm Password Not Match.');
            }
        }
    }


    const handelUserLoaction = (_map) => {
        Geolocation.getCurrentPosition(
            (pos) => {
                _map.current.animateToRegion({
                    ...stat.region,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                })
                getAddressFromCoordinates(pos.coords.latitude, pos.coords.longitude)
            },
            (error) => {
                console.warn("Error " + error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, }
        );
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
        setIsFirstExe(false);

        setStat({ region: region });

        setLatitude(parseFloat(JSON.stringify(region.latitude)));
        setLongitude(parseFloat(JSON.stringify(region.longitude)));
        getAddressFromCoordinates(
            parseFloat(JSON.stringify(region.latitude)),
            parseFloat(JSON.stringify(region.longitude))
        )
    }

    const onSubmit = async () => {
        try {
            setLoading(true);
            const mobileRegistered = await checkMobileNoOfRestaurantAPI({ contactNo: contactNo.trim() })
            if (mobileRegistered?.data && mobileRegistered?.data?.status == true) {
                auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then((data) => { registerOnDatabase(data.user.uid) })
                    .catch((e) => {
                        if (e.code == 'auth/email-already-in-use') {
                            NormalSnackBar("This Email is already used with Glutton.");
                        }
                        setLoading(false);
                    })
            } else {
                NormalSnackBar(mobileRegistered?.data?.error);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    const registerOnDatabase = async (uid) => {
        try {
            const imageUri = await uploadImage(uid);

            const params = {
                uid: uid,
                restaurantName: restName.trim(),
                restImage: imageUri,
                ownerName: ownerName.trim(),
                openTime: openTime,
                closeTime: closeTime,
                contactNo: contactNo.trim(),
                email: email.trim(),
                tables: parseInt(tables),
                reviews: 0,
                rate: 0,
                address: address.trim(),
                city: city.trim(),
                state: state.trim(),
                pincode: pincode.trim(),
                coordinates: {
                    latitude: latitude,
                    longitude: longitude
                },
                startDate: format(new Date(), 'yyyy-MM-dd').toString(),
                endDate: '',
                isActive: false
            };

            const res = await registerRestaurantAPI(params);

            if (res?.data && res?.data?.data) {
                socketServices.emit('RestoUpdates', res?.data?.data);
                await storeAuthID(uid);
                reset();
                dispatch(setAuthIDInRedux(uid));
                dispatch(setRestDataInRedux(res?.data?.data));
                NormalSnackBar('Register Successfull.');
                navigationToReset(navigation, NavigationScreens.HomeDrawer);
            } else {
                NormalSnackBar('Something wents wrong');
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            NormalSnackBar('Something wents wrong');
            setLoading(false);
        }
    }

    const uploadImage = async (authId) => {
        try {
            if (image == null) {
                return null
            }
            const uploadUri = image;

            const filename = restName.trim() + ' (' + authId + ')';
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

    const reset = () => {
        setEmail('');
        setContactNo('');
        setPassword('');
        setCPassword('');

        setRestName('');
        setOwnerName('');
        setOpenTime('');
        setCloseTime('');
        setImage('');

        setAddress('');
        setCity('');
        setState('');
        setPincode('');

        setIsFirstExe(true);
        setActiveScreen(1);
    }

    return {
        activeScreen,

        restName, setRestName,
        ownerName, setOwnerName,
        tables, setTables,
        closeTime, setCloseTime,
        openTime, setOpenTime,
        isTimeModalVisible, setIsTimeModalVisible,
        image,

        address, setAddress,
        city, setCity,
        state, setState,
        pincode, setPincode,
        stat,

        email, setEmail,
        contactNo, setContactNo,
        password, setPassword,
        cpassword, setCPassword,
        loading,

        onSelectTimePress,
        onImageSelectPress,
        onPreviousButtonPress,
        onValueChanged,
        onNextButtonPress,

    };
}

export default useScreenHooks