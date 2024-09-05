import ParallaxScrollAnimation from '@/components/animations/ParallaxScrollAnimation';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex:1}}>
      <ParallaxScrollAnimation/>
    </SafeAreaView>
  );
}

