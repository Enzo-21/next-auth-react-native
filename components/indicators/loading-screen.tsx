import React from 'react'
import { View } from '../Themed'
import { ActivityIndicator, StyleSheet } from 'react-native'

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