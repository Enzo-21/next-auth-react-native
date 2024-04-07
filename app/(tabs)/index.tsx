import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';


export default function TabOneScreen() {

  const router = useRouter();
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push('/(modals)/auth')} style={styles.loginBtn} >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    backgroundColor: 'black',
    padding: 15,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
