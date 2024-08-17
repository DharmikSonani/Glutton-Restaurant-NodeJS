import { StyleSheet, Text, View, } from 'react-native'
import React, { useState, useEffect, memo } from 'react'
import firestore from '@react-native-firebase/firestore';
import StarRating from './StarRating';
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image';
import { COLOR, GRADIENTCOLOR } from '../constants/Colors';
import { RatingDBFields } from '../constants/Database';
import moment from 'moment';

const ReviewCard = ({ data }) => {
    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState('');

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            firestore()
                .collection("Users")
                .doc("Customers")
                .collection("Customers")
                .doc(data.userId)
                .onSnapshot((querySnap) => {
                    setUserName(querySnap.data().userName);
                    setUserImg(querySnap.data().userImg);
                })
        } catch (e) {
            console.log(e);
        }
    }

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
                        data.timeStamp &&
                        <Text style={styles.TimeText}>
                            {moment(new Date(data.timeStamp)).fromNow()}
                        </Text>
                    }
                </View>
            </View>
            <View style={styles.ContentContainer}>
                <StarRating ratings={data[RatingDBFields.rating]} />
                <Text
                    style={styles.ContentText}
                >
                    {data[RatingDBFields.review]}
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