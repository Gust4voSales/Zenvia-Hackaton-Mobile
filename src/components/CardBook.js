import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function CardBook({data}) {
    const navigation = useNavigation();

    function navigateToEditBook() {
        navigation.navigate('EditBook', { data });
    }

    return(
        <View style={styles.container}>
            <Image 
                style={styles.img}
                source={{ uri: data.img_url }} 
            />
            <Text style={styles.title}>{data.nome}</Text>
            
            <TouchableOpacity onPress={navigateToEditBook}>
                <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginBottom: 5,
        width: 160,
        alignItems: 'center',
    },
    img: {
        height: 200,
        width: 120,
        resizeMode: 'contain',
        marginBottom: 0,
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
    },
    btnText: {
        color: '#8D06F6',
    },
});