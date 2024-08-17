import { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NormalSnackBar } from '../../constants/SnackBars';
import { emailRegEx } from '../../constants/RegularExpression';

const useScreenHooks = (props) => {

    // Variables
    const navigation = props.navigation;

    // UseStates
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // UseEffects


    // Methods
    const onSendMailPress = () => {
        if (!emailRegEx.test(email)) {
            NormalSnackBar('Invalid email.');
            return;
        }
        setLoading(true);
        try {
            auth()
                .sendPasswordResetEmail(email)
                .then(() => {
                    NormalSnackBar('Mail Sended Successfully. Please check your mail.');
                    navigation.pop(1);
                })
                .catch((e) => {
                    console.log(e);
                    if (e.code == 'auth/user-not-found') {
                        NormalSnackBar('This email not register with Glutton.');
                    }
                    if (e.code == 'auth/too-many-requests') {
                        NormalSnackBar('Please try sometimes later.');
                    }
                    setLoading(false);
                })
        } catch (e) { }
    }

    return {
        navigation,

        email, setEmail,
        loading, setLoading,

        onSendMailPress,
    };
}

export default useScreenHooks