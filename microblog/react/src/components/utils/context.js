import { createContext, useState, useContext } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [numberOfPosts, setNumberOfPosts] = useState(0);


    return (
        <AppStateContext.Provider value={{ numberOfPosts, setNumberOfPosts }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext); // useContext extracts values from the context.
};