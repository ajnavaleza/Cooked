import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface CustomTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

const CustomTransition: React.FC<CustomTransitionProps> = ({
  children,
  isVisible,
  direction = 'right',
  duration = 600,
}) => {
  const translateAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isVisible) {
      // Slide in animation
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: duration * 0.8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide out animation
      Animated.parallel([
        Animated.timing(translateAnim, {
          toValue: getTranslateValue(direction),
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.3,
          duration: duration * 0.6,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isVisible, direction, duration, translateAnim, opacityAnim]);

  const getTranslateValue = (dir: string) => {
    switch (dir) {
      case 'left':
        return -width;
      case 'right':
        return width;
      case 'up':
        return -height;
      case 'down':
        return height;
      default:
        return width;
    }
  };

  const getTransform = () => {
    switch (direction) {
      case 'left':
      case 'right':
        return [{ translateX: translateAnim }];
      case 'up':
      case 'down':
        return [{ translateY: translateAnim }];
      default:
        return [{ translateX: translateAnim }];
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: opacityAnim,
        transform: getTransform(),
      }}
    >
      {children}
    </Animated.View>
  );
};

export default CustomTransition; 