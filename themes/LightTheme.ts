import { Theme } from '../types';
import * as Colors from '../constants/Colors';
import configureFonts from './fonts';


export const LightTheme: Theme = {
    dark: false,
    roundness: 4,
    colors: {
        primary: Colors.orangeMain,
        secondary: Colors.blueLight,
        tertiary: Colors.darkMain,
        text: Colors.darkDark,
        background: Colors.paper,
        error: Colors.red500,
        note: Colors.yellow500,
        message: Colors.blueMain,
        backdrop: 'rgba(0, 0, 0, 0.5)',
        disabled: 'rgba(0, 0, 0, 0.25)'
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0
    },
};