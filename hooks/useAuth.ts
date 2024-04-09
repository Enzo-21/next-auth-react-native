import { create } from 'zustand';
import { useEffect, useState } from 'react';
import api from '@/services/api/api-manager';
import { removeTokenFromSecureStore } from './useSecureStore';



interface AuthStore {
  isLoaded: boolean;
  user: any;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

// Zustand store for authentication state
const useAuthStore = create<AuthStore>((set) => ({
  isLoaded: false,
  user: null,
  login: async () => {
    try {
      // Simulate API call delay
      const response = await api.get('/api/auth/me');
  
      if (response.data) {
        set({ isLoaded: true, user: response.data || null });
      }
    } catch (error) {

      set({ isLoaded: true, user: null });
    }

  },
  logout: async () => {
    set({ isLoaded: true, user: null });
    await removeTokenFromSecureStore()
  }
}));

// Custom hook for accessing authentication state and functions
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true); // State to track loading state
  const { isLoaded, user, login, logout } = useAuthStore();

  useEffect(() => {
    // Call the login function when component mounts
    login()
      .then(() => setIsLoading(false)); // Once login is complete, set isLoading to false
  }, []); // Run only on mount

  // If still loading, return loading indicator or null
  if (isLoading) {
    return { isLoaded: false, user: null, login, logout };
  }

  return { isLoaded, user, login, logout };
};
