// src/context/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useColorScheme } from 'react-native';



export type theme = 'light' | 'dark' | 'system';

interface ThemeContextProps {
    theme: theme;
    setTheme: (theme: theme) => void;
}


const ThemeContext = createContext<ThemeContextProps>(undefined);

// Create a custom hook to use the ThemeContext
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};


export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const systemTheme = useColorScheme(); // Detects the system theme (light or dark)
    const [theme, setTheme] = useState<theme>('system'); // Default to 'system'

    const determineTheme = () => {
        if (theme === 'system') {
            return systemTheme || 'light'; // Default to light if system theme is unknown
        }
        return theme;
    }

    const currentTheme = determineTheme();
    console.log("Current Thme---", currentTheme);



    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setTheme }} >
            {children}
        </ThemeContext.Provider>
    )
} 