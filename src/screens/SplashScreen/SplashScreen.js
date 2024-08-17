import {
    View,
    StatusBar
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './SplashScreen.Hooks';
import FastImage from 'react-native-fast-image';
import { BackgroundImage, BackgroundVideo } from '../../constants/Assets';
import Video from 'react-native-video'
import { styles } from './styles';

const SplashScreen = (props) => {

    const { } = useScreenHooks(props);

    return (
        <View style={styles.Container}>
            <StatusBar
                backgroundColor={COLOR.TRANSPARANT}
                translucent={true}
                barStyle={'light-content'}
            />
            <FastImage
                source={BackgroundImage}
                style={styles.BackgroundImage}
            />
            <Video
                style={styles.Container}
                source={BackgroundVideo}
                resizeMode='cover'
                repeat
                muted
            />
        </View>
    )
}

export default SplashScreen