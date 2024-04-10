import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useAuth } from '@/hooks/useAuth';
import { Dimensions, Image, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
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
    <View style={styles.container}>
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        ref={scrollRef}
        scrollEventThrottle={16}>

        <Animated.Image
          source={{ uri: user?.image }}
          style={[styles.image, imageAnimatedStyle]}
          resizeMode="cover"
        />
        <View style={{ marginTop: -40, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <View style={{ height: 86, width: 86, borderRadius: 86, borderColor: 'white', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image source={{ uri: user?.image }} style={{ height: 80, width: 80, borderRadius: 80 }} />
          </View>
        </View>


        <View style={styles.infoContainer}>
          <Text style={styles.name}>My Account</Text>
          <Text style={styles.location}>
            {user?.name}
          </Text>
          <Text style={styles.rooms}>
            {user?.email}
          </Text>

          <View style={styles.divider} />

          <View style={{gap: 15}}>

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 5}}>Role</Text>
              <Text>{user?.role}</Text>
            </View>

            <View>
              <Text style={{ fontWeight: '500', fontSize: 16, marginBottom: 5}}>2FA</Text>
              <Text>{user?.is2FAenabled.toString()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.description}>{JSON.stringify(user)}</Text>
        </View>
      </Animated.ScrollView>

      <Animated.View style={{ height: 50, display: 'flex', position: 'absolute', bottom: 0, alignSelf: 'center' }} entering={SlideInDown.delay(200)}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
          <TouchableOpacity onPress={()=> handleLogout()} style={[{ paddingHorizontal: 20, paddingVertical: 10, backgroundColor: 'black', borderRadius: 8, borderColor: 'gray', borderWidth: 2}]}>
            <Text style={{color: 'white', fontWeight: '700'}}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
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
  infoContainer: {
    padding: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 18,
    marginTop: 10,
  },
  rooms: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 4,
  },
  ratings: {
    fontSize: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'grey',
  },
  hostView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  header: {
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'grey',
  },

  description: {
    fontSize: 16,
    marginTop: 10,
  },
});