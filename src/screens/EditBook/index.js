import React, { useState, } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import showAlertError from '../../components/AlertError';
import api from '../../services/api';


export default function EditBook({ navigation, route }) {
    const [bookData, setBookData] = useState(route.params.data);
    const [titleBorder, setTitleBorder] = useState(0);
    const [linkBorder, setLinkBorder] = useState(0);
    const [descriptionBorder, setDescriptionBorder] = useState(0);

    function titleHandler(text) {
        let dataTemp = {...bookData};
        dataTemp.nome = text;
        setBookData(dataTemp);
    } 
    
    function linkHandler(text) {
        let dataTemp = {...bookData};
        dataTemp.link_venda = text;
        setBookData(dataTemp);
    }

    function descriptionHandler(text) {
        let dataTemp = {...bookData};
        dataTemp.sinopse = text;
        setBookData(dataTemp);
    }

    async function deleteHandler() {
        try {
            await api.delete(`/livros/${bookData.id}`);
            navigation.goBack();
        } catch (err) {
            console.log(err.response);
            console.log(bookData.id);
            showAlertError('', 'Erro ao tentar deletar livro');
        }
    }

    return(
        <View style={{flex: 1}}>
            <ScrollView style={{ width: '100%', }} contentContainerStyle={styles.container}>
                <Text style={{fontSize: 22, color: '#0B1747', alignSelf: 'center', fontWeight: 'bold'}}>Informações</Text>
                <Image source={{ uri: bookData.img_url }} style={styles.img} />

                <View style={styles.infoField}>
                    <Text style={styles.textHeader}>Título:</Text>
                    <TextInput 
                        onFocus={() => {setTitleBorder(1)}}
                        onBlur={() => {setTitleBorder(0)}}
                        onChangeText={text => titleHandler(text)}
                        style={[styles.textInput, { borderWidth: titleBorder }]}
                        value={bookData.nome}
                    />
                </View>
                <View style={styles.infoField}>
                    <Text style={styles.textHeader}>Disponível em:</Text>
                    <TextInput 
                        style={[styles.textInput, { borderWidth: linkBorder }]}
                        onFocus={() => {setLinkBorder(1)}}
                        onBlur={() => {setLinkBorder(0)}}
                        onChangeText={text => linkHandler(text)}
                        value={bookData.link_venda}
                    />
                </View>
                <View style={styles.infoField}>
                    <Text style={styles.textHeader}>Disponível em Audio Book:</Text>
                    <Text>SIM</Text>
                </View>
                <View style={styles.infoField}>
                    <Text style={styles.textHeader}>Descrição:</Text>
                    <TextInput 
                        style={[styles.textInput, { borderWidth: descriptionBorder }]}
                        onFocus={() => {setDescriptionBorder(1)}}
                        onBlur={() => {setDescriptionBorder(0)}}
                        onChangeText={text => descriptionHandler(text)}
                        value={bookData.sinopse}
                        multiline={true}
                    />
                </View>

                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn} activeOpacity={.5} onPress={deleteHandler}>
                        <Text style={{color: '#8D06F6', fontWeight: 'bold' }}>Excluir livro</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#8D06F6' }]} activeOpacity={.7}>
                        <Text style={{color: 'white', fontWeight: 'bold' }}>Salvar alterações</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        width: '100%',
        // alignItems: 'center',
        paddingHorizontal: '10%',
    },
    infoField: {
        marginBottom: 20,
    },
    textInput: {
        textAlign: 'left',
        fontSize: 15,
        paddingVertical: 0,
    },
    textHeader: {
        fontWeight: '700',
        fontSize: 18,
    },
    img: {
        width: 120,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginBottom: 50,
    },
    btnContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    btn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#8D06F6',
        borderRadius: 5,
    },
});