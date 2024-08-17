import { StyleSheet, } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigation } from './src/navigation/NavigationHandler'
import { Provider } from 'react-redux'
import Store from './src/redux/Store'

const App = () => {
  return (


    <Provider store={Store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})