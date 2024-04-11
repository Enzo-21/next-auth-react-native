import { useThemeColor } from '@/hooks/theme/useThemeColor';
import { Text as DefaultText, View as DefaultView, TextStyle } from 'react-native';


type ThemeProps = {
    lightColor?: string;
    darkColor?: string;
};

export type ViewProps = ThemeProps & DefaultView['props'];

export function View(props: ViewProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
