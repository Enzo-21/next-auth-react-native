import AccountSettings from '@/components/settings/account-settings';
import { View } from '@/components/ui/view';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { ToastProvider } from '@/components/ui/toast';

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 120;

export default function AccountScreen() {
  const { signOut, user } = useAuth()
  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef);
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <ToastProvider position='bottom'>

          <Animated.ScrollView
            contentContainerStyle={{ minHeight: '100%'}}
            ref={scrollRef}
            scrollEventThrottle={16}>

            <Animated.View style={[{ backgroundColor: 'transparent', position: 'relative' }, imageAnimatedStyle]}>

              <Image
                source={{ uri: user?.image }}
                style={[styles.image]}
                resizeMode="cover"
              />
              <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30} tint="dark" style={styles.blurContainer} />
            </Animated.View>

            <View style={{ marginTop: -40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
              <View style={{ height: 86, width: 86, borderRadius: 86, borderColor: 'white', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={{ uri: user?.image }} style={{ height: 80, width: 80, borderRadius: 80 }} />
              </View>
            </View>


            <AccountSettings />


          </Animated.ScrollView>

        </ToastProvider>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: IMG_HEIGHT,
    width: width,
  },
  blurContainer: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  },
});