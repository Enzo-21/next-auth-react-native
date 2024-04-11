import { SettingsSchema } from "@/schemas";
import api from "@/services/api/api-manager"
import { z } from "zod";

const updateAccountSettings = async (
    values: z.infer<typeof SettingsSchema>,
) => {
 
        // Make API call to fetch user data
        const response = await api.post('/api/settings', {values});
  
        return response.data;
        
}

export const AccountsService = {
    updateAccountSettings
}