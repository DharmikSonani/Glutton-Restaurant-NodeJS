import { StyleSheet, } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './src/navigation/NavigationHandler'
import socketServices from './src/api/Socket'

const App = () => {
  useEffect(() => {
    socketServices.initializeSocket();
  }, [])

  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})