import React, { Component } from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import ListMasalahScreen from '../screens/ListMasalahScreen'
import TambahMasalahScreen from '../screens/TambahMasalahScreen'
import DetailMasalahScreen from '../screens/DetailMasalahScreen'

const MainStack = createStackNavigator();

export default function MainStackNavigator() {

  return (
          <MainStack.Navigator>
            <MainStack.Screen name={'ListMasalah'} 
                component={ListMasalahScreen} 
                options={{
                  title: 'Laporkan Masalah',
                }}
            /> 
            <MainStack.Screen name={'TambahMasalah'} 
                component={TambahMasalahScreen} 
                options={{
                  title: 'Laporkan Masalah',
                }}
            /> 
            <MainStack.Screen name={'DetailMasalah'} 
                component={DetailMasalahScreen} 
                options={{
                  title: 'Detail Masalah',
                }}
            /> 
        </MainStack.Navigator>
  )
}