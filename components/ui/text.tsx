import { Text as DefaultText, View as DefaultView, TextStyle } from 'react-native';

import { fonts } from '@/lib/constants/Fonts';
import { useThemeColor } from '@/hooks/theme/useThemeColor';


type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'] 

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
    return (
      <DefaultText
        style={[{ color, fontFamily: fonts.primary_regular }, style]}
        {...otherProps}
      />
    );
  }