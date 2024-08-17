import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ContentContainer: {
        padding: 15,
        paddingTop: 55,
    },
    EmptyText: {
        color: COLOR.GRAY,
        fontSize: 14,
    }
})