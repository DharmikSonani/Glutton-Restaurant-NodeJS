import { useDispatch } from 'react-redux';
import { NavigationScreens } from '../../constants/Strings';
import { getAuthID } from '../../constants/AsyncStorage';
import { setAuthIDInRedux } from '../../redux/Authentication/AuthAction';
import { useEffect } from 'react';
import { navigationToReplace } from '../../constants/NavigationController';
import { RestaurantDBFields, RestaurantDBPath } from '../../constants/Database';
import { convertTimeStampToDate } from '../../constants/Helper';
import { setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';

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

    const fetchRestData = (authId) => {
        try {
            RestaurantDBPath
                .doc(authId)
                .onSnapshot(async (querySnap) => {
                    if (querySnap.exists) {
                        const data = querySnap.data();
                        data[RestaurantDBFields.createdAt] = convertTimeStampToDate(data[RestaurantDBFields.createdAt]);
                        dispatch(setRestDataInRedux(data));
                    }
                })
        } catch (e) {
            console.log(e);
        }
    }

    return {};
}

export default useScreenHooks