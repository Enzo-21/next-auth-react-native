import LoadingScreen from '@/components/indicators/loading-screen'
import { useAuth } from '@/hooks/useAuth'
import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {

    const { isLoaded } = useAuth()

    if (!isLoaded) {
        return <LoadingScreen />
    }

    return (
        <Stack>
            <Stack.Screen name="welcome" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ presentation: 'modal', headerShown: false }} />
        </Stack>
    )
}



export default AuthLayout