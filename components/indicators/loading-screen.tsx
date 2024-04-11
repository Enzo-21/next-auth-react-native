import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { View } from '../ui/view';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
            <ActivityIndicator/>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  

export default LoadingScreen