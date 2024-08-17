import {
    View,
} from 'react-native'
import React from 'react'
import useScreenHooks from './ForgotPasswordScreen.Hooks';
import AuthScreenTemplate from '../../components/auth/AuthScreenTemplate';
import AuthLabel from '../../components/labels/AuthLabel';
import AuthTextInput from '../../components/input/AuthTextInput';
import { keyboardType } from '../../constants/Strings';
import PrimaryButton from '../../components/button/PrimaryButton';

const ForgotPasswordScreen = (props) => {

    const {
        navigation,

        email, setEmail,
        loading, setLoading,

        onSendMailPress,

    } = useScreenHooks(props);

    return (
        <AuthScreenTemplate>
            <AuthLabel
                title={'Forgot Password'}
                desc={'Enter your email here, You will receive reset password mail within 5 minutes.'}
            />
            <View style={{ marginTop: 30 }} >
                <AuthTextInput
                    value={email}
                    onChangeText={setEmail}
                    keyboardType={keyboardType.email_address}
                    placeholder={'Email'}
                />
                <PrimaryButton
                    isLoading={loading}
                    title={'Send Mail'}
                    style={{
                        marginTop: 10,
                    }}
                    onPress={onSendMailPress}
                />
            </View>
        </AuthScreenTemplate>
    )
}

export default ForgotPasswordScreen