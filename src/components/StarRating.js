import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOR } from '../constants/Colors';

const StarRating = ({ reviews, ratings }) => {

    let stars = [];

    for (var i = 1; i <= 5; i++) {

        let name = 'ios-star';

        if (i > ratings) {
            name = 'ios-star-outline';
        }

        stars.push((<Ionicons name={name} size={14} style={styles.star} key={i} />));
    }

    return (
        <View style={styles.container}>
            {stars}
            <Text style={styles.text} numberOfLines={1}>({reviews})</Text>
        </View>
    );

}

export default StarRating;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    star: {
        color: COLOR.RATING,
        marginHorizontal: 1,
    },
    text: {
        fontSize: 11,
        marginLeft: 5,
        color: COLOR.WHITE,
        flex: 1,
    }
});