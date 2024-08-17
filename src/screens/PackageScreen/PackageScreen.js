import React from 'react'
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import useScreenHooks from './PackageScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import PackageCard from '../../components/PackageCard';
import LinearGradient from 'react-native-linear-gradient';
import { headerBackgroundContainerStyle } from '../../constants/Styles';
import { styles } from './styles';
import PaymentConfirmModal from '../../components/modal/PaymentConfirmModal';

const PackageScreen = (props) => {

    const {
        navigation,
        restId,

        packages, setPackages,
        selectedPackage, setSelectedPackage,
        isConfirmModalVisible, setIsConfirmModalVisible,
        loading, setLoading,

        onPayNowPress,
        onPaymentSuccess,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Packages'}
        >
            {
                loading ?
                    <View style={[styles.Center]}>
                        <ActivityIndicator color={COLOR.BLACK} size={'small'} />
                    </View>
                    :
                    <FlatList
                        data={packages}
                        renderItem={({ item }) =>
                            <PackageCard
                                data={item}
                                selectedPackage={selectedPackage}
                                onSelect={setSelectedPackage}
                            />
                        }
                        keyExtractor={item => item.duration}
                        showsVerticalScrollIndicator={false}
                        style={styles.Container}
                        contentContainerStyle={styles.ContentContainer}
                    />
            }

            <View style={[styles.BottomContainer, headerBackgroundContainerStyle]}>
                <Text style={styles.PriceText}>₹ {selectedPackage.price && parseFloat(selectedPackage.price).toFixed(2)}</Text>

                <TouchableOpacity
                    style={styles.PayNowButton}
                    onPress={onPayNowPress}
                >
                    <LinearGradient
                        colors={GRADIENTCOLOR.ORANGE}
                        style={styles.GradientStyle}
                        angle={150}
                        useAngle
                    >
                        <Text style={styles.PayNowButtonText}>Pay Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <PaymentConfirmModal
                restId={restId}
                data={selectedPackage}
                modalVisible={isConfirmModalVisible}
                setModalVisible={setIsConfirmModalVisible}
                onSuccess={onPaymentSuccess}
            />
        </ScreenHeader>
    )
}

export default PackageScreen