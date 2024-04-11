import { useThemeColor } from '@/hooks/theme/useThemeColor';
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native';

type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

const Input = forwardRef<TextInput, InputProps>(
  ({ style, lightColor, darkColor, ...props }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
      <TextInput
        ref={ref}
        style={[styles.input, { color }, style]}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
  },
});

export { Input };
