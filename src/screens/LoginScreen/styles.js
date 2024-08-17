import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    RegisterButtonContainer: {
        bottom: 20,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    RegisterText: {
        color: COLOR.WHITE_80,
        fontSize: 12,
        marginLeft: 5,
    },
})