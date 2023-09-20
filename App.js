import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Main from './src/Main'
import { Provider } from 'react-redux'
import { myStore } from './src/redux/store/store'
const App = () => {
  return (
    <Provider store={myStore} >


    <View style={{flex:1}}>
      <Main/>
    </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})




























// ......................................

// 1LpHyc81C3JuGpbw


// ......................................


