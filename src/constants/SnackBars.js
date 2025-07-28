import { Platform, ToastAndroid } from "react-native";
import Snackbar from "react-native-snackbar";

export const NormalSnackBar = (msg) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
        return Snackbar.show({
            text: msg,
            duration: Snackbar.LENGTH_SHORT,
        });
    }
}

export const ActionSnackBar = (msg, label, action) => {
    return Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_LONG,
        action: {
            text: label,
            textColor: 'rgba(247,231,215,1)',
            onPress: action,
        },
    });
}