import { StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './src/navigation/NavigationHandler'
import { useSelector } from 'react-redux'
import socketServices from './src/api/Socket'
import { Reducers } from './src/constants/Strings'

const App = () => {

  const authId = useSelector(state => state[Reducers.AuthReducer]);

  useEffect(() => {
    authId && socketServices.initializeSocket();
  }, [authId])

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})