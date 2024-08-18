import { useState } from 'react';
import { NavigationScreens } from '../../constants/Strings';
import { useDispatch } from 'react-redux';
import { NormalSnackBar } from '../../constants/SnackBars';
import auth from '@react-native-firebase/auth';
import { emailRegEx } from '../../constants/RegularExpression';
import { storeAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { navigationToNavigate, navigationToReset } from '../../constants/NavigationController';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { checkUserByUIDAPI, getRestaurantbyUIDAPI } from '../../api/utils';

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
                .then(async (res) => {
                    const uid = res.user.uid;
                    const user = await checkUserByUIDAPI(uid);
                    if (user?.data) {
                        if (user?.data?.data) {
                            const type = user.data.data;
                            if (type == 'Restaurant') {
                                await storeAuthID(uid);
                                dispatch(setAuthIDInRedux(uid));
                                const data = await getRestaurantbyUIDAPI(uid);
                                data && data?.data && data?.data?.data && dispatch(setRestDataInRedux(data?.data?.data));
                                navigationToReset(navigation, NavigationScreens.HomeDrawer);
                            } else {
                                auth().signOut();
                                NormalSnackBar(`This email is register as Glutton ${type}`);
                            }
                        }
                        setLoading(false);
                    } else {
                        setLoading(false);
                        NormalSnackBar('Something wents wrong.');
                    }
                })
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