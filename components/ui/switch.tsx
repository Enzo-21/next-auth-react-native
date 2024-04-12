import { Switch as NativeSwitch } from 'react-native';
import { useThemeColor } from '@/hooks/theme/useThemeColor';
import { View } from "@/components/ui/view";
import { Text } from "@/components/ui/text";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type SwitchProps = ThemeProps & React.ComponentPropsWithoutRef<typeof NativeSwitch>;

export function Switch(props: SwitchProps) {
  const { lightColor, darkColor, ...otherProps } = props;

  const thumbColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  const trackColor = {
    false: useThemeColor({ light: lightColor, dark: darkColor }, 'background'),
    true: useThemeColor({ light: lightColor, dark: darkColor }, 'switchEnabled'),
  };
  const iosBackgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View>
      <NativeSwitch
        thumbColor={thumbColor}
        trackColor={trackColor}
        ios_backgroundColor={iosBackgroundColor}
        {...otherProps}
      />
    </View>
  )
}
