
import { getTokenFromSecureStore } from "@/hooks/useToken";
import api from "@/services/api/api-manager"

const getCurrentUser = async () => {

        // Check if there's a token
        const token = await getTokenFromSecureStore()
        if (!token) {
          throw new Error('No token found');
        }
  
        // Make API call to fetch user data
        const response = await api.get('/api/auth/me');
  
        return response.data;
        
}

export const UserService = {
    getCurrentUser
}