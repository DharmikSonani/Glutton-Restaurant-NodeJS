import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLOR } from '../constants/Colors';

const SearchView = ({
    value,
    onChangeText,
    style,
    placeholder,
}) => {
    return (
        <View style={[styles.SearchView, style && style]}>

            <FontAwesome name='search' size={15} color={COLOR.BLACK_30} />

            <TextInput
                placeholder={placeholder}
                style={styles.Search}
                placeholderTextColor={COLOR.GRAY}
                onChangeText={onChangeText}
                value={value}
            />
            {
                value.length > 0 &&
                <TouchableOpacity
                    style={{ paddingHorizontal: 15, height: '100%', justifyContent: 'center' }}
                    onPress={() => { onChangeText(''); }}>
                    <Ionicons name='ios-close' size={20} color={COLOR.BLACK} />
                </TouchableOpacity>
            }
        </View>
    )
}

export default SearchView

const styles = StyleSheet.create({
    SearchView: {
        backgroundColor: COLOR.BORDERCOLOR,
        flex: 1,
        marginBottom: 0,
        borderRadius: 15,
        flexDirection: 'row',
        maxHeight: 40,
        marginHorizontal: 15,
        paddingLeft: 15,
        alignItems: 'center',
    },
    Search: {
        flex: 1,
        color: COLOR.BLACK,
        marginLeft: 10,
        height: '100%',
        fontSize: 13,
    },
})