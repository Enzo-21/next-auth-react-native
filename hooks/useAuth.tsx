import { UserService } from "@/services/user-service";
import { useRouter, useSegments } from "expo-router";
import React, { Context, createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import useToken from "./useToken";

// Define AuthContext
export const AuthContext = createContext<any>(null); // Provide a default type or specify your custom type

export const useAuth = () => {
    return useContext(AuthContext)
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


    const authenticate = async () => {
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
        authenticate()
    }, [])



    return (
        <AuthContext.Provider value={{
            user,
            signIn: authenticate,
            signOut: async () => {
                await removeToken()
                setUser(null)
                setIsLoaded(true)
            },
            error,
            isLoaded 
        }}>
            {children}
        </AuthContext.Provider>
    );
}
