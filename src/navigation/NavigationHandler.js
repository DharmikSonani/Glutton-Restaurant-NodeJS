import { createStackNavigator } from "@react-navigation/stack"
import React from 'react';
import { NavigationScreens } from '../constants/Strings';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import DrawerNavigationHandler from './DrawerNavigation/DrawerNavigationHandler';
import GenerateInvoiceScreen from "../screens/GenerateInvoiceScreen/GenerateInvoiceScreen";
import InvoiceScreen from "../screens/InvoiceScreen/InvoiceScreen";
import CustomerReviewsScreen from "../screens/CustomerReviewsScreen/CustomerReviewsScreen";
import ItemAddToBillScreen from "../screens/ItemAddToBillScreen/ItemAddToBillScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import PackageScreen from "../screens/PackageScreen/PackageScreen";
import EditProfileScreen from "../screens/EditProfileScreen/EditProfileScreen";
import AddPhotosScreen from "../screens/AddPhotosScreen/AddPhotosScreen";
import AllBookingsScreen from "../screens/AllBookingsScreen/AllBookingsScreen";
import AddMenuScreen from "../screens/AddMenuScreen/AddMenuScreen";

const Stack = createStackNavigator();

export const StackNavigation = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name={NavigationScreens.SplashScreen} component={SplashScreen} />
            <Stack.Screen name={NavigationScreens.LoginScreen} component={LoginScreen} />
            <Stack.Screen name={NavigationScreens.RegisterScreen} component={RegisterScreen} />
            <Stack.Screen name={NavigationScreens.ForgotPasswordScreen} component={ForgotPasswordScreen} />
            <Stack.Screen name={NavigationScreens.HomeDrawer} component={DrawerNavigationHandler} />
            <Stack.Screen name={NavigationScreens.GenerateInvoiceScreen} component={GenerateInvoiceScreen} />
            <Stack.Screen name={NavigationScreens.InvoiceScreen} component={InvoiceScreen} />
            <Stack.Screen name={NavigationScreens.CustomerReviewsScreen} component={CustomerReviewsScreen} />
            <Stack.Screen name={NavigationScreens.ItemAddToBillScreen} component={ItemAddToBillScreen} />
            <Stack.Screen name={NavigationScreens.ProfileScreen} component={ProfileScreen} />
            <Stack.Screen name={NavigationScreens.PackageScreen} component={PackageScreen} />
            <Stack.Screen name={NavigationScreens.EditProfileScreen} component={EditProfileScreen} />
            <Stack.Screen name={NavigationScreens.AddPhotosScreen} component={AddPhotosScreen} />
            <Stack.Screen name={NavigationScreens.AllBookingsScreen} component={AllBookingsScreen} />
            <Stack.Screen name={NavigationScreens.AddMenuScreen} component={AddMenuScreen} />
        </Stack.Navigator>
    )
}

