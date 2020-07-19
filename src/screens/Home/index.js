import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
    const fakeData = {
        "nome": "Harry Potter e a Pedra Filosofal",
        "isbn": "55-5112-2",
        "sinopse": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSM en by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British ",
        // "texto_especial": "string",
        "link_venda": "string",
        "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    }
    return(
        <View>
            <Text>HOME!!!</Text>
            <TouchableOpacity onPress={() => navigation.navigate('EditBook', { data: fakeData })}>
                <Text>Edit Book</Text>
            </TouchableOpacity>
        </View>
    );
}