import { TouchableOpacity, Text, View } from 'react-native'
import React from 'react'

type CustomButtonProps = {
  title: string
  handlePressed: ()=>void
  containerStyles?: string
  textStyles?: string
  isLoading?: boolean
}

const CustomButton = ({ title, handlePressed, containerStyles, textStyles, isLoading }: CustomButtonProps) => {
  return (
    <TouchableOpacity 
    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? "opacity-50" : "opacity-100"}`}
    onPress={handlePressed}
    activeOpacity={0.7}
    disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton