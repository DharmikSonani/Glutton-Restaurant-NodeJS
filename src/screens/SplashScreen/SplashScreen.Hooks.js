import { useDispatch } from 'react-redux';
import { NavigationScreens } from '../../constants/Strings';
import { getAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { useEffect } from 'react';
import { navigationToReplace } from '../../constants/NavigationController';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { getRestaurantbyUIDAPI } from '../../api/utils';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const dispatch = useDispatch();

    // UseStates


    // UseEffects
    useEffect(() => {
        getFromStorage();
    }, [])

    // Methods
    const getFromStorage = async () => {
        const authId = await getAuthID();
        authId && fetchRestData(authId);
        setTimeout(() => {
            if (authId) {
                dispatch(setAuthIDInRedux(authId));
                navigationToReplace(navigation, NavigationScreens.HomeDrawer);
            } else {
                navigationToReplace(navigation, NavigationScreens.LoginScreen);
            }
        }, 2000);
    }

    const fetchRestData = async (uid) => {
        try {
            const res = await getRestaurantbyUIDAPI(uid);
            res && res?.data && res?.data?.data && dispatch(setRestDataInRedux(res?.data?.data));
        } catch (e) {
            console.log(e);
        }
    }

    return {};
}

export default useScreenHooks