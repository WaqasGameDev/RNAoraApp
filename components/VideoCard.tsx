import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av'

type VideoCardProps = {
    title:string,
    prompt:string,
    video:string,
    thumbnail:string,
    creator:CreaterProps
}

type CreaterProps = {
    username:string,
    avatar:string
}

const VideoCard = (videocard:VideoCardProps) => {
    
    const [play, setPlay] = useState(false)
  return (
    <View className=' flex-col items-center px-4 mb-14'>
      <View className='flex-row gap-3 items-start'>
        <View className='justify-center items-center flex-row flex-1'>
            <View className='w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-ce p-0.5'>
                <Image source={{uri: videocard.creator.avatar}}
                className='w-full h-full rounded-lg'
                resizeMode='contain'
                />
            </View>
            <View className='justify-center flex-1 ml-3 gap-y-1'>
                <Text className='text-white font-psemibold text-sm' numberOfLines={1}>{videocard.title}</Text>
                <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}>{videocard.creator.username}</Text>
            </View>
        </View>
        <View className='pt-2'>
            <Image source={icons.menu}
            className='w-5 h-5'
            resizeMode='contain'
            />
        </View>
      </View>
      {play ? (
                 <Video source={{uri: videocard.video}}
                 className='w-full h-60 rounded-[20px] mt-3 bg-white/10'
                 resizeMode={ResizeMode.COVER}
                 shouldPlay
                 onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
                     if ((status as AVPlaybackStatusSuccess).didJustFinish) {
                         setPlay(false)
                     }
                 }}
                />
            ) : (
        <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=>{setPlay(true)}}
        className='w-full h-60 rounded-xl mt-3 relative justify-center items-center'
        >
            <Image source={{uri : videocard.thumbnail}}
            className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'
            />
            <Image source={icons.play}
            className='w-12 h-12 absolute'
            resizeMode='contain'
            />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default VideoCard