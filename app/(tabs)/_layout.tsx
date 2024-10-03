import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'
import { Tabs, Redirect } from 'expo-router'
import {icons} from '../../constants'

type TabIconProps = {
    icon: string,
    color: string,
    name: string,
    focused: boolean
}

const TabIcon = ({icon, color, name, focused} : TabIconProps)=>{
    return(
        <View>
            <Image source={icon as ImageSourcePropType}
            />
        </View>
    )
}

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="home" 
            options={{
                title:'Home',
                headerShown:false,
                tabBarIcon:({color,focused})=>(
                    <TabIcon 
                    icon={icons.home}
                    color={color}
                    focused={focused}
                    name='Home'
                    />
                )

            }}
        />
    </Tabs>
  )
}

export default TabsLayout