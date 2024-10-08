import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from "../../constants"
import EmptyState from '../../components/EmptyState'
import { getUserPosts, signout } from '../../lib/appwrite'
import { useAppWrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {

  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  
  const { data: posts = [], refetch, isLoading } = useAppWrite(() => getUserPosts(user.$id))

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  const logout = async ()=>{
    
      await signout();
      setUser(null)
      setIsLoggedIn(false)

      router.replace('/sign-in')
  }

  if (isLoading && !posts.length) {
    return (
      <SafeAreaView className='bg-primary h-full flex justify-center items-center'>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard {...item} />
        )}
        ListHeaderComponent={() => (
          <View className='w-full justify-center items-center mt-6 mb-12 px-4'>
            <TouchableOpacity className='w-full items-end mb-10'
            onPress={logout}
            >
              <Image source={icons.logout}
              resizeMode='contain'
              className='w-6 h-6'
              />
            </TouchableOpacity>
            <View className='w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center'>
              <Image source={{uri:user?.avatar}}
              className='w-[90%] h-[90%] rounded-lg'
              resizeMode='cover'
              />
            </View>
              <InfoBox
              title={user?.username}
              containerStyles='mt-5'
              titleStyles='text-lg'
              />
              <View className='mt-5 flex-row'>
              <InfoBox
              title={posts.length || 0}
              subtitle='Posts'
              containerStyles='mr-10'
              titleStyles='text-xl'
              />
              <InfoBox
              title='1.2k'
              subtitle='Followers'
              titleStyles='text-xl'
              />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video!"
          />
        )}
        refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      />
    </SafeAreaView>
  );
};

export default Profile