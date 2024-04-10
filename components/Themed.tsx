/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView, TextStyle } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { fonts } from '@/constants/Fonts';

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

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
