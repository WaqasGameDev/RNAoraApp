import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  web: "css",
  default: "native",
});

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown:false}} />
    </Stack>
  )
}

export default RootLayout

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})