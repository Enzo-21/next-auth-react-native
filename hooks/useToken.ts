import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export const getTokenFromSecureStore = async (): Promise<string | null> => {
  try {
    const token = await SecureStore.getItemAsync('accessToken');
    return token;
  } catch (error) {
    console.error('Error fetching token from SecureStore:', error);
    return null;
  }
};

export const saveTokenToSecureStore = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync('accessToken', token);
  } catch (error) {
    console.error('Error saving token to SecureStore:', error);
  }
};

export const removeTokenFromSecureStore = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync('accessToken');
  } catch (error) {
    console.error('Error removing token from SecureStore:', error);
  }
};

const useToken = () => {
  // Initialize token state
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Fetch token from SecureStore when component mounts
    const fetchToken = async () => {
      const storedToken = await getTokenFromSecureStore();
      if (storedToken) {
        setToken(storedToken);
      }
    };
    fetchToken();
  }, []);

  // Function to set the access token
  const setAuthToken = async (newToken: string) => {
    setToken(newToken);
    await saveTokenToSecureStore(newToken);
  };

  // Function to remove the access token
  const removeToken = async () => {
    setToken(null);
    await removeTokenFromSecureStore();
  };

  return { token, setToken: setAuthToken, removeToken };
};

export default useToken;
