import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AuthContext from '../../contexts/auth';

export default function Register({ navigation }) {
    const { register } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    
    async function registerHandler() {
        if (email&&password) {
            setLoading(true);
            await register(email, password);
            setLoading(false);
            navigateToLogin();
        }
    }

    function navigateToLogin() {
        navigation.navigate('Login', { email });
    }

    return(
        <View style={styles.container}>
            <Text style={styles.welcomeTxt}>
                Bem Vindo! Conclua seu cadastro para continuar.
            </Text>

            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    placeholder="E-mail"
                    underlineColorAndroid="#0129FA"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Senha"
                    underlineColorAndroid="#0129FA"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={registerHandler} style={styles.btn} activeOpacity={.7} disabled={loading}>
                    {
                        loading
                        ? <ActivityIndicator size="small" color="white"/>
                        : <Text style={styles.textBtn}>Continuar</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToLogin}>
                    <Text style={{ color: '#0B1747' }}>Já tem uma conta?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '80%',
        paddingHorizontal: '10%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    welcomeTxt: {
        fontSize: 15,
        color: '#0129FA',
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
    },
    input: {
        width: '100%'
    },
    btnContainer: {
        width: '100%',
        alignItems: 'center',
    },
    btn: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: '#0B1747',
        alignItems: 'center',
        marginBottom: 10,
    },
    textBtn: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
});