import { Context, createContext } from "react";
import { Audio } from "expo-av";

const sound = new Audio.Sound();
const SoundContext: Context<{ sound: Audio.Sound }> = createContext({sound});

export const SoundContextProvider: (props: any) => JSX.Element = (props) => {
    const contextValue = {sound};

    return (
        <SoundContext.Provider value={contextValue}>
            {props.children}
        </SoundContext.Provider>
    );
}

export default SoundContext;