import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomButton, FormField } from '../../components'
import { Video, ResizeMode, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av'
import { icons } from '../../constants'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {

  type ImagePickerAsset = {
    assetId?: string | null
    base64?: string | null
    duration?: number | null
    exif?: Record<string, any> | null
    filename?: string | null
    filesize?: number | null
    height?: number | null
    mimetype?: string | null
    type?: string | null
    uri?: string | null
    width?: number | null

  }

  type FormState = {
    title: string;
    video: ImagePickerAsset | null;
    thumbnail: ImagePickerAsset | null;
    prompt: string;
    userId: string
  }

  const {user} = useGlobalContext();

  const [form, setForm] = useState<FormState>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
    userId: ''
  });

  const [uploading, setUploading] = useState(false)

  const openPicker = async (selectType: string) => {
    const result = await ImagePicker.launchImageLibraryAsync(
      {
        mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: false,
        quality: 1,
      }
    )

    if (!result.canceled) {
      if (selectType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] })
      }

      if (selectType === 'video') {
        setForm({ ...form, video: result.assets[0] })
      }
    }
    else {
      setTimeout(() => {
        Alert.alert('Document Picked', JSON.stringify(
          result, null, 2
        ))
      }, 100);
    }
  }

  const submit = async () => {
    if (!form.prompt || !form.thumbnail || !form.title || !form.video) {
      return Alert.alert('Please fill in all the fields')
    }

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, userId: user?.$id };
      return updatedForm;
    });

    try {
      setUploading(true)
      await createVideo({
        title: form.title,
        thumbnail: form.thumbnail,
        video: form.video,          
        prompt: form.prompt,
        userId: user?.$id
    });
      Alert.alert('Success', 'Post uploaded successfuly')
      router.push('/home')
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : String(error))
    } finally {
      setUploading(false)
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='px-4 my-6'>
        <Text className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>
        <FormField
          title='Video Title'
          value={form.title}
          placeholder='Give your video a catchy title...'
          handleChangeText={(e) => { setForm({ ...form, title: e }) }}
          otherStyles='mt-10'
        />
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Video
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('video')}
          >
            {form.video ? (
              <Video source={{ uri: form.video.uri ? form.video.uri : '' }}
                className='w-full h-64 rounded-2xl'
                resizeMode={ResizeMode.COVER}
              />
            )
              :
              (
                <View className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2'
                    />
                  </View>
                </View>
              )}
          </TouchableOpacity>
        </View>
        <View className='mt-7 space-y-2'>
          <Text className='text-base text-gray-100 font-pmedium'>
            Upload Thumbnail
          </Text>
          <TouchableOpacity
            onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image source={{ uri: form.thumbnail.uri ? form.thumbnail.uri : '' }}
                className='w-full h-64 rounded-2xl'
                resizeMode='cover'
              />
            )
              :
              (
                <View className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-5 h-5'
                  />
                  <Text className='text-sm text-gray-100 font-pmedium'>
                    Choose a file
                  </Text>
                </View>
              )}
          </TouchableOpacity>
        </View>
        <FormField
          title='AI Prompt'
          value={form.prompt}
          placeholder='Prompt you used to generate this video'
          handleChangeText={(e) => { setForm({ ...form, prompt: e }) }}
          otherStyles='mt-7'
        />
        <CustomButton
          title='Submit & Publish'
          handlePressed={submit}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create