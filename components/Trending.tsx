import { FlatList, StyleSheet, Text, View, Image, ImageBackground, ViewToken } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'

type TrendingPostsProps = {
    posts : TrendingPostType[]
}

type TrendingPostType = {
    $id:string,
    thumbnail:string
}

type TrendingItemProps = {
    activeItem: TrendingPostType,
    item: TrendingPostType
}

const zoomIn : Animatable.CustomAnimation = {
    0 : {
        transform: [{ scale: 0.9 }]
    },
    1 : {
        transform: [{ scale: 1.1 }]
    },
}

const zoomOut : Animatable.CustomAnimation = {
    0 : {
        transform: [{ scale: 1.1 }]
    },
    1 : {
        transform: [{ scale: 0.9 }]
    },
}

const TrendingItem = ({activeItem, item} : TrendingItemProps)=>{

    const [play, setPlay] = useState(false)

    return (
        <Animatable.View className='mr-5'
        animation={activeItem === item ? zoomIn : zoomOut}
        duration={500}
        >
            {play ? (
                <Text className='text-white'>Playing</Text>
            ) 
            :
            (
                <TouchableOpacity className='relative justify-center items-center'
                activeOpacity={0.7}
                onPress={()=>setPlay(true)}>
                    <ImageBackground
                    source={{uri : item.thumbnail}}
                    className='w-40 h-60 rounded-[20px] my-5 overflow-hidden shadow-lg shadow-black/40'
                    resizeMode='cover'
                    />
                    <Image source={icons.play}
                    className='w-12 h-12 absolute'/>
                </TouchableOpacity>
            )}
        </Animatable.View>
    )
}

const Trending = ({posts}:TrendingPostsProps) => {

    const[activeItem, setActiveItem] = useState(posts[1])

    const viewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        
        if (viewableItems.length > 0 && viewableItems[0].item) {
            setActiveItem(viewableItems[0].item as TrendingPostType)
        }
    }

  return (
   <FlatList
   data={posts}
   keyExtractor={(item)=>item.$id}
    renderItem={({item})=>(
        <TrendingItem activeItem={activeItem} item={item}/>
    )}
    onViewableItemsChanged={(viewableItems)=> viewableItemsChanged(viewableItems)}
    viewabilityConfig={{
        itemVisiblePercentThreshold: 70
    }}
    contentOffset={{ x: 80, y: 0 }}
    horizontal
   />
  )
}

export default Trending

const styles = StyleSheet.create({})