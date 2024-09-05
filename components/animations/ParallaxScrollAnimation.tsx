import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const HEADER_HEIGHT = 70;
const PARALLAX_HEIGHT = 300;

const ParallaxScrollAnimation = () => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const backgroundStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-PARALLAX_HEIGHT, 0, PARALLAX_HEIGHT],
          [-PARALLAX_HEIGHT / 2, 0, PARALLAX_HEIGHT / 3],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [-PARALLAX_HEIGHT, 0, PARALLAX_HEIGHT],
          [-PARALLAX_HEIGHT / 1.5, 0, PARALLAX_HEIGHT / 2],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, PARALLAX_HEIGHT / 2],
      [1, 0],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.parallaxContainer}>
          <Animated.View style={[styles.backgroundContainer, backgroundStyle]}>
            <ImageBackground
              source={{ uri: 'https://picsum.photos/id/1018/1000/800' }}
              style={styles.backgroundImage}
            />
          </Animated.View>
          <Animated.View style={[styles.foregroundContainer, foregroundStyle]}>
            <Text style={styles.title}>Parallax Scroll</Text>
            <Text style={styles.subtitle}>A beautiful animation</Text>
          </Animated.View>
        </View>
        <View style={styles.content}>
          {[...Array(20)].map((_, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>Scroll me! - {index + 1}</Text>
            </View>
          ))}
        </View>
      </Animated.ScrollView>
      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.headerText}>Parallax Demo</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parallaxContainer: {
    height: PARALLAX_HEIGHT,
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PARALLAX_HEIGHT,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: PARALLAX_HEIGHT,
    resizeMode: 'cover',
  },
  foregroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: PARALLAX_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardText: {
    fontSize: 16,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ParallaxScrollAnimation;
