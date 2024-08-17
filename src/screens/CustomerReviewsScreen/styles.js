import { Dimensions, StyleSheet } from 'react-native'
const { height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    ContentContainer: {
        paddingBottom: 5,
        paddingTop: 55,
    },
    Container: {
        height: height * 0.7,
        alignItems: 'center',
        justifyContent: 'center',
    },
})