import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';


export default function Button({ onPress, children }) {
    return(
        <RectButton onPress={onPress} style={styles.btn} underlayColor="#fff">
            {/* <Text>{text}</Text> */}
            {children}
        </RectButton>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        backgroundColor: '#0B1747',

        alignItems: 'center',
    }
});