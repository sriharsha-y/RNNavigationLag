import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';

const {width, height} = Dimensions.get('window');

// Number of animated boxes to render
const BOX_COUNT = 500;
// Starting size of each box
const BOX_SIZE = 50;

// Component that will be rendered multiple times
const AnimatedBox = ({index}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    // Create an infinite animation loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 2000 + index * 10, // Stagger animations
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 2000 + index * 10,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // Interpolate multiple animated values
  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const scale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.5, 1],
  });

  const translateX = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 50, 0],
  });

  const backgroundColor = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#FF5733', '#33FF57', '#3357FF'],
  });

  return (
    <Animated.View
      style={[
        styles.box,
        {
          transform: [{rotate}, {scale}, {translateX}],
          backgroundColor,
          opacity: index % 2 === 0 ? animation : 1,
        },
      ]}>
      <Text style={styles.boxText}>{index}</Text>
    </Animated.View>
  );
};

// Main component that renders many AnimatedBoxes
const HeavyRenderingComponent = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRendering, setIsRendering] = useState(true);

  // Function to force a re-render
  const handleRefresh = () => {
    setIsRendering(false);
    setTimeout(() => {
      setRefreshKey(prevKey => prevKey + 1);
      setIsRendering(true);
    }, 100);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Heavy Rendering Demo</Text>
      <Text style={styles.subtitle}>Rendering {BOX_COUNT} animated boxes</Text>

      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}>
        {isRendering &&
          Array(BOX_COUNT)
            .fill(0)
            .map((_, index) => (
              <AnimatedBox key={`${refreshKey}-${index}`} index={index} />
            ))}
      </Animated.ScrollView>

      <Text style={styles.refreshButton} onPress={handleRefresh}>
        Refresh (Warning: Heavy Process)
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  scrollContainer: {
    width: width,
    height: height * 0.8,
  },
  scrollContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    margin: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  refreshButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007AFF',
    color: 'white',
    borderRadius: 8,
    fontWeight: 'bold',
  },
});

export default HeavyRenderingComponent;
