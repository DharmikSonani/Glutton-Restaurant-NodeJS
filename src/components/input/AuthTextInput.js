import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../../constants/Colors';

const AuthTextInput = ({
    value,
    onChangeText,
    isPasswordField,
    keyboardType,
    placeholder,
    maxLength,
    editable = true,
}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <View style={[styles.Container]}>
            <TextInput
                style={[styles.InputTextStyle, editable == false && { color: COLOR.WHITE_80 }]}
                placeholder={placeholder}
                placeholderTextColor={COLOR.WHITE_60}
                numberOfLines={1}
                keyboardType={keyboardType}
                secureTextEntry={isPasswordField && !passwordVisible}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                editable={editable}
            />
            {
                isPasswordField &&
                <TouchableOpacity
                    style={{ padding: 11 }}
                    onPress={() => { setPasswordVisible(!passwordVisible) }}
                >
                    {
                        passwordVisible ?
                            <Ionicons name='ios-eye' size={17} color={COLOR.WHITE_60} />
                            :
                            <Ionicons name='ios-eye-off' size={17} color={COLOR.WHITE_60} />
                    }
                </TouchableOpacity>
            }
        </View>
    )
}

export default AuthTextInput

const styles = StyleSheet.create({
    Container: {
        borderRadius: 7,
        height: 40,
        marginBottom: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        borderColor: COLOR.WHITE_60,
        borderWidth: 1,
        width: '100%',
    },
    InputTextStyle: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        color: COLOR.WHITE,
        borderRadius: 6,
    },
})