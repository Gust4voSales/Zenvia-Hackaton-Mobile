import React, { useState, useEffect, } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-community/picker';

import showAlertError from '../../components/AlertError';
import api from '../../services/api';

export default function EditBook({ navigation }) {
    const [nome, setNome] = useState('');
    const [autor, setTitle] = useState('');
    const [genero, setGenero] = useState('js');
    const [generos, setGeneros] = useState([]);
    const [audioBook, setAudioBook] = useState(false);

    useEffect(() => {
        async function loadGenres() {   
            try {
                const { data } = await api.get('/generos');
                setGeneros(data);
                setGenero(data[0].id);
            } catch (err) {
                showAlertError('', 'Não foi possível carregar os gêneros');
            }
        }

        loadGenres();
    }, []);

    function registerBook() {
        console.log(genero);
    }

    return(
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder="Título"
            />
            <TextInput 
                style={styles.input}
                placeholder="Autor"
            />
            <View style={[styles.input, { paddingVertical: 0 }]}>
                <Picker
                    selectedValue={genero}
                    style={{ height: 40, width: '100%', }}
                    onValueChange={(itemValue, itemIndex) => setGenero(itemValue)}
                >
                    {
                        generos.length>0 
                        ? generos.map((genero) => <Picker.Item label={genero.tipo} value={genero.id} key={genero.id}/>)
                        : <Picker.Item label="Carregando" value="ficção"/>
                    }
                   
                </Picker>
            </View>
            <View style={[styles.input, { paddingVertical: 6, paddingHorizontal: 5 }]}>
                <Text>Disponível em audio book</Text>
                <Switch 
                    value={audioBook}
                    onValueChange={() => { setAudioBook(!audioBook) }}
                    trackColor={{ false: "#ccc", true: "#0B1747" }}
                    thumbColor={ audioBook ? "#8D06F6" : "#f4f3f4"}
                />
            </View>

            <View>
                <Text>Disponível em:</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="www.exemplo.com.br"
                />
            </View>

            <TouchableOpacity style={styles.btn} activeOpacity={.7} onPress={registerBook}>
                <Text style={{color: 'white', fontWeight: 'bold' }}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        width: '100%',
        paddingHorizontal: '10%',
        paddingTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#8D06F6',
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    picker: {
        height: 50, 
        width: '100%',
        borderWidth: 1,
        // backgroundColor: 'pink',
        borderColor: '#8D06F6',
        borderRadius: 5,
    },
    btn: {
        width: '100%',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B1747',
        borderRadius: 5,
    },
});