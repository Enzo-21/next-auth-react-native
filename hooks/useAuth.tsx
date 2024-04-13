import { UserService } from "@/services/user-service";
import { useRouter, useSegments } from "expo-router";
import React, { Context, createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useToken from "./useToken";

interface AuthContextType {
    user: any;
    authenticate: () => Promise<void>;
    signOut: () => Promise<void>;
    error: any;
    isLoaded: boolean;
}

// Define AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define useAuth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context as AuthContextType; // Assert non-null for context value
}
// Define Provider component
export function AuthProvider({ children }: PropsWithChildren<{}>) {

    const rootSegment = useSegments()
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [isLoaded, setIsLoaded] = useState<any>(false)
    const { removeToken } = useToken()

    useEffect(() => {

        if (!user && rootSegment[0] !== "(auth)") {
            router.replace('/(auth)/welcome')
        } else if (user && rootSegment[0] !== '(protected)') {
            router.replace('/(protected)/(tabs)/account')
        }


    }, [user])


    const getMe = async () => {
       
        try {
            // Get the user
            const user = await UserService.getCurrentUser()
            if (user) setUser(user)
            setIsLoaded(true)
        } catch (error) {
            router.replace('/(auth)/welcome')
            setError(JSON.stringify(error))
            setUser(null)
            setIsLoaded(true)
        }
    }

    useEffect(() => {
        getMe()
    }, [])

    const contextValue: AuthContextType = {
        user,
        authenticate: getMe,
        signOut: async () => {
            await removeToken()
            setUser(null)
            setIsLoaded(true)
        },
        error,
        isLoaded
    };


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}
