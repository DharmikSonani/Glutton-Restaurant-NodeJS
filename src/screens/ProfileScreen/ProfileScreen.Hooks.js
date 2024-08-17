import { useSelector } from 'react-redux';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { navigationToNavigate } from '../../constants/NavigationController';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;
    const restData = useSelector(state => state[Reducers.RestDataReducer]);

    // UseStates


    // UseEffects


    // Methods
    const onEditProfilePress = () => {
        navigationToNavigate(navigation, NavigationScreens.EditProfileScreen);
    }

    return {
        navigation,
        restData,

        onEditProfilePress,

    };
}

export default useScreenHooks