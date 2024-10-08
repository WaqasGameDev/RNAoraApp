import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getTrendingPosts } from '../../lib/appwrite'
import { useAppWrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useGlobalContext } from '../../context/GlobalProvider'

const Home = () => {

  const {user} = useGlobalContext();
  const { data: posts = [], refetch, isLoading } = useAppWrite(getAllPosts)

  const { data: trendingPosts = [], refetch: refetchLatest, isLoading: isTrendingPostsReloading } = useAppWrite(getTrendingPosts)

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
  }

  if (isLoading && !posts.length && isTrendingPostsReloading && !trendingPosts.length) {
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
        <VideoCard {...item}/>
        )}
        ListHeaderComponent={() => (
          <View className='my-6 px-4 space-y-6'>
            <View className='justify-between items-start flex-row mb-6'>
              <View>
                <Text className='font-pmedium text-sm text-gray-100'>
                  Welcome Back!
                </Text>
                <Text className='text-2xl font-psemibold text-white'>
                  {user?.username}
                </Text>
              </View>
              <View className='mt-1.5'>
                <Image
                  source={images.logoSmall}
                  className='w-9 h-10'
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput
              placeholder='Search for a video topic'
              otherStyles=''
            />
            <View className='w-full flex-1 pt-5 pb-8'>
              <Text className='text-gray-100 text-lg font-pregular mb-3'>
                Latest Videos
              </Text>
              <Trending posts={trendingPosts}/>
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


export default Home