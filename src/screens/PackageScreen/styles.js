import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingTop: 55,
        paddingHorizontal: 15,
        paddingBottom: 95,
    },
    Center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40,
    },
    BottomContainer: {
        padding: 20,
        paddingBottom: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    PriceText: {
        color: COLOR.BLACK,
        fontSize: 25,
        flex: 1,
        fontWeight: '600',
        textAlign: 'center',
    },
    PayNowButton: {
        borderRadius: 13,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    GradientStyle: {
        alignItems: 'center',
        borderRadius: 13,
        padding: 15,
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: COLOR.ORANGE,
        borderColor: COLOR.WHITE,
    },
    PayNowButtonText: {
        color: COLOR.WHITE,
        fontSize: 14,
        fontWeight: '600',
    },
})