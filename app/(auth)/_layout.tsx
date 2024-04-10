import { View } from '@/components/Themed'
import LoadingScreen from '@/components/indicators/loading-screen'
import { useAuth } from '@/hooks/useAuth'
import { Stack } from 'expo-router'
import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const AuthLayout = () => {

    const {isLoaded} = useAuth()

    if (!isLoaded) {
        return  <LoadingScreen/>
    }

    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ presentation: 'modal' }} />
        </Stack>
    )
}



export default AuthLayout