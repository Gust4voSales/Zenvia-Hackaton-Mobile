import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createStackNavigator();

export default function AuthRoutes(){
    return(
        <AuthStack.Navigator initialRouteName="Register" >
            <AuthStack.Screen name="Cadastro" component={Register}/>
            <AuthStack.Screen name="Login" component={Login}/>
        </AuthStack.Navigator>
    );
}