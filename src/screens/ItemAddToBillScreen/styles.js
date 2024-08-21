import { StyleSheet } from 'react-native'
import { COLOR } from '../../constants/Colors'

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },
    ContentContainer: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    ListEmptyText: {
        margin: 20,
        color: COLOR.GRAY,
        alignSelf: 'center',
    },
    ItemCard: {
        padding: 15,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: COLOR.WHITE,
        elevation: 2,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        margin: 5,
    },
    ItemNameText: {
        color: COLOR.BLACK,
        fontSize: 14
    },
    ItemCategoryText: {
        color: COLOR.GRAY,
        fontSize: 11,
    },
})