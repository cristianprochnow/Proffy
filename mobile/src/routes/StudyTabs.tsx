import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import TeacherList from '../pages/TeacherList'
import Favorites from '../pages/Favorites'

import { colors } from '../assets/styles/colors'

const { Navigator, Screen } = createBottomTabNavigator()

const StudyTabs: React.FC = () => {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          shadowOpacity: 0,
          height: 64
        },
        tabStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        },
        iconStyle: {
          flex: 0,
          width: 0,
          height: 0
        },
        labelStyle: {
          fontFamily: 'Archivo_700Bold',
          fontSize: 13,
          marginLeft: 24
        },
        inactiveBackgroundColor: colors.boxFooter,
        activeBackgroundColor: colors.activeBoxFooter,
        inactiveTintColor: colors.tabTextColor,
        activeTintColor: colors.textTitle
      }}
    >
      <Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarLabel: 'Proffys',
          tabBarIcon: ({ size, color, focused }) => {
            return <Ionicons
              name="ios-easel"
              size={size}
              color={focused ? colors.primary : color}
            />
          }
        }}
      />
      <Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ size, color, focused }) => {
            return <Ionicons
              name="ios-heart"
              size={size}
              color={focused ? colors.primary : color}
            />
          }
        }}
      />
    </Navigator>
  )
}

export default StudyTabs
