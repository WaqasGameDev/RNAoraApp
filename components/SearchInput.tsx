import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

type FormFieldProps = {
    title: string
    value: string
    placeholder: string
    handleChangeText: (e: string) => void
    otherStyles: string
    keyboardType?: string
}

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className='space-x-4 w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
            <TextInput
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder={placeholder}
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
            />
            <TouchableOpacity>
                <Image
                source={icons.search}
                className='w-5 h-5'
                resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput