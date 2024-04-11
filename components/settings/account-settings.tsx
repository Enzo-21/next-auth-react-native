import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { z } from 'zod';
import { Input } from '../ui/input';
import { View } from '../ui/view';

const AccountSettings = () => {

  const { user } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [successMessage, setSuccessMessage] = useState<string>()
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef(null);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name as string | undefined,
      email: user?.email as string | undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role as string | undefined,
      is2FAenabled: user?.is2FAenabled as boolean,
      hasCredentials: user?.hasCredentials as boolean
    }
  })

  return (
    <View style={styles.infoContainer}>
      <Text fontWeight='bold' style={styles.title}>My Account</Text>

      <Text style={styles.name}>
        {user?.name}
      </Text>

      <Text style={styles.email}>
        {user?.email}
      </Text>

      <Input
        ref={inputRef}
        placeholder="Enter text"
        keyboardType="default"
        autoCapitalize="words"
        autoCorrect={false}
      />
      <View style={styles.divider} />

      <View style={{ gap: 15 }}>

        <View>
          <Text fontWeight='semi_bold' style={{ fontSize: 16, marginBottom: 5 }}>Role</Text>
          <Text>{user?.role}</Text>
        </View>

        <View>
          <Text fontWeight='semi_bold' style={{ fontSize: 16, marginBottom: 5 }}>2FA</Text>
          <Text>{user?.is2FAenabled.toString()}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.description}>{JSON.stringify(user)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    padding: 24,
  },
  title: {
    fontSize: 26,
  },
  name: {
    fontSize: 18,
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'grey',
    marginVertical: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'grey',
    marginVertical: 16,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  blurContainer: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  },
});

export default AccountSettings