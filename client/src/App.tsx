import { StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from "react";
import TextToSpeechIcon from "./components/icons/TextToSpeechIcon";
import { Provider } from "react-redux";
import store from "./store/store";

const App: FC = () => {
    const [text, setText] = useState('');

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <View style={{display: 'flex', flexDirection: 'row-reverse', gap: 10}}>
                    <TextInput
                        editable
                        onChangeText={setText}
                        placeholder="הכנס משפט"
                        placeholderTextColor="gray"
                        value={text}
                        style={styles.textInput}
                    />
                    <TextToSpeechIcon text={text} gender='MALE'/>
                    <TextToSpeechIcon text={text} gender='FEMALE'/>
                </View>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 2,
        backgroundColor: 'white',
    },
});

export default App;
