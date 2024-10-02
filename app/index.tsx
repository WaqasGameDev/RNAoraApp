import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

const App = () => {
  return (
    <View style={styles.container}>
      <Text>Aora</Text>
      <StatusBar style='auto'/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})