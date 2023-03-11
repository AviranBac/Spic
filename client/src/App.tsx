import { StyleSheet, TextInput, View } from 'react-native';
import React, { FC, useState } from "react";
import TextToSpeechIcon from "./components/icons/TextToSpeechIcon";
import { SoundContextProvider } from "./store/SoundContext";

const App: FC = () => {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <SoundContextProvider>
                <div style={{display: 'flex', flexDirection: 'row-reverse', gap: '1rem'}}>
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
                </div>
            </SoundContextProvider>
        </View>
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
