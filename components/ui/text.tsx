import { Text as DefaultText, View as DefaultView, TextStyle } from 'react-native';

import { fonts } from '@/lib/constants/Fonts';
import { useThemeColor } from '@/hooks/theme/useThemeColor';


type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'] & {
  fontWeight?: 'regular' | 'semi_bold' | 'bold' | 'extra_bold' | 'black';
};

export function Text(props: TextProps) {
    const { style, lightColor, darkColor, fontWeight, ...otherProps } = props;
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
    const fontWeightStyle: TextStyle = fontWeight
      ? { fontFamily: fonts[`primary_${fontWeight}` as keyof typeof fonts] }
      : { fontFamily: fonts.primary_regular }; // Default to regular if fontWeight is not provided
  
    return (
      <DefaultText
        style={[{ color }, fontWeightStyle, style]}
        {...otherProps}
      />
    );
  }