import {
    Text,
    View,
} from 'react-native'
import React, { useRef } from 'react'
import useScreenHooks from './RegisterScreen.Hooks';
import AuthScreenTemplate from '../../components/auth/AuthScreenTemplate';
import AuthLabel from '../../components/labels/AuthLabel';
import AuthTextInput from '../../components/input/AuthTextInput';
import { keyboardType } from '../../constants/Strings';
import AuthTimeInputButton from '../../components/input/AuthTimeInputButton';
import TimeSelectionModal from '../../components/modal/TimeSelectionModal/TimeSelectionModal';
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import PrimaryButton from '../../components/button/PrimaryButton';
import MapView from 'react-native-maps';
import { MarkerIcon } from '../../constants/Assets';
import { MapStandardStyle } from '../../constants/MapStyle';

const RegisterScreen = (props) => {

    const _map = useRef();

    const {
        activeScreen,

        restName, setRestName,
        ownerName, setOwnerName,
        tables, setTables,
        closeTime, setCloseTime,
        openTime, setOpenTime,
        isTimeModalVisible, setIsTimeModalVisible,
        image,

        address, setAddress,
        city, setCity,
        state, setState,
        pincode, setPincode,
        stat,

        email, setEmail,
        contactNo, setContactNo,
        password, setPassword,
        cpassword, setCPassword,
        loading,

        onSelectTimePress,
        onImageSelectPress,
        onPreviousButtonPress,
        onValueChanged,
        onNextButtonPress,

    } = useScreenHooks(props);


    return (
        <AuthScreenTemplate>
            <View style={styles.Container}>
                {
                    activeScreen == 1 &&
                    <>
                        <AuthLabel
                            title={'Registration'}
                            desc={'Here, Register your restaurant general details.'}
                        />
                        <View style={{ marginTop: 20, width: '100%' }}>
                            <AuthTextInput
                                value={restName}
                                onChangeText={setRestName}
                                placeholder={'Restaurant Name'}
                                keyboardType={keyboardType.default}
                            />
                            <AuthTextInput
                                value={ownerName}
                                onChangeText={setOwnerName}
                                placeholder={'Owner Name'}
                                keyboardType={keyboardType.default}
                            />
                            <AuthTextInput
                                value={tables}
                                onChangeText={setTables}
                                placeholder={'Number of Tables'}
                                keyboardType={keyboardType.numeric}
                                maxLength={2}
                            />
                            <AuthTimeInputButton
                                onPress={onSelectTimePress}
                                openTime={openTime}
                                closeTime={closeTime}
                            />

                            {
                                image &&
                                <FastImage
                                    style={styles.ImageStyle}
                                    source={{ uri: image }}
                                    resizeMode='cover'
                                />
                            }
                            <PrimaryButton
                                title={image ? 'Select another Image' : 'Select Image'}
                                onPress={onImageSelectPress}
                            />
                        </View>
                    </>
                }
                {
                    activeScreen == 2 &&
                    <>
                        <AuthLabel
                            title={'Registration'}
                            desc={'Here, Register your restaurant address details.'}
                        />

                        <View style={{ marginTop: 20, width: '100%' }}>
                            <AuthTextInput
                                value={address}
                                onChangeText={setAddress}
                                placeholder={'Address'}
                                keyboardType={keyboardType.default}
                            />

                            <AuthTextInput
                                value={city}
                                onChangeText={setCity}
                                placeholder={'City'}
                                keyboardType={keyboardType.default}
                                editable={false}
                            />

                            <AuthTextInput
                                value={state}
                                onChangeText={setState}
                                placeholder={'State'}
                                keyboardType={keyboardType.default}
                                editable={false}
                            />

                            <AuthTextInput
                                value={pincode}
                                onChangeText={setPincode}
                                placeholder={'Pincode'}
                                keyboardType={keyboardType.numeric}
                                maxLength={6}
                            />

                            <View style={styles.ImageStyle}>
                                <MapView
                                    ref={_map}
                                    style={{ flex: 1, borderRadius: 7, overflow: 'hidden' }}
                                    initialRegion={stat.region}
                                    showsUserLocation={true}
                                    onRegionChangeComplete={onValueChanged}
                                    rotateEnabled={false}
                                    showsMyLocationButton={true}
                                    customMapStyle={MapStandardStyle}
                                />
                                <View style={{ top: '50%', left: "50%", marginLeft: -15, marginTop: -27.5, position: 'absolute', }}>
                                    <FastImage
                                        source={MarkerIcon}
                                        style={{ height: 30, width: 30, }}
                                        resizeMode='cover'
                                    />
                                </View>
                            </View>
                        </View>
                    </>
                }
                {
                    activeScreen == 3 &&
                    <>
                        <AuthLabel
                            title={'Registration'}
                            desc={'Here, Register your restaurant contact details.'}
                        />
                        <View style={{ marginTop: 20, width: '100%' }}>

                            <AuthTextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder={'Restaurant Email'}
                                keyboardType={keyboardType.email_address}
                            />

                            <AuthTextInput
                                value={contactNo}
                                onChangeText={setContactNo}
                                placeholder={'Contact No'}
                                maxLength={10}
                                keyboardType={keyboardType.number_pad}
                            />

                            <AuthTextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder={'Password'}
                                keyboardType={keyboardType.default}
                                maxLength={30}
                                isPasswordField
                            />

                            <AuthTextInput
                                value={cpassword}
                                onChangeText={setCPassword}
                                placeholder={'Confirm Password'}
                                keyboardType={keyboardType.default}
                                maxLength={30}
                                isPasswordField
                            />

                            <View style={styles.NoteContainer} >
                                <Text style={styles.NoteText}>Note:</Text>
                                <Text style={styles.NoteDesc}>You can't change your contact details once you submit it.</Text>
                            </View>
                        </View>
                    </>
                }
            </View>

            <View style={styles.BottomButtonContainer}>
                {
                    activeScreen > 1 &&
                    <>
                        <PrimaryButton
                            title={'Previuous'}
                            onPress={onPreviousButtonPress}
                            flex={1}
                        />
                        <View style={{ width: 20 }} />
                    </>
                }
                <PrimaryButton
                    title={'Next'}
                    onPress={() => onNextButtonPress(_map)}
                    isLoading={loading}
                    flex={1}
                />
            </View>

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
        </AuthScreenTemplate>
    )
}

export default RegisterScreen