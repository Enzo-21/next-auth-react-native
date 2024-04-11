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

const { width } = Dimensions.get('window');
const IMG_HEIGHT = 180;

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
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: signOut, style: 'destructive' },
      ],
      { cancelable: false }
    );
  };



  return (
  <>
  <StatusBar style='light'/>
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>

        <Animated.View style={[{ backgroundColor: 'transparent', position: 'relative' }, imageAnimatedStyle]}>

          <Image
            source={{ uri: user?.image }}
            style={[styles.image]}
            resizeMode="cover"
          />
          <BlurView experimentalBlurMethod='dimezisBlurView' intensity={30}  tint="dark"  style={styles.blurContainer}/>
        </Animated.View>

        <View style={{ marginTop: -40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <View style={{ height: 86, width: 86, borderRadius: 86, borderColor: 'white', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: user?.image }} style={{ height: 80, width: 80, borderRadius: 80 }} />
          </View>
        </View>


          <AccountSettings/>

    
      </Animated.ScrollView>

      <Animated.View style={{ height: 50, display: 'flex', position: 'absolute', bottom: 0, alignSelf: 'center' }} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={() => handleLogout()} style={[{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'black', borderRadius: 8, borderColor: 'gray', borderWidth: 2 }]}>
            <Text fontWeight='bold' style={{ color: 'white' }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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