//import useSecureStore from '@/hooks/useSecureStore';
//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { WebView } from 'react-native-webview';

import { useAuth } from '@/hooks/useAuth';
import useToken from '@/hooks/useToken';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const Auth = () => {
    const { removeToken, setToken } = useToken();
    const { signIn } = useAuth();

    const userAgent = 'Mozilla/5.0 (Linux; Android 12.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36';

    // Listen for URL changes in the WebView
    const handleNavigationStateChange = async (navState: { url: string }) => {
        const { url } = navState;

        if (url.includes('accessToken=')) {
            const regex = /accessToken=([^&]+)/;
            const match = url.match(regex);

            if (match && match[1]) {
                const token = decodeURIComponent(match[1]);

                // Delete the old token in case there's one
                await removeToken();

                // Store the token securely
                await setToken(token);

                // Get the user
                await signIn()
            }

        }
    };


    return (
        <WebView
            style={styles.container}
            source={{ uri: 'http://localhost:3000/auth/mobile?newVisit=true' }}
            onNavigationStateChange={handleNavigationStateChange}
            userAgent={userAgent}
            renderLoading={() => {
                return (
                    <View style={styles.activityIndicator}>
                        <ActivityIndicator size="large" color="black" />
                    </View>
                )
            }}
            startInLoadingState={true}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
});

export default Auth;
