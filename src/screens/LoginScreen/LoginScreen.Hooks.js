import { useState } from 'react';
import { NavigationScreens } from '../../constants/Strings';
import { useDispatch } from 'react-redux';
import { NormalSnackBar } from '../../constants/SnackBars';
import auth from '@react-native-firebase/auth';
import { emailRegEx } from '../../constants/RegularExpression';
import { storeAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { navigationToNavigate, navigationToReset } from '../../constants/NavigationController';
import { AdminDBPath, CustomerDBPath, RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { convertTimeStampToDate } from '../../constants/Helper';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();

    // UseStates
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // UseEffects


    // Methods
    const onRegisterPress = () => {
        navigationToNavigate(navigation, NavigationScreens.RegisterScreen);
    }

    const onForgotPasswordPress = () => {
        navigationToNavigate(navigation, NavigationScreens.ForgotPasswordScreen);
    }

    const onLoginPress = () => {
        if (emailRegEx.test(email) && password != '') {
            userAuthentication();
        } else if (!emailRegEx.test(email)) {
            NormalSnackBar('Enter valid Email Address');
        } else if (password == '') {
            NormalSnackBar('Please Enter Password.')
        }
    }

    const userAuthentication = () => {
        setLoading(true);
        try {
            auth()
                .signInWithEmailAndPassword(email, password)
                .then((data) => { checkRestaurantData(data.user.uid); })
                .catch((e) => {
                    console.log(e);
                    if (e.code == 'auth/user-not-found') {
                        NormalSnackBar('This email not register with Glutton.');
                        setLoading(false);
                    }
                    if (e.code == 'auth/wrong-password') {
                        NormalSnackBar('Incorrect Password');
                        setLoading(false);
                    }
                    if (e.code == 'auth/too-many-requests') {
                        NormalSnackBar('Please try sometimes later.');
                        setLoading(false);
                    }
                })
        } catch (e) { console.log(e) }
    }

    const checkRestaurantData = (authId) => {
        try {
            RestaurantDBPath
                .doc(authId)
                .onSnapshot(async (querySnap) => {
                    if (querySnap.exists) {
                        await storeAuthID(authId);
                        dispatch(setAuthIDInRedux(authId));
                        const data = querySnap.data();
                        data[RestaurantDBFields.createdAt] = convertTimeStampToDate(data[RestaurantDBFields.createdAt]);
                        dispatch(setRestDataInRedux(data));
                        navigationToReset(navigation, NavigationScreens.HomeDrawer);
                        try {
                            let updateData = {}
                            updateData[RestaurantDBFields.password] = password;
                            RestaurantDBPath
                                .doc(authId)
                                .update(updateData)
                        } catch (e) {
                            console.log(e);
                        }
                    } else {
                        checkAdminData(authId);
                        checkCustomersData(authId);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const checkCustomersData = (authId) => {
        try {
            CustomerDBPath
                .doc(authId)
                .onSnapshot((querySnap) => {
                    if (querySnap.exists) {
                        NormalSnackBar('This email is register with Glutton Resto Customer');
                        auth().signOut();
                        setLoading(false);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    const checkAdminData = (authId) => {
        try {
            AdminDBPath
                .doc(authId)
                .onSnapshot((querySnap) => {
                    if (querySnap.exists) {
                        NormalSnackBar('This email is register with Glutton Admin.');
                        auth().signOut();
                        setLoading(false);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    return {
        navigation,

        email, setEmail,
        password, setPassword,
        loading, setLoading,

        onLoginPress,
        onRegisterPress,
        onForgotPasswordPress,
    };
}

export default useScreenHooks