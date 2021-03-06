import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
// import { createDrawerNavigator, } from '@react-navigation/drawer';

import Home from '../screens/Home';
import EditBook from '../screens/EditBook';
import RegisterBook from '../screens/RegisterBook';

// const AppDrawer = createDrawerNavigator();
const AppStack = createStackNavigator();

export default function AppRoutes() {
    return(
        <AppStack.Navigator>
            <AppStack.Screen name="Home" component={Home}/>
            <AppStack.Screen name="RegisterBook" component={RegisterBook}  options={{ title: 'Registrar livro' }}/>
            <AppStack.Screen name="EditBook" component={EditBook}  options={{ title: 'Editar livro' }}/>
        </AppStack.Navigator>
    );
}