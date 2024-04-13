import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import ElephantTyping from '@/assets/images/animations/elephant_typing.json';
import { fonts } from '@/lib/constants/Fonts';

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

export default function HomeScreen() {

  const animationProgress = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

  }, []);

  return (
    <View style={styles.container}>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <LottieView
          source={ElephantTyping}
          style={{
            width: '80%',
            height: '80%',
          }}
          autoPlay
          loop
        />
            <Text  style={styles.subtitle}>Start by editing this screen</Text>
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.primary_bold,
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.primary_semi_bold,
    width: '100%',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
