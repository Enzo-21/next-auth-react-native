import { SettingsSchema } from "@/schemas";
import api from "@/services/api/api-manager"
import { z } from "zod";

const updateSettings = async (values: z.infer<typeof SettingsSchema>) => {
    const response = await api.post('/api/settings', values);
    return response.data;
}

export const AccountsService = {
    updateSettings
}