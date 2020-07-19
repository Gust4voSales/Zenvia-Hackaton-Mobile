import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator, } from '@react-navigation/drawer';

import Home from '../screens/Home';

// const AppDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

export default function AppRoutes() {
    return(
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={Home}/>
        </AppStack.Navigator>
    );
}