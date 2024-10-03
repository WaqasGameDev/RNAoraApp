import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants'

type TabIconProps = {
    icon: string,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
    return (
        <View className={"items-center gap-2"}>
            <Image
                source={icon as ImageSourcePropType}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor:"#FFA001",
            tabBarInactiveTintColor:"#CDCDE0",
            tabBarStyle: {
                backgroundColor: "#161622",
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 84
            }
        }}>

            <Tabs.Screen name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            focused={focused}
                            name='Home'
                        />
                    )
                }}
            />

            <Tabs.Screen name="bookmark"
                options={{
                    title: 'Bookmark',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.bookmark}
                            color={color}
                            focused={focused}
                            name='Bookmark'
                        />
                    )
                }}
            />

            <Tabs.Screen name="create"
                options={{
                    title: 'Create',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.plus}
                            color={color}
                            focused={focused}
                            name='Create'
                        />
                    )
                }}
            />

            <Tabs.Screen name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            focused={focused}
                            name='Profile'
                        />
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout