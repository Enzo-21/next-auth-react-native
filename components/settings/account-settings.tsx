import { Text } from '@/components/ui/text';
import { useAuth } from '@/hooks/useAuth';
import { fonts } from '@/lib/constants/Fonts';
import { SettingsSchema } from '@/schemas';
import { AccountsService } from '@/services/accounts-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { z } from 'zod';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { useToast } from '../ui/toast';
import { View } from '../ui/view';
import DropDown from '../ui/dropdown';
import { UserRoles } from '@/lib/constants/User';

const AccountSettings = () => {

  const { user, authenticate, signOut, isLoaded } = useAuth()
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
    onSuccess: async (data) => {
      if (data.error) toast({ message: data.error, variant: 'destructive' })
      if (data.success) {
        authenticate()
        toast({ message: data.success, variant: 'success', textColor: 'white', showProgress: false })
      }
    },
    onError() {
      toast({ message: 'Something went wrong' })
    },
  })

  const triggerUpdate = (values: z.infer<typeof SettingsSchema>) => {
    mutation.mutate(values)
  }

  const { handleSubmit, control, formState: { isDirty, isSubmitSuccessful, isSubmitted }, reset } = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name as string | undefined,
      email: user?.email as string | undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role as string | undefined,
      is2FAenabled: user?.is2FAenabled as boolean,
      hasCredentials: user?.hasCredentials as boolean
    },
  })

  if (!isLoaded) {
    return null
  }

  const saveButtonOpacity = useSharedValue(0);

  useEffect(() => {
    saveButtonOpacity.value = withSpring(isDirty ? 1 : 0);
  }, [isDirty]);

  const animatedSaveButtonStyle = useAnimatedStyle(() => {
    return {
      marginTop: 15,
      opacity: saveButtonOpacity.value,
      display: saveButtonOpacity.value ? 'flex' : 'none',
      transform: [{ scale: saveButtonOpacity.value }],
    };
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: UserRoles.ADMIN, value: UserRoles.ADMIN },
    { label: UserRoles.USER, value: UserRoles.USER },
  ]);

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.title}>My Account</Text>


      <View style={{ marginTop: 30, flex: 1, justifyContent: 'space-between' }}>


        <View>



          <Controller
            control={control}
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
            control={control}
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
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.label}>Role</Text>
                <DropDown
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={(value) => onChange(value)} 
                  setItems={setItems}
                />
              </View>
            )}
            name="role"
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.input}>
                <Text style={styles.label}>2FA</Text>
                <View style={[styles.twoFAbox]}>
                  <View style={{ padding: 1, flex: 1 }}>
                    <Text>Enable two factor authentication for your account</Text>
                  </View>
                  <Switch
                    thumbColor={'white'}
                    onValueChange={() => onChange(!value)} value={value}
                  />
                </View>
              </View>

            )}
            name="is2FAenabled"
          />


        </View>

        <View>

          <Animated.View style={[animatedSaveButtonStyle]}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleSubmit(triggerUpdate)}>
              {mutation.isPending ? (
                <ActivityIndicator color={'white'} />
              ) : (
                <Text style={{ color: 'white', fontFamily: fonts.primary_extra_bold }}>Save</Text>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider} />

          <TouchableOpacity onPress={() => handleLogout()} style={[styles.actionBtn, { backgroundColor: 'transparent', borderColor: 'gray', borderWidth: 1 }]}>
            <Text style={{ color: 'white', fontFamily: fonts.primary_extra_bold }}>Logout</Text>
          </TouchableOpacity>
        </View>




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
  twoFAbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 8,
    maxWidth: '100%'
  },
  label: {
    fontFamily: fonts.primary_bold,
    marginVertical: 5
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
  actionBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#156ab0',
    borderRadius: 8,
  },
});

export default AccountSettings