import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants"
import { CustomButton, FormField } from '../../components'
import { Link } from 'expo-router'
import { createUser} from '../../lib/appwrite'

const SignUp = () => {

  const [form, setForm] = useState({
    username:'',
    email: '',
    password: ''
  })

  const submit = () => {
    createUser({
      username: form.username,
      email: form.email,
      password: form.password,
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false)

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[80vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]'
          />
          <Text className='text-white text-2xl font-psemibold mt-10'>Sign up to Aora</Text>
          <FormField
            title='User Name'
            value={form.username}
            placeholder='user name'
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            otherStyles='mt-10'
          />
          <FormField
            title='Email'
            value={form.email}
            placeholder='email'
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />
          <FormField
            title='Password'
            value={form.password}
            placeholder='password'
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign Up'
            handlePressed={() => { submit() }}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp