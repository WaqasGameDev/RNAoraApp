import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { searchPosts } from '../../lib/appwrite'
import { useAppWrite } from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'

const Search = () => {

  const { query } = useLocalSearchParams()

  const searchQuery = Array.isArray(query) ? query[0] : query || '';

  const { data: posts = [], refetch, isLoading } = useAppWrite(() => searchPosts(searchQuery))

  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    refetch();
  }, [query])

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
          <View className='my-6 px-4'>
            <Text className='font-pmedium text-sm text-gray-100'>
              Search Results!
            </Text>
            <Text className='text-2xl font-psemibold text-white'>
              {query}
            </Text>
            <View className='mt-6 mb-8'>
              <SearchInput
                initialQuery={searchQuery}
                placeholder={searchQuery}
                otherStyles=''
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query!"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search