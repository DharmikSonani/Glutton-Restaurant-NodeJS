import { Dimensions, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    Container: {
        paddingHorizontal: 15,
        paddingBottom: 15,
        paddingTop: 55,
    },
    HeaderComponentContainer: {
        backgroundColor: COLOR.WHITE,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        elevation: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        alignSelf: 'flex-end',
    },
    HeaderComponentGradient: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 1,
        borderColor: COLOR.BORDERCOLOR,
    },
    HeaderComponentText: {
        color: COLOR.WHITE,
    },
    ListEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.7,
    },
    ListEmptyText: {
        color: COLOR.BLACK_60,
    },
})