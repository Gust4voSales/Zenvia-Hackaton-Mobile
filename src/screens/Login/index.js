import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AuthContext from '../../contexts/auth';
// import Button from '../../components/Button';

import styles from './styles';

export default function Login() {
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    
    async function login() {
        if (email&&password) {
            setLoading(true);
            await signIn(email, password);
            setLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="E-mail"
                underlineColorAndroid="#06A3FF"
                onChangeText={text => setEmail(text)}
            />
            <TextInput 
                style={styles.input}
                placeholder="Senha"
                underlineColorAndroid="#06A3FF"
                onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity onPress={login} style={styles.btn} activeOpacity={.7} disabled={loading}>
                {
                    loading
                    ? <ActivityIndicator size="small" color="white"/>
                    : <Text style={styles.textBtn}>Entrar</Text>
                }
            </TouchableOpacity>
            
        </View>
    );
}