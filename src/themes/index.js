import React from 'react';
import { DefaultTheme } from 'react-native-paper';

const theme = (props) => ({
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'blue',
        secondary: 'tomato',
    }
});

export default theme;