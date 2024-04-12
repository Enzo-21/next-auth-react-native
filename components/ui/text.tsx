import { Text as DefaultText } from 'react-native';

import { useThemeColor } from '@/hooks/theme/useThemeColor';
import { fonts } from '@/lib/constants/Fonts';


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