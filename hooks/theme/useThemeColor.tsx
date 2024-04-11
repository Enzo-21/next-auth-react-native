import { Text as DefaultText, View as DefaultView, TextStyle, useColorScheme } from 'react-native';

import Colors from '@/lib/constants/Colors';
import { fonts } from '@/lib/constants/Fonts';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView['props'];
export type TextProps = ThemeProps & DefaultText['props'] & {
  fontWeight?: 'regular' | 'semi_bold' | 'bold' | 'extra_bold' | 'black';
};


export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof Colors.light & keyof typeof Colors.dark
  ) {
    const theme = useColorScheme() ?? 'light';
    const colorFromProps = props[theme];
  
    if (colorFromProps) {
      return colorFromProps;
    } else {
      return Colors[theme][colorName];
    }
  }