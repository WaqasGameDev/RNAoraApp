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

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType }: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
            <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
                <TextInput
                    className='w-full flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#636565" 
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity onPress={()=>{setShowPassword(!showPassword)}}>
                        <Image 
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className='w-6 h-6 justify-center items-center'
                        resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField
