import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export default function Input({ icon, keyboardType = 'default', placeholder = 'Enter text', errorMessage, }) {

    const [text, setText] = useState('')
    return (
        <View>
            <TextInput
                placeholder={placeholder}
                value={text}
                onChangeText={setText}
                keyboardType={keyboardType}
                style={styles.input}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        boxShadow : '23'
    }
});
