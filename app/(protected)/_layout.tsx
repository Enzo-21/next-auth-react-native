import { Stack } from 'expo-router'
import React from 'react'

const MainApp = () => {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
    )
}

export default MainApp