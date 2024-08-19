import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator,
} from 'react-native';
import CustomDrawerItem from './CustomDrawerItem';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { NavigationScreens, Reducers } from '../../constants/Strings';
import { removeAuthID } from '../../constants/AsyncStorage';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import StarRating from '../../components/StarRating';
import { navigationToNavigate, navigationToReset } from '../../constants/NavigationController';
import { useState } from 'react';
import CustomButton from '../../components/button/CustomButton';
import { NormalSnackBar } from '../../constants/SnackBars';
import { addMonths, format } from 'date-fns';
import { removeRestDataFromRedux, setRestDataInRedux } from '../../redux/RestaurantData/RestDataAction';
import { removeReviewDataFromRedux } from '../../redux/ReviewData/ReviewDataAction';
import { removeMenuDataFromRedux } from '../../redux/MenuData/MenuDataAction';
import { removeCategoryDataFromRedux } from '../../redux/CategoryData/CategoryDataAction';
import { packageActivationAPI } from '../../api/utils';

export default CustomDrawerMenu = (props) => {

    const restdata = useSelector(state => state[Reducers.RestDataReducer]);
    const authId = useSelector(state => state[Reducers.AuthReducer]);

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const Data = [
        {
            id: 1,
            label: "Menu",
            screen: NavigationScreens.AddMenuScreen,
            icon: <MaterialIcons name={'restaurant-menu'} size={22.5} color={COLOR.BLACK} />,
        },
        {
            id: 2,
            label: "Photos",
            screen: NavigationScreens.AddPhotosScreen,
            icon: <MaterialIcons name={'image'} size={22.5} color={COLOR.BLACK} />,
        },
        {
            id: 3,
            label: "Table Bookings",
            screen: NavigationScreens.AllBookingsScreen,
            icon: <MaterialCommunityIcons name={'table-chair'} size={22.5} color={COLOR.BLACK} />,
        },
        {
            id: 4,
            label: "Customer's Reviews",
            screen: NavigationScreens.CustomerReviewsScreen,
            icon: <MaterialIcons name={'rate-review'} size={22.5} color={COLOR.BLACK} />,
        },
        {
            id: 5,
            label: "Logout",
            icon: <MaterialIcons name={'logout'} size={22.5} color={COLOR.BLACK} />,
            action: () => onLogoutPress()
        },
    ]

    const onLogoutPress = () => {
        Alert.alert(
            'Logout',
            'Are you sure, you want to logout ?',
            [
                { text: 'No', onPress: () => { } },
                {
                    text: 'Yes', onPress: async () => {
                        await removeAuthID();
                        dispatch(removeRestDataFromRedux());
                        dispatch(removeReviewDataFromRedux());
                        dispatch(removeMenuDataFromRedux());
                        dispatch(removeCategoryDataFromRedux());
                        auth().signOut().then(navigationToReset(props.navigation, NavigationScreens.LoginScreen))
                    }
                },

            ],
        )
    }

    const onFreeTrialPress = async () => {
        try {
            setLoading(true);

            const params = {
                startDate: format(new Date(), 'yyyy-MM-dd').toString(),
                endDate: format(addMonths(new Date(), 1), 'yyyy-MM-dd').toString(),
            }

            const res = await packageActivationAPI(authId, params);

            if (res?.data && res?.data?.data) {
                props.navigation.closeDrawer();
                NormalSnackBar('Package Activeted');
                dispatch(setRestDataInRedux(res?.data?.data));
            } else {
                NormalSnackBar('Something wents wrong.');
            }
            setLoading(false);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    }

    return (
        <View style={styles.Container}>
            <View style={styles.HeaderContainer}>

                {
                    restdata && restdata['restImage'] &&
                    <FastImage
                        source={{ uri: restdata['restImage'] }}
                        style={styles.HeaderImage}
                        resizeMode='cover'
                    />
                }

                <View style={styles.HeaderDetailsContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.closeDrawer();
                            navigationToNavigate(props.navigation, NavigationScreens.ProfileScreen);
                        }}
                        activeOpacity={1}
                    >
                        <LinearGradient
                            colors={GRADIENTCOLOR.BLACK_40_20}
                            useAngle
                            angle={110}
                            style={styles.LinearGradientStyle}
                        >
                            <View style={styles.DetailsContainer}>
                                <Text
                                    style={styles.RestNameText}
                                    numberOfLines={1}
                                >
                                    {restdata['restaurantName']}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.navigation.closeDrawer();
                                        navigationToNavigate(props.navigation, NavigationScreens.CustomerReviewsScreen);
                                    }}
                                >
                                    <StarRating ratings={restdata['rate']} reviews={restdata['reviews']} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.ProfileButton}>
                                <MaterialIcons name='keyboard-arrow-right' size={20} color={COLOR.WHITE} />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

            {
                Data.map((data, i) => {
                    return (
                        <CustomDrawerItem
                            key={i}
                            label={data.label}
                            icon={data.icon}
                            onPress={() => {
                                props.navigation.closeDrawer();
                                data.screen ? navigationToNavigate(props.navigation, data.screen) : data.action();
                            }}
                        />
                    )
                })
            }

            <View style={styles.BottomButtonContainer}>
                {
                    loading ?
                        <View style={{ alignItems: 'center', padding: 20, }}>
                            <ActivityIndicator color={COLOR.BLACK} size={'small'} />
                        </View>
                        : <>
                            {
                                restdata && restdata['endDate'] == '' &&
                                <CustomButton
                                    onPress={onFreeTrialPress}
                                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                                    text={'1 Month Free Trial'}
                                />
                            }
                            {
                                restdata && restdata['isActive'] == false &&
                                <CustomButton
                                    onPress={() => {
                                        props.navigation.closeDrawer();
                                        navigationToNavigate(props.navigation, NavigationScreens.PackageScreen);
                                    }}
                                    colors={GRADIENTCOLOR.ORANGE}
                                    text={'Active Now'}
                                />
                            }
                        </>
                }
            </View>

            {
                restdata && restdata['endDate'] && restdata['isActive'] == true && !loading &&
                <View style={styles.PackageDetailsContainer}>
                    <Text style={styles.PackageText}>Package Ending Date</Text>
                    <Text style={[styles.PackageText, { fontSize: 15, }]}>{restdata['endDate'] && format(new Date(restdata['endDate']), 'dd MMMM, yyyy')}</Text>
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        height: "100%",
        width: '100%',
        backgroundColor: COLOR.WHITE,
        borderTopRightRadius: 35,
    },
    HeaderContainer: {
        width: '100%',
        aspectRatio: 2 / 1.5,
        borderBottomRightRadius: 15,
        backgroundColor: COLOR.WHITE,
        elevation: 10,
        shadowColor: COLOR.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        paddingRight: 1,
        paddingBottom: 1,
        marginBottom: 20,
        borderTopRightRadius: 35,
        justifyContent: 'flex-end',
    },
    HeaderImage: {
        width: '100%',
        height: '100%',
        borderBottomRightRadius: 15,
        borderTopRightRadius: 34,
        position: 'absolute',
        zIndex: -10,
    },
    HeaderDetailsContainer: {
        width: '100%',
        borderBottomRightRadius: 15,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    LinearGradientStyle: {
        width: '100%',
        borderRadius: 10,
        padding: 15,
        borderColor: COLOR.WHITE_60,
        justifyContent: 'space-between',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    DetailsContainer: {
        flex: 1,
    },
    RestNameText: {
        color: COLOR.WHITE,
        marginBottom: 2,
        fontWeight: 'bold',
    },
    ProfileButton: {
        width: 30,
        height: 30,
        borderRadius: 10,
        backgroundColor: COLOR.WHITE_50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    PackageDetailsContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'flex-end',
    },
    PackageText: {
        color: COLOR.GRAY,
        fontSize: 12,
        marginTop: 5,
    },
    BottomButtonContainer: {
        position: 'absolute',
        padding: 20,
        bottom: 0,
        width: '100%',
    },
})