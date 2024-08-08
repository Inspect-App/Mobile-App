import React, { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native'
import OtpTextInput from 'react-native-text-input-otp'
import { useAuth } from '@/providers/AuthProvider'
import { router } from 'expo-router'
import { ServerError } from '@/api/utils/ResponseError'

type OtpForm = {
  otp: string
}

const Index = () => {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(0)
  const colorScheme = useColorScheme()

  const isDarkMode = colorScheme === 'dark'

  // react hook form
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<OtpForm>()

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const handleResendCode = () => {
    setCountdown(60)
    // Add your resend code logic here
  }

  const { user, verify } = useAuth()

  const onSubmit = async (data: { otp: string }) => {
    try {
      console.log('Submitting OTP:', data.otp)
      if (!user) {
        throw new Error('User is not defined')
      }

      await verify({
        email: user.email,
        verificationCode: data.otp,
      })

      // Log the intended navigation path
      console.log('Navigating to login page')
      router.replace('tabs') // Adjust this path as needed

      console.log('Verification successful')
    } catch (error) {
      const e = error as ServerError
      setError('root', {
        type: 'manual',
        message: e.message,
      })
      console.log('Verification error:', e.message)
    }
  }

  const styles = StyleSheet.create({
    OtpTextInput: {
      borderRadius: 0,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      height: 40,
      color: isDarkMode ? 'white' : 'black',
    },
    focusedStyle: {
      borderColor: '#5cb85c',
      borderBottomWidth: 2,
    },
    fontStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? 'white' : 'black',
    },
    button: {
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginBottom: 10,
    },
    resendButton: {
      backgroundColor: '#e0e0e0', // Light background for resend button
      // Smaller padding for resend button
      paddingVertical: 8,
      paddingHorizontal: 16,
    },
    nextButton: {
      backgroundColor: '#F20D0D', // Red background for next button
      // Larger padding for next button
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
  })

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex h-full items-center justify-center bg-light-50 px-4 dark:bg-dark-50">
        <Image source={require('@/assets/images/logo.png')} />
        <Text className="mt-10 text-2xl font-bold dark:text-dark-950">Enter The Code</Text>
        <Text className="mb-5 mt-5 dark:text-dark-950">
          We sent a 6-digit code to your email. Enter it below.
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <OtpTextInput
              otp={value}
              setOtp={onChange}
              digits={6}
              style={styles.OtpTextInput}
              fontStyle={styles.fontStyle}
              focusedStyle={styles.focusedStyle}
            />
          )}
          name="otp"
          rules={{ required: 'OTP is required' }}
          defaultValue=""
        />
        {errors.root && <Text className="mt-2 text-sm text-red-500">{errors.root.message}</Text>}
        <View className="mt-10 flex w-full items-center">
          <TouchableOpacity
            style={[styles.button, styles.resendButton, { opacity: countdown > 0 ? 0.6 : 1 }]}
            onPress={handleResendCode}
            disabled={countdown > 0}
          >
            <Text
              className="text-center font-bold"
              style={{ color: countdown > 0 ? '#aaa' : '#000' }}
            >
              {countdown > 0 ? `${countdown} seconds` : 'Resend Code'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-center font-bold text-white">Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Index
