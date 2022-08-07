import { Platform, PlatformOSType } from 'react-native';
import type { Fonts } from '../types';

const fontConfig = {
    web: {
        regular: {
            fontFamily: 'Lato, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '400' as '400',
        },
        medium: {
            fontFamily: 'Lato, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '500' as '500',
        },
        light: {
            fontFamily: 'Lato, Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '300' as '300',
        },
        thin: {
            fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: '100' as '100',
        },
    },
    ios: {
        regular: {
            fontFamily: 'System',
            fontWeight: '400' as '400',
        },
        medium: {
            fontFamily: 'System',
            fontWeight: '500' as '500',
        },
        light: {
            fontFamily: 'System',
            fontWeight: '300' as '300',
        },
        thin: {
            fontFamily: 'System',
            fontWeight: '100' as '100',
        },
    },
    default: {
        regular: {
            fontFamily: 'Lato, sans-serif',
            fontWeight: 'normal' as 'normal',
        },
        medium: {
            fontFamily: 'Lato, sans-serif-medium',
            fontWeight: 'normal' as 'normal',
        },
        light: {
            fontFamily: 'Lato, sans-serif-light',
            fontWeight: 'normal' as 'normal',
        },
        thin: {
            fontFamily: 'Lato, sans-serif-thin',
            fontWeight: 'normal' as 'normal',
        },
    },
};



export default function configureFonts(config?: {
    [platform in PlatformOSType | 'default']?: Fonts;
}): Fonts {
    const fonts = Platform.select({ ...fontConfig, ...config }) as Fonts;
    return fonts;
}