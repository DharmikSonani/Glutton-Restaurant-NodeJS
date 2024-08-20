import { StyleSheet, Text, View, } from 'react-native'
import React, { memo } from 'react'
import StarRating from './StarRating';
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import moment from 'moment';

const ReviewCard = ({ data }) => {
    const userName = data?.userId?.userName;
    const userImg = data?.userId?.userImg;
    const time = data?.createdAt && moment(new Date(data?.createdAt)).fromNow().toString();

    return (
        <View style={[styles.Container]}>
            <View style={styles.HeaderContainer}>
                {
                    userImg ?
                        <FastImage
                            source={{ uri: userImg }}
                            style={styles.ProfileImage}
                        />
                        :
                        <LinearGradient
                            colors={GRADIENTCOLOR.ORANGE}
                            style={styles.ProfileImage}
                            angle={160}
                            useAngle
                        >
                            <Text style={styles.ProfileChar}>{userName ? userName.charAt(0) : 'G'}</Text>
                        </LinearGradient>
                }

                <View style={styles.HeaderRightContainer}>
                    <Text
                        style={styles.UserNameText}
                        numberOfLines={1}>
                        {userName ? userName : 'Glutton User'}
                    </Text>
                    {
                        time &&
                        <Text style={styles.TimeText}>
                            {time}
                        </Text>
                    }
                </View>
            </View>
            <View style={styles.ContentContainer}>
                <StarRating ratings={data['rating']} />
                <Text
                    style={styles.ContentText}
                >
                    {data['review']}
                </Text>
            </View>
        </View>
    )
}

export default memo(ReviewCard)

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        marginBottom: 10,
        marginHorizontal: 15,
        backgroundColor: COLOR.WHITE,
        borderRadius: 10,
        padding: 15,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 1,
        elevation: 2,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowColor: COLOR.BLACK,
    },
    HeaderContainer: {
        flexDirection: 'row',
    },
    ProfileImage: {
        width: 40,
        aspectRatio: 1 / 1,
        borderRadius: 50,
        borderColor: COLOR.BORDERCOLOR,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ProfileChar: {
        fontSize: 20,
        color: COLOR.WHITE,
        fontWeight: 'bold',
    },
    HeaderRightContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },
    UserNameText: {
        color: COLOR.BLACK,
        fontSize: 15,
        width: '100%',
    },
    TimeText: {
        color: COLOR.GRAY,
        fontSize: 12,
        marginTop: 2,
    },
    ContentContainer: {
        marginTop: 5,
    },
    ContentText: {
        fontSize: 12,
        color: COLOR.BLACK,
        marginTop: 5,
    },
})