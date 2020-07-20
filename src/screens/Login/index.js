import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import AuthContext from '../../contexts/auth';
// import Button from '../../components/Button';

export default function Login({ route }) {
    let mounted;
    const { signIn } = useContext(AuthContext);
    const [email, setEmail] = useState(route.params.email);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        mounted = true;
        return () => { mounted = false }
    }, []);
    
    async function loginHandler() {
        if (email&&password) {
            setLoading(true);
            await signIn(email, password);
            if (mounted)
                setLoading(false);
        }
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="E-mail"
                value={email}
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

            <TouchableOpacity onPress={loginHandler} style={styles.btn} activeOpacity={.7} disabled={loading}>
                {
                    loading
                    ? <ActivityIndicator size="small" color="white"/>
                    : <Text style={styles.textBtn}>Entrar</Text>
                }
            </TouchableOpacity>
            
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '80%',
        paddingHorizontal: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '100%'

    },
    btn: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: '#0B1747',
        marginTop: 70,
        alignItems: 'center',
    },
    textBtn: {
        color: "white",
        fontSize: 15,
        fontWeight: 'bold',
    },
});