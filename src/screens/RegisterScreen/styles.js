import { Dimensions, StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'


const { width } = Dimensions.get('window');
const Image_Width = (width * 0.80) - 40;
const Image_Height = Image_Width * 0.5;

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    ImageStyle: {
        width: Image_Width,
        height: Image_Height,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: COLOR.WHITE_50,
        borderRadius: 7,
        overflow: 'hidden',
        marginBottom: 10,
    },
    BottomButtonContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 50,
    },
    NoteContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        width: '90%',
        alignSelf: 'center',
    },
    NoteText: {
        color: COLOR.WHITE,
        fontSize: 12,
    },
    NoteDesc: {
        color: COLOR.WHITE_70,
        fontSize: 12,
        marginLeft: 5,
        flex: 1,
    }
})