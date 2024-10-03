import {View, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../constants'

const App = () => {
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className='w-full h-full items-center px-4'>
            <Image source={images.logo} className='w-[130px] h-[84px]' resizeMode='contain'>
              
            </Image>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App