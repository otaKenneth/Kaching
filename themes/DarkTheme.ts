import { Theme } from '../types';
import * as Colors from '../constants/Colors';
import configureFonts from './fonts';

export const DarkTheme: Theme = {
    dark: true,
    roundness: 4,
    colors: {
        primary: Colors.blueDark,
        secondary: Colors.orangeLight,
        tertiary: Colors.orangeDark,
        text: Colors.paper,
        background: Colors.darkMain,
        error: Colors.red500,
        note: Colors.yellow500,
        message: Colors.blueMain,
        backdrop: 'rgba(0, 0, 0, 0.5)',
        disabled: 'rgba(0, 0, 0, 0.25)'
    },
    fonts: configureFonts(),
    animation: {
        scale: 1.0
    }
};