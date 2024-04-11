import { useThemeColor } from '@/hooks/theme/useThemeColor';
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, TextInputProps, TextStyle } from 'react-native';

type InputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  disabled?: boolean; 
};

const Input = forwardRef<TextInput, InputProps>(
  ({ style, lightColor, darkColor, disabled, ...props }, ref) => {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
      <TextInput
        style={[styles.input, { color }, style, disabled && styles.disabled]} 
        editable={!disabled} 
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
    marginBottom: 8
  },
  disabled: {
    backgroundColor: '#80808025', 
    color: 'gray', 
  }
});

export { Input };
