import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

export const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
        const locationPermissionStatus = await Geolocation.requestAuthorization(
            'whenInUse',
        );

        const locationGranted = locationPermissionStatus === 'granted' || locationPermissionStatus === 'restricted';

        if (locationGranted) {
            return true;
        }
    } else {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            } else {
                requestLocationPermission();
            }
        } catch (err) {
            console.warn(err)
        }
    }
}