import {
    View,
    Text,
    FlatList,
} from 'react-native'
import React from 'react'
import { COLOR } from '../../constants/Colors';
import useScreenHooks from './CustomerReviewsScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { styles } from './styles';
import { RatingFilter } from '../../constants/Helper';
import ReviewCard from '../../components/ReviewCard';
import DataFilter from '../../components/DataFilter';

const CustomerReviewsScreen = (props) => {

    const {
        navigation,

        data,
        star,

        filterByStars,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={`Customer's Reviews`}
        >
            <FlatList
                data={data}
                renderItem={
                    ({ item }) => <ReviewCard data={item} />
                }
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.ContentContainer}
                ListHeaderComponent={
                    <DataFilter
                        data={RatingFilter}
                        seleted={star}
                        setSelected={filterByStars}
                        isRating
                        style={{ marginBottom: 10 }}
                        textStyle={{ fontWeight: '700' }}
                    />
                }
                ListEmptyComponent={
                    <View style={styles.Container}>
                        <Text style={{ color: COLOR.GRAY }}>No Review</Text>
                    </View>
                }
            />
        </ScreenHeader>
    )
}

export default CustomerReviewsScreen