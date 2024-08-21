import React from 'react'
import useScreenHooks from './HomeScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import QRCodeScannerModal from '../../components/modal/QRScannerModal/QRCodeScannerModal';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import TableAllocationModal from '../../components/modal/TableAllocationModal';
import BookingCardForHome from '../../components/BookingCardForHome';
import { styles } from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = (props) => {

    const {
        navigation,
        restData,

        selectedBooking,
        bookings,
        isQRScannerModalVisible, setIsQRScannerModalVisible,
        isTableModelVisible, setIsTableModelVisible,
        loading,

        goToNextScreen,

    } = useScreenHooks(props);

    const HeaderComponent = () => {
        return (
            <View style={styles.HeaderComponentContainer}>
                <LinearGradient
                    colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                    style={styles.HeaderComponentGradient}
                    angle={160}
                    useAngle
                >
                    <Text style={styles.HeaderComponentText}>
                        {bookings.length + " "}Bookings for Today
                    </Text>
                </LinearGradient>
            </View>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={styles.ListEmptyContainer}>
                {
                    loading ?
                        <ActivityIndicator size={'small'} color={COLOR.BLACK} />
                        :
                        <Text style={styles.ListEmptyText}>No Bookings for Today</Text>
                }
            </View>
        )
    }

    return (
        <ScreenHeader
            navigation={navigation}
            isDashboard
            title={restData['restaurantName']}
            onRightPress={() => { setIsQRScannerModalVisible(true) }}
            rightButtonIcon={<MaterialCommunityIcons name={'qrcode-scan'} size={25} color={COLOR.BLACK} />}
        >
            <FlatList
                data={bookings}
                bounces={false}
                renderItem={({ item }) =>
                    <BookingCardForHome
                        data={item}
                        onPress={goToNextScreen}
                    />
                }
                keyExtractor={item => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.Container}
                ListHeaderComponent={HeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
            />

            <QRCodeScannerModal
                modalVisible={isQRScannerModalVisible}
                setModalVisible={setIsQRScannerModalVisible}
            />

            <TableAllocationModal
                data={selectedBooking}
                modalVisible={isTableModelVisible}
                setModalVisible={setIsTableModelVisible}
                navigation={navigation}
            />

        </ScreenHeader>
    )
}

export default HomeScreen