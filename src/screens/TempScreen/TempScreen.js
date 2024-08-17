import {
    View,
    StatusBar
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './TempScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';

const TempScreen = (props) => {

    const {
        navigation,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={''}
        >

        </ScreenHeader>
    )
}

export default TempScreen