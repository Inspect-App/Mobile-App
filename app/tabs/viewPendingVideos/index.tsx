import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import TinderCard from 'react-tinder-card';
import { useColorScheme } from '@/hooks/useColorScheme';

function Simple() {
  const videos = [
    {
      title: 'Video 1',
      duration: '1:00',
    },
    {
      title: 'Video 2',
      duration: '2:00',
    },
    {
      title: 'Video 3',
      duration: '3:00',
    },
    {
      title: 'Video 4',
      duration: '4:00',
    },
    {
      title: 'Video 5',
      duration: '5:00',
    },
  ];

  const swiped = (direction: string, nameToDelete: string) => {
    console.log('removing: ' + nameToDelete);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  const colorScheme = useColorScheme();

  return (
    <View className="flex h-screen w-screen items-center bg-light-50 px-4 py-4 dark:bg-dark-50">
      <View className="flex-1 h-[500px] w-full">
        {videos.map((video) => (
          <View key={video.title}>
            <TinderCard
              onSwipe={(dir) => {
                swiped(dir, video.title);
              }}
              onCardLeftScreen={() => {
                outOfFrame(video.title);
              }}
            >
              <View className="absolute left-1 right-1 h-[680px] w-[404px] resize rounded-2xl bg-light-100 dark:bg-dark-100">
                <View className="absolute bottom-0 w-full px-6 py-2">
                  <Text className="text-2xl font-bold text-light-950 dark:text-dark-950">
                    {video.title}
                  </Text>
                  <Text className="text-lg text-light-800 dark:text-dark-900">
                    {video.duration}
                  </Text>
                </View>
              </View>
            </TinderCard>
          </View>
        ))}
      </View>
      <View className="fixed bottom-28 w-full items-center justify-center">
        <Link href="/inspect">
          <View className="flex flex-row justify-center gap-2 rounded-full bg-light-100 px-5 py-4 dark:bg-dark-100">
            <AntDesign name="camera" size={24} color={colorScheme === 'dark' ? 'white' : 'black'} />
            <Text className="text-xl font-bold text-light-950 dark:text-dark-950">Inspect</Text>
          </View>
        </Link>
      </View>
    </View>
  );
}

export default Simple;
