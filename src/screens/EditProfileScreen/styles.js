import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingHorizontal: 15,
        paddingTop: 55,
        paddingBottom: 15,
    },
    MapContainer: {
        width: '100%',
        aspectRatio: 2 / 1.5,
        alignSelf: 'center',
        borderRadius: 15,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        backgroundColor: COLOR.WHITE,
        elevation: 2,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    MapMarker: {
        top: '50%',
        left: "50%",
        marginLeft: -15,
        marginTop: -27.5,
        position: 'absolute',
        height: 30,
        width: 30,
    },
    MapResetButton: {
        width: 'auto',
        alignSelf: 'flex-end',
    },
})