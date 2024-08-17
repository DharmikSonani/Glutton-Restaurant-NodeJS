import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    HeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between',
    },
    HeaderGradient: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    HeaderTextStyle: {
        color: COLOR.WHITE,
        fontSize: 13,
        fontWeight: '600',
    },
    Container: {
        flex: 1,
        marginTop: 10,
    },
    ContentContainer: {
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    EmptyText: {
        marginTop: 20,
        color: COLOR.GRAY,
        alignSelf: 'center',
    },
})