import { Dimensions, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 55,
    },
    ListEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.5,
    },
    HeaderComponentMainContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
    TableHeaderContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: COLOR.BLACK,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 12,
    },
    TableFieldHeaderText: {
        textAlign: 'center',
        color: COLOR.WHITE,
        padding: 5,
        fontSize: 13,
    },
})