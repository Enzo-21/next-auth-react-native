import api from '@/services/api/api-manager';
import { useQuery } from '@tanstack/react-query';
import { getTokenFromSecureStore, removeTokenFromSecureStore } from './useSecureStore';


export const useAuth = () => {
  const query = useQuery({
    queryKey: ['auth'],
    queryFn: async () => {

      // Check if there's a token
      const token = await getTokenFromSecureStore()
      if (!token) {
        throw new Error('No token found');
      }

      // Make API call to fetch user data
      const response = await api.get('/api/auth/me');

      return response.data;
    },
  })

  const logout = async () => {
    // Remove the token from the secure store
    await removeTokenFromSecureStore();
    // Invalidate the query cache
    await query.refetch();
  };

  return { query, logout }

}
