import React, { createContext, useState, useEffect, useRef } from 'react';
// import { StatusBar } from 'react-native';
import showAlertError from '../components/AlertError';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';


const AuthContext = createContext({ signed: false, user: {}, loading: true }); //value types 

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await AsyncStorage.getItem('@ZenviaHack_userEmail');
            const storagedToken = await AsyncStorage.getItem('@ZenviaHack_userToken');

            if (storagedUser && storagedToken) {
                api.defaults.headers.authorization = `Bearer ${storagedToken}`;

                setUser(JSON.parse(storagedUser));
                setLoading(false);
            } else if (!storagedUser && !storagedToken) {
                setLoading(false);
            }
        }
        // setInterceptorResponseOnApi();

        loadStorageData();
    }, []);

    async function signIn(email, password) {
        try {
            const { data } = await api.post('/users/login', { email, password }); //teste123

            setUser(email);
            api.defaults.headers.authorization = `Bearer ${data.token}`;

            // //Save data on AsyncStorage
            try {
                await AsyncStorage.multiSet([
                    ["@ZenviaHack_userEmail", JSON.stringify(email)],
                    ["@ZenviaHack_userToken", data.token],
                ]);
            } catch (err) {
                console.log(err);
                console.log('Error trying to storage user data');
            }

        } catch (err) {
            // console.log(err.response);
            if (err.response===undefined) 
                showAlertError('Não foi possível realizar login', 'Erro ao tentar conectar com o servidor. Tente novamente');
            else
                showAlertError('Não foi possível realizar login', 'Email ou senha incorretos');
        }
    }

    function signOut() {
        AsyncStorage.clear().then(() => {
            setUser('');
        });
    }

    async function register(email, password) {
        try {
            const { data } = await api.post('/users/sign-up', { email, password });

            // console.log(data);
            // setUser(email);
            // api.defaults.headers.authorization = `Bearer ${data.token}`;

            //Save data on AsyncStorage
            // try {
            //     await AsyncStorage.multiSet([
            //         ["@QuizApp_user", JSON.stringify(data.user)],
            //         ["@QuizApp_userToken", data.token],
            //     ]);
            // } catch (err) {
            //     console.log(err);
            //     console.log('Error trying to storage user data');
            // }
        } catch (err) {
            if (err.response===undefined) 
                showAlertError('Não foi possível realizar o cadastro', 'Erro ao tentar conectar com o servidor. Tente novamente');
            else {
                console.log(err.response);
                showAlertError('Não foi possível realizar o cadastro', 'Utilize um email válido e senha com pelo menos 8 caracteres');

            }
        }
    }

    // This function sets a response interceptor at the api, so on each request if the response === 401 (token not valid, probably expired)
    // the user is logged out, this behavior could be replaced by a refresh token system...
    // function setInterceptorResponseOnApi() {
    //     api.interceptors.response.use(res => res, err => {
    //         if (!err.response) {
    //             return new Promise((resolve, reject) => {
    //                 reject(err);
    //             });
    //         } else if (err.response.status !== 401) {
    //             return new Promise((resolve, reject) => {
    //               reject(err);
    //             });
    //         } else if (err.response.status === 401) { // TOKEN EXPIRED OR TOKEN NOT ALLOWED. EITHER ONE OF THE OPTIONS, USER SHOULD BE LOGGED OUT
    //             signOut();
    //         }
    //     });
    // }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, setUser, signIn, signOut, register, loading }}>
            {/* <StatusBar backgroundColor="#314C6A" barStyle='light-content' /> */}
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

