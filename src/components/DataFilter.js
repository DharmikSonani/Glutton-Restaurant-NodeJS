import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLOR } from '../constants/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

const DataFilter = ({
    data,
    seleted,
    setSelected,
    isRating,
    textStyle,
    style,
}) => {
    return (
        <ScrollView
            horizontal
            style={[styles.Container, style && style]}
            contentContainerStyle={styles.ContentContainer}
            showsHorizontalScrollIndicator={false}
        >
            {
                data.map((item, i) => {
                    return (
                        <TouchableOpacity
                            key={i}
                            onPress={() => { setSelected(item); }}
                            style={[styles.Button, { backgroundColor: seleted == item ? COLOR.BLACK : COLOR.BORDERCOLOR, }]}
                            activeOpacity={1}
                        >
                            <Text style={[styles.TextStyle, textStyle && textStyle, {
                                color: seleted == item ? COLOR.WHITE : COLOR.BLACK,
                            }]}>
                                {item}
                            </Text>
                            {item != "All" && isRating && <Ionicons name={"star"} size={12} style={{ marginLeft: 5, }} color={seleted == item ? COLOR.WHITE : COLOR.BLACK} />}
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    )
}

export default DataFilter

const styles = StyleSheet.create({
    Container: {
        flexGrow: 0,
    },
    ContentContainer: {
        paddingHorizontal: 12.5,
    },
    Button: {
        paddingHorizontal: 20,
        marginHorizontal: 2.5,
        borderRadius: 13,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    TextStyle: {
        fontSize: 13,
    },
})