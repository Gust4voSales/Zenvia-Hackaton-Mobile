import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CardBook from '../../components/CardBook';
import showAlertError from '../../components/AlertError';
import api from '../../services/api';


export default function Home({ navigation }) {
    const limit = 6;
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadBooks();
    }, []);
    
    async function loadBooks(page=1) {
        try {
            setLoading(true)
            const res = await api.get('/livros/count');
            let bookCounter = parseInt(res.data.count);
            setTotalPage(Math.ceil(bookCounter/limit));
            console.log(Math.ceil(bookCounter/limit));

            const { data } = await api.get(`/livros`, { params: {
                filter: { 
                    "skip": (page-1)*limit,
                    "limit": limit, 
                }
            }});
            
            setBooks([...books, ...data]);
            setLoading(false);
        } catch (err) {
            showAlertError('', 'Não foi possível carregar os livros');
            setLoading(false);
        }
    }
    
    function loadMoreHandler() {
        if (page===totalPage) return;

        loadBooks(page+1);
        setPage(page+1);
    }

    function navigateToRegisterBook() {
        navigation.navigate('RegisterBook');
    }
    // const fakeData = {
    //     "nome": "Harry Potter e a Pedra Filosofal",
    //     "isbn": "55-5112-2",
    //     "sinopse": "Harry Potter and the Philosopher's Stone is a fantasy novel written by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSM en by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British author J. K. Rowling OAKSMFOKM AOKFM OKAMSF OAKSMen by British ",
    //     // "texto_especial": "string",
    //     "link_venda": "string",
    //     "img_url": "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg/220px-Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
    // }
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateToRegisterBook} style={{width: '100%'}}>
                <Text style={styles.textBtn}>Cadastrar Livro</Text>
            </TouchableOpacity>
            
            <Text style={styles.text}>Meus livros</Text>
            <FlatList 
                data={books}
                // style={{flex: 1}}
                numColumns={2}
                keyExtractor={(item, index) => item.id }
                renderItem={({item}) => <CardBook data={item}/> }
                ListFooterComponent={() =>
                    <TouchableOpacity onPress={loadMoreHandler} disabled={loading}>
                        {loading
                        ? <ActivityIndicator color="black" size="small"/>
                        : <Text style={styles.seeMoreBtn}>Ver mais</Text>}
                    </TouchableOpacity>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold', 
        alignSelf: 'flex-start', 
        marginLeft: 20, 
        fontSize: 18,
    },
    textBtn: {
        width: '80%',
        paddingVertical: 20,
        marginVertical: 10,
        textAlign: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        color: 'white',
        backgroundColor: '#0B1747',
        fontWeight: 'bold',
    },
    seeMoreBtn: {
        fontWeight: 'bold', 
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10,
        color: '#0B1747'
    },
});