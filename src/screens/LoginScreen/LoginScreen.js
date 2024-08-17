import {
    Text,
    View,
} from 'react-native'
import React from 'react'
import { keyboardType } from '../../constants/Strings';
import PrimaryButton from '../../components/button/PrimaryButton';
import useScreenHooks from './LoginScreen.Hooks';
import AuthLabel from '../../components/labels/AuthLabel';
import TextButton from '../../components/button/TextButton';
import AuthTextInput from '../../components/input/AuthTextInput';
import AuthScreenTemplate from '../../components/auth/AuthScreenTemplate';
import { styles } from './styles';

const LoginScreen = (props) => {

    const {
        navigation,

        email, setEmail,
        password, setPassword,
        loading, setLoading,

        onLoginPress,
        onRegisterPress,
        onForgotPasswordPress,

    } = useScreenHooks(props);

    return (
        <AuthScreenTemplate>
            <View style={{
                width: '100%'
            }}>
                <AuthLabel
                    title={'Login'}
                    desc={'Welcome back login with your registered restaurant'}
                />

                <View style={{
                    marginTop: 30,
                }}>
                    <AuthTextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType={keyboardType.email_address}
                        placeholder={'Email'}
                    />

                    <AuthTextInput
                        value={password}
                        onChangeText={setPassword}
                        keyboardType={keyboardType.default}
                        isPasswordField
                        placeholder={'Password'}
                        maxLength={30}
                    />

                    <TextButton
                        text={'Forgot Password?'}
                        alignRight
                        onPress={onForgotPasswordPress}
                    />

                    <PrimaryButton
                        isLoading={loading}
                        title={'Login'}
                        style={{
                            marginTop: 50,
                        }}
                        onPress={onLoginPress}
                    />
                </View>
            </View>

            <View style={styles.RegisterButtonContainer}>
                <Text style={styles.RegisterText} >New to Glutton Restaurant?</Text>
                <TextButton
                    text={'Register Now'}
                    onPress={onRegisterPress}
                />
            </View>
        </AuthScreenTemplate>
    )
}

export default LoginScreen
