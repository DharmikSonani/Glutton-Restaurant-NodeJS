import { StyleSheet, } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerMenu from './CustomDrawerMenu';
import { NavigationScreens } from '../../constants/Strings';
import { COLOR } from '../../constants/Colors';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigationHandler = () => {

    return (
        <Drawer.Navigator
            screenOptions={{
                ...styles.DrawerContainer,
            }}
            drawerContent={props => <CustomDrawerMenu {...props} />}
        >
            <Drawer.Screen
                name={NavigationScreens.HomeScreen}
                component={HomeScreen}
                options={{ headerShown: false }}
            />
        </Drawer.Navigator >
    )
}

export default DrawerNavigationHandler

const styles = StyleSheet.create({
    DrawerContainer: {
        drawerActiveBackgroundColor: COLOR.WHITE,
        drawerInactiveBackgroundColor: COLOR.WHITE,
        drawerActiveTintColor: COLOR.BLACK,
        drawerInactiveTintColor: COLOR.BLACK,
        swipeEnabled: true,
        drawerType: 'front',
        headerTintColor: COLOR.BLACK,
        drawerStyle: {
            backgroundColor: COLOR.TRANSPARANT,
        },
    },
})