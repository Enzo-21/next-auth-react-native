import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useRef, useState, useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { z } from 'zod';
import { Input } from '../ui/input';
import { View } from '../ui/view';
import { fonts } from '@/lib/constants/Fonts';
import { AccountsService } from '@/services/accounts-service';
import { ToastProvider, useToast } from '../ui/toast';
import { useMutation } from '@tanstack/react-query';

const AccountSettings = () => {

  const { user, authenticate, signOut } = useAuth()
  const { toast } = useToast();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: signOut, style: 'destructive' },
      ],
      { cancelable: false }
    );
  };

  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof SettingsSchema>) => AccountsService.updateSettings(values),
    onSuccess(data) {
      if (data.error) toast({ message: data.error, variant: 'destructive' })
      if (data.success) {
        authenticate()
        toast({ message: data.success, variant: 'success' })
      }
    },
    onError() {
      toast({ message: 'Something went wrong' })
    },
  })

  const triggerUpdate = (values: z.infer<typeof SettingsSchema>) => {
    mutation.mutate(values)
  }

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
      <Text style={styles.title}>My Account</Text>

      <View style={{ marginTop: 30, flex: 1, justifyContent: 'space-between' }}>

        <View>
          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.label}>Name</Text>
                <Input
                  placeholder="Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="name"
          />

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.label}>Email</Text>
                <Input
                  placeholder="Your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  disabled={true}
                />
              </View>
            )}
            name="email"
          />

          <Controller
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.label}>Role</Text>
                <Input
                  placeholder="Select a role"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </View>
            )}
            name="role"
          />

          <View style={styles.divider} />
        </View>



        <TouchableOpacity onPress={form.handleSubmit(triggerUpdate)} style={styles.saveBtn}>
          {mutation.isPending ? (
            <ActivityIndicator color={'white'} />
          ) : (
            <Text style={{ color: 'white', fontFamily: fonts.primary_extra_bold }}>Save</Text>
          )}

        </TouchableOpacity>

      </View>


    </View>

  )
}

const styles = StyleSheet.create({
  infoContainer: {
    padding: 24,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: fonts.primary_bold
  },
  input: {
    marginTop: 10
  },
  label: {
    fontFamily: fonts.primary_bold
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
  saveBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#156ab0',
    borderRadius: 8,
    marginTop: 15,
  },
});

export default AccountSettings