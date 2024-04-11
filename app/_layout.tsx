import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import LoadingScreen from '@/components/indicators/loading-screen';

import { AuthProvider } from '@/hooks/useAuth';
import { useColorScheme } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Poppins_SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Poppins_ExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    Poppins_Black: require('../assets/fonts/Poppins-Black.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return <LoadingScreen/>
  }

  return (
    <AuthProvider>
      <RootLayoutNav/>
    </AuthProvider>
    )
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

    return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* Renders the currently selected content. In our case, the content is being selected by the AuthProvider */}
      <Slot />
    </ThemeProvider>
  );
}
