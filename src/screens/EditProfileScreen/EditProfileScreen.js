import React, { useRef } from 'react'
import useScreenHooks from './EditProfileScreen.Hooks';
import ScreenHeader from '../../components/ScreenHeader';
import PosterImage from '../../components/PosterImage';
import { ActivityIndicator, Platform, ScrollView, View, } from 'react-native';
import { styles } from './styles';
import { COLOR, GRADIENTCOLOR } from '../../constants/Colors';
import CustomButton from '../../components/button/CustomButton';
import DataDisplayCardBlack from '../../components/DataDisplayCardBlack';
import FieldValuePairInput from '../../components/input/FieldValuePairInput';
import { keyboardType } from '../../constants/Strings';
import MapView from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { MarkerIcon } from '../../constants/Assets';
import { MapStandardStyle } from '../../constants/MapStyle';
import TimeSelectionModal from '../../components/modal/TimeSelectionModal/TimeSelectionModal';

const EditProfileScreen = (props) => {

    const _map = useRef();

    const {
        navigation,
        email,
        contact,

        loading,
        stat,

        image, setImage,

        restName, setRestName,
        ownerName, setOwnerName,
        tables, setTables,
        openTime, setOpenTime,
        closeTime, setCloseTime,
        isTimeModalVisible, setIsTimeModalVisible,

        address, setAddress,
        city, setCity,
        state, setState,
        pincode, setPincode,

        onSelectTimePress,
        onImageSelectPress,
        onValueChanged,
        onSavePress,
        onResetPositionPress,

    } = useScreenHooks(props);

    return (
        <ScreenHeader
            navigation={navigation}
            title={'Edit Details'}
        >
            <ScrollView
                style={styles.Container}
                contentContainerStyle={styles.ContentContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}
            >
                <PosterImage img={image} onPress={onImageSelectPress} />

                <DataDisplayCardBlack title={'Basic Detail'}>
                    <FieldValuePairInput
                        field={'Restaurant Name'}
                        value={restName}
                        onChangeText={setRestName}
                        keyboardType={keyboardType.default}
                    />

                    <FieldValuePairInput
                        field={'Owner Name'}
                        value={ownerName}
                        onChangeText={setOwnerName}
                        keyboardType={keyboardType.default}
                    />

                    <FieldValuePairInput
                        field={'Number of Tables'}
                        value={tables}
                        onChangeText={setTables}
                        keyboardType={keyboardType.numeric}
                        maxLength={2}
                    />

                    <FieldValuePairInput
                        field={'Time'}
                        value={`${openTime} to ${closeTime}`}
                        onPress={onSelectTimePress}
                        style={{ marginBottom: 0, }}
                    />
                </DataDisplayCardBlack>

                <DataDisplayCardBlack title={'Contact Detail'}>
                    <FieldValuePairInput
                        field={'Email'}
                        value={email}
                        editable={false}
                    />

                    <FieldValuePairInput
                        field={'Contact No.'}
                        value={contact}
                        editable={false}
                        style={{ marginBottom: 0, }}
                    />
                </DataDisplayCardBlack>

                <DataDisplayCardBlack title={'Location Detail'}>
                    <FieldValuePairInput
                        field={'Address'}
                        value={address}
                        onChangeText={setAddress}
                        keyboardType={keyboardType.default}
                    />

                    <FieldValuePairInput
                        field={'City'}
                        value={city}
                        editable={false}
                    />

                    <FieldValuePairInput
                        field={'State'}
                        value={state}
                        editable={false}
                    />

                    <FieldValuePairInput
                        field={'Pincode'}
                        value={pincode}
                        onChangeText={setPincode}
                        keyboardType={keyboardType.numeric}
                        maxLength={6}
                    />

                    <View style={[styles.MapContainer, Platform.OS == 'android' && { overflow: 'hidden' }]}>
                        <MapView
                            ref={_map}
                            style={{ flex: 1, borderRadius: 14 }}
                            initialRegion={stat.region}
                            showsUserLocation={true}
                            showsMyLocationButton={true}
                            onRegionChangeComplete={onValueChanged}
                            rotateEnabled={false}
                            customMapStyle={MapStandardStyle}
                        />
                        <FastImage
                            source={MarkerIcon}
                            style={styles.MapMarker}
                            resizeMode='cover'
                        />
                    </View>

                    <CustomButton
                        colors={GRADIENTCOLOR.BLACK_50_100_100_100}
                        text={'Reset Previous Location'}
                        onPress={() => onResetPositionPress(_map)}
                        style={styles.MapResetButton}
                    />
                </DataDisplayCardBlack>

                <CustomButton
                    onPress={onSavePress}
                    colors={GRADIENTCOLOR.ORANGE}
                    text={loading ? 'Saving...' : 'Save'}
                    disabled={loading}
                    style={{ marginTop: 20, }}
                >
                    {loading && <ActivityIndicator size={'small'} color={COLOR.WHITE} />}
                </CustomButton>
            </ScrollView>

            {
                isTimeModalVisible &&
                <TimeSelectionModal
                    openTime={openTime}
                    setOpenTime={setOpenTime}
                    closeTime={closeTime}
                    setCloseTime={setCloseTime}
                    modalVisible={isTimeModalVisible}
                    setModalVisible={setIsTimeModalVisible}
                />
            }
        </ScreenHeader>
    )
}

export default EditProfileScreen