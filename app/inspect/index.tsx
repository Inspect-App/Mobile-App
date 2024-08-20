import { Link } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import {
  Camera,
  runAsync,
  useCameraDevice,
  useFrameProcessor,
  Frame,
} from 'react-native-vision-camera'
import {
  Face,
  useFaceDetector,
  FaceDetectionOptions,
} from 'react-native-vision-camera-face-detector'
import { Worklets } from 'react-native-worklets-core'
import RNFS from 'react-native-fs'
import Toast from 'react-native-toast-message'
import { PERMISSIONS, RESULTS, checkMultiple, requestMultiple } from 'react-native-permissions'
import { useNavigation } from '@react-navigation/native'

const Index = () => {
  const faceDetectionOptions = useRef<FaceDetectionOptions>({ performanceMode: 'fast' }).current
  const camera = useRef<Camera>(null)
  const device = useCameraDevice('front')
  const [isRecording, setIsRecording] = useState(false)
  const { detectFaces } = useFaceDetector(faceDetectionOptions)
  const [permissionsGranted, setPermissionsGranted] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const cameraStatus = await checkMultiple([
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.IOS.CAMERA,
        ])
        const microphoneStatus = await checkMultiple([
          PERMISSIONS.ANDROID.RECORD_AUDIO,
          PERMISSIONS.IOS.MICROPHONE,
        ])

        if (
          cameraStatus[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED &&
          cameraStatus[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED
        ) {
          const cameraPermission = await requestMultiple([
            PERMISSIONS.ANDROID.CAMERA,
            PERMISSIONS.IOS.CAMERA,
          ])
          if (
            cameraPermission[PERMISSIONS.ANDROID.CAMERA] !== RESULTS.GRANTED &&
            cameraPermission[PERMISSIONS.IOS.CAMERA] !== RESULTS.GRANTED
          ) {
            Alert.alert('Camera permission is required to use this feature.')
          }
        }

        if (
          microphoneStatus[PERMISSIONS.ANDROID.RECORD_AUDIO] !== RESULTS.GRANTED &&
          microphoneStatus[PERMISSIONS.IOS.MICROPHONE] !== RESULTS.GRANTED
        ) {
          const microphonePermission = await requestMultiple([
            PERMISSIONS.ANDROID.RECORD_AUDIO,
            PERMISSIONS.IOS.MICROPHONE,
          ])
          if (
            microphonePermission[PERMISSIONS.ANDROID.RECORD_AUDIO] !== RESULTS.GRANTED &&
            microphonePermission[PERMISSIONS.IOS.MICROPHONE] !== RESULTS.GRANTED
          ) {
            Alert.alert('Microphone permission is required to record audio.')
          }
        }
        setPermissionsGranted(true)
        Toast.show({
          type: 'info',
          text1: 'Looking for faces',
          visibilityTime: 3000,
          autoHide: true,
        })
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: (error as Error).message,
          visibilityTime: 3000,
          autoHide: true,
        })
      }
    }
    requestPermissions()
    const unsubscribeBlur = navigation.addListener('blur', async () => {
      if (camera.current) {
        camera.current.cancelRecording()
      }
    })
    return () => {
      unsubscribeBlur()
    }
  }, [navigation])

  const saveToInternalStorage = async (path: string) => {
    try {
      const internalPath = `${RNFS.DocumentDirectoryPath}/video_${Date.now()}.mp4`
      await RNFS.moveFile(path, internalPath)
      Toast.show({
        type: 'success',
        text1: 'Video saved, looking for faces again.',
        visibilityTime: 3000,
        autoHide: true,
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: (error as Error).message,
        visibilityTime: 3000,
        autoHide: true,
      })
    }
  }

  const stopRecording = async () => {
    if (camera.current) {
      let errorCount = 0
      try {
        await camera.current.stopRecording()
        Toast.show({
          type: 'info',
          text1: 'Video recording stopped',
          visibilityTime: 3000,
          autoHide: true,
        })
        setIsRecording(false)
      } catch (error) {
        const errorMessage = (error as Error).message
        if (errorMessage.includes('A recording is already in progress')) {
          if (errorCount > 1) {
            errorCount = errorCount + 1
          } else {
            throw error
          }
        }
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Camera reference is null or not recording',
        visibilityTime: 3000,
        autoHide: true,
      })
    }
  }

  const startRecording = Worklets.createRunOnJS(async () => {
    try {
      let errorCount = 0
      if (!isRecording && camera.current) {
        setIsRecording(true)
        camera.current.startRecording({
          onRecordingFinished: (video) => {
            const path = video.path
            saveToInternalStorage(`file://${path}`)
          },
          onRecordingError: (error) => {
            if (error.message.includes('A recording is already in progress')) {
              if (errorCount > 1) {
                errorCount = errorCount + 1
              } else {
                throw error
              }
            }
          },
        })
        Toast.show({
          type: 'info',
          text1: 'Faces detected, Video recording started',
          visibilityTime: 3000,
          autoHide: true,
        })
        setTimeout(async () => {
          await stopRecording()
        }, 6000)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Camera reference is null or already recording',
          visibilityTime: 3000,
          autoHide: true,
        })
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: (error as Error).message,
        visibilityTime: 3000,
        autoHide: true,
      })
    }
  })

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    'worklet'
    if (!isRecording && faces.length > 0) {
      startRecording()
    }
  })

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet'
      try {
        if (!isRecording) {
          const faces = detectFaces(frame)
          if (faces.length > 0) {
            handleDetectedFaces(faces)
          }
        }
      } catch (error) {
        console.error('Frame processing error: ', error)
      }
    },
    [handleDetectedFaces]
  )

  const ads = [
    { id: '1', title: 'Watch a 30s ad for 2 mins' },
    { id: '2', title: 'Watch a 30s ad for 2 mins' },
    { id: '3', title: 'Watch a 30s ad for 2 mins' },
    { id: '4', title: 'Watch a 30s ad for 2 mins' },
  ]

  if (!permissionsGranted) {
    return (
      <View>
        <Text>Camera and Microphone permission is required to use this feature.</Text>
      </View>
    )
  }

  return (
    <View className="h-full w-full bg-light-50 px-4 dark:bg-dark-50">
      {device ? (
        <Camera
          ref={camera}
          isActive={true}
          device={device}
          frameProcessor={frameProcessor}
          video={true}
          audio={true}
          style={{ width: '25%', height: '25%' }}
        />
      ) : (
        <Text>No Device</Text>
      )}
      <View className="flex w-full flex-row items-center justify-between py-6">
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-2xl bg-light-100 px-20 py-4 dark:bg-dark-100">
            <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">08</Text>
          </View>
          <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Minutes</Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <View className="rounded-2xl bg-light-100 px-20 py-4 dark:bg-dark-100">
            <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">05</Text>
          </View>
          <Text className="mt-4 text-xl text-light-950 dark:text-dark-950">Seconds</Text>
        </View>
      </View>
      <View>
        <Text className="mb-4 mt-6 text-2xl font-bold text-light-950 dark:text-dark-950">
          Gain More Time
        </Text>
        <FlatList
          horizontal={true}
          data={ads}
          renderItem={AdItem}
          keyExtractor={(item) => item.id}
          persistentScrollbar={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View className="mt-28 flex h-[200px] w-full flex-row items-center justify-center">
        <Link href={{ pathname: '/inspectingMode' }}>
          <View className="flex w-[300px] items-center justify-center rounded-full bg-[#F20D0D] py-4">
            <Text className="text-xl font-bold text-light-50">Start Inspecting</Text>
          </View>
        </Link>
      </View>
      <Toast position="bottom" bottomOffset={20} />
    </View>
  )
}

function AdItem({ item }: { item: { id: string; title: string } }) {
  return (
    <View className="mr-5 flex flex-col gap-y-5">
      <View className="h-60 w-60 rounded-2xl bg-light-100 dark:bg-dark-100" />
      <Text className="text-lg text-light-950 dark:text-dark-950">{item.title}</Text>
    </View>
  )
}

export default Index
