import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

type SearchInputProps = {
    initialQuery?:string
    placeholder: string
    otherStyles: string
}

const SearchInput = ({ initialQuery, placeholder, otherStyles }: SearchInputProps) => {

    const pathname = usePathname()

    const [query, setQuery] = useState(initialQuery || '')

    return (
        <View className='space-x-4 w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
            <TextInput
                value={query}
                className='text-base mt-0.5 text-white flex-1 font-pregular'
                placeholder={placeholder}
                onChangeText={(e) => setQuery(e)}
                placeholderTextColor="#CDCDE0"
            />
            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert('Missing query',
                            "Please type your query to search videos"
                        )
                    }

                    if(pathname.startsWith('/search')){
                        router.setParams({query})
                    }
                    else{
                        router.push(`/search/${query}`)
                    }
                }}
            >
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
