import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAuth } from '@/providers/AuthProvider';
import { ServerError } from '@/api/utils/';
import { router } from 'expo-router';

interface FormData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default function Index() {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormData>();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await signUp(data);
      router.replace('(auth)/OTP');
    } catch (error) {
      const e = error as ServerError;
      setError('root', {
        type: 'manual',
        message: e.message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollView}
        >
          <View style={styles.formContainer}>
            <Image
              style={styles.logo}
              source={require('../../../assets/images/logo.png')}
            />
            <Text style={styles.title}>Login to Inspect</Text>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  autoCapitalize="none"
                  placeholder="Email"
                  style={[
                    styles.input,
                    focusedField === 'email' && styles.focusedInput
                  ]}
                  placeholderTextColor="#A0A0A0"
                  onBlur={() => { onBlur(); setFocusedField(null); }}
                  onFocus={() => setFocusedField('email')}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email?.message && (
              <Text style={styles.errorText}>{errors.email?.message}</Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number, and 1 special character',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  style={[
                    styles.input,
                    focusedField === 'password' && styles.focusedInput
                  ]}
                  placeholderTextColor="#A0A0A0"
                  onBlur={() => { onBlur(); setFocusedField(null); }}
                  onFocus={() => setFocusedField('password')}
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password?.message && (
              <Text style={styles.errorText}>{errors.password?.message}</Text>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First Name"
                  style={[
                    styles.input,
                    focusedField === 'firstName' && styles.focusedInput
                  ]}
                  placeholderTextColor="#A0A0A0"
                  onBlur={() => { onBlur(); setFocusedField(null); }}
                  onFocus={() => setFocusedField('firstName')}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
            {errors.firstName?.message && (
              <Text style={styles.errorText}>{errors.firstName?.message}</Text>
            )}
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Last Name"
                  style={[
                    styles.input,
                    focusedField === 'lastName' && styles.focusedInput
                  ]}
                  placeholderTextColor="#A0A0A0"
                  onBlur={() => { onBlur(); setFocusedField(null); }}
                  onFocus={() => setFocusedField('lastName')}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastName"
            />
            {errors.lastName?.message && (
              <Text style={styles.errorText}>{errors.lastName?.message}</Text>
            )}
            {errors.root?.message && (
              <Text style={styles.errorText}>{errors.root?.message}</Text>
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.submitButtonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signInButton}
              onPress={() => router.replace('(auth)')}
            >
              <Text style={styles.signInButtonText}>
                Already Have an Account? Sign In!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  logo: {
    width: '75%',
    alignSelf: 'center',
  },
  title: {
    paddingTop: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    marginBottom: 11,
    height: 55,
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#C0C0C0',
    color: '#ccffff',
    borderWidth: 1,
    padding: 12,
  },
  focusedInput: {
    borderColor: '#f20d0d',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 16,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: '#f20d0d',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '90%',
  },
  submitButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  signInButton: {
    marginTop: 16,
    alignSelf: 'center',
    borderRadius: 8,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    backgroundColor: '#0099FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '90%',
  },
  signInButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
});
