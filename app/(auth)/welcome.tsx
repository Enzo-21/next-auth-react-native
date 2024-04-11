import LockAnimation from '@/assets/images/animations/auth_lock.json';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function LoginScreen() {
  const router = useRouter()
  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationProgress.current, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(animationProgress.current, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    )
      .start(); 

  }, []);

  return (
    <>
      <StatusBar style='light' />
      <LinearGradient 
        colors={['#156ab0', 'black']} 
        style={styles.container}
        start={{ x: 0, y: 0 }} 
        end={{ x: 0.75, y: 0.75 }} 
      >
        <SafeAreaView style={styles.container}>

          <Text  style={styles.title}>Out of the box Authentication for React Native Apps</Text>
          <AnimatedLottieView
            progress={animationProgress.current}
            style={{
              width: 250,
              height: 250,
            }}
            source={LockAnimation}
          />

          <View style={{ width: '100%', backgroundColor: 'transparent' }}>
            <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginBtn}>
              <Text style={{ color: 'white', fontWeight: '700' }}>Log in</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Seamlessly integrate Next.js authentication to your mobile apps.</Text>
          </View>
        </SafeAreaView>

      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 40,
    marginTop: 80,
    width: '100%',
    fontWeight: '900',
    color: 'white',
  },
  subtitle: {
    fontSize: 12,
    marginTop: 10,
    width: '100%',
    textAlign: 'center',
    color: 'white'
  },
  loginBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#156ab0',
    borderRadius: 8,
  },
});
