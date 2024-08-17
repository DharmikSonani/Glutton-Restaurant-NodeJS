import {
    ScrollView,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './ProfileScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { styles } from './styles';
import PosterImage from '../../components/PosterImage';
import DataDisplayCardBlack from '../../components/DataDisplayCardBlack';
import FieldValuePairLabel from '../../components/labels/FieldValuePairLabel';
import { RestaurantDBFields } from '../../constants/Database';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ProfileScreen = (props) => {

    const {
        navigation,
        restData,

        onEditProfilePress,
    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Details'}
            onRightPress={onEditProfilePress}
            rightButtonIcon={<Fontisto name={'player-settings'} size={25} color={COLOR.BLACK} />}
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <PosterImage img={restData.restImage} />

                <DataDisplayCardBlack title={'Basic Detail'}>
                    <FieldValuePairLabel
                        field={'Restaurant Name'}
                        value={restData[RestaurantDBFields.restaurantName]}
                    />
                    <FieldValuePairLabel
                        field={'Owner Name'}
                        value={restData[RestaurantDBFields.ownerName]}
                    />
                    <FieldValuePairLabel
                        field={'Number of Tables'}
                        value={restData[RestaurantDBFields.tables]}
                    />
                    <FieldValuePairLabel
                        field={'Time'}
                        value={`${restData[RestaurantDBFields.openTime]} to ${restData[RestaurantDBFields.closeTime]}`}
                        style={{ marginBottom: 0 }}
                    />
                </DataDisplayCardBlack>

                <DataDisplayCardBlack title={'Contact Detail'}>
                    <FieldValuePairLabel
                        field={'Email'}
                        value={restData[RestaurantDBFields.email]}
                    />
                    <FieldValuePairLabel
                        field={'Contact No.'}
                        value={`+91 ${restData[RestaurantDBFields.contactNo]}`}
                        style={{ marginBottom: 0 }}
                    />
                </DataDisplayCardBlack>

                <DataDisplayCardBlack title={'Location Detail'}>
                    <FieldValuePairLabel
                        field={'Address'}
                        value={restData[RestaurantDBFields.address]}
                    />
                    <FieldValuePairLabel
                        field={'City'}
                        value={restData[RestaurantDBFields.city]}
                    />
                    <FieldValuePairLabel
                        field={'State'}
                        value={restData[RestaurantDBFields.state]}
                    />
                    <FieldValuePairLabel
                        field={'Pincode'}
                        value={restData[RestaurantDBFields.pincode]}
                        style={{ marginBottom: 0 }}
                    />
                </DataDisplayCardBlack>
            </ScrollView>
        </ScreenHeader>
    )
}

export default ProfileScreen