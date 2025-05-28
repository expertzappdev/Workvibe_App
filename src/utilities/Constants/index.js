import { Dimensions } from 'react-native'

const Constants = {
    baseWidth: 375,
    baseheight: 812,
    baseScale: 2,
    ScreenSize: Dimensions.get('window'),
    Colors: {
        primary: '#203060',
        secondary: '#61697E',
        primaryLight: '#ffffff',
        primaryDark: '#000000',
        buttonPrimary: '#ffffff',
        buttonSecondary: '#203060',
        white: '#ffffff',
        tabActive: "#21223e",
        tabInactive: "#b6b6b7",
        primaryBorder: '#C3C5CD',

    },
    FontFamily: {
        SFProDisplayRegular: 'SFProDisplay-Regular',
        SFProDisplaySemibold: 'SFProDisplay-Semibold',
        SpaceGroteskRegular: 'SpaceGrotesk-Regular',
        SpaceGroteskBold: 'SpaceGrotesk-Bold'
    },
    FontWeight: {
        primary: '400',
        secondary: '600',
        heavy: 'bold'

    },
    FontSize: {
        superTiny: 9,
        tiny: 11,
        small: 14,
        medium: 16,
        big: 18,
        large: 20,
        xlarge: 30,
    },
    IconDimension: {
        height: 33,
        width: 33
    }
    
}

export default Constants
