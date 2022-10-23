import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  measure,
  runOnJS,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";

interface RippleProps {
  style?: StyleProp<ViewStyle>;
  onTap?: () => void;
  children?: ReactNode;
}

//use runOnJS to run the prop function on same thread

const Ripple: React.FC<RippleProps> = ({ style, onTap, children }) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const aRef = useAnimatedRef<View>();
  const width = useSharedValue(0);
  const height = useSharedValue(0);

  const rippleOpacity = useSharedValue(0.8);

  const tap = Gesture.Tap()
    .onStart(tapEvent => {
      const layout = measure(aRef);
      width.value = layout.width;
      height.value = layout.height;

      centerX.value = tapEvent.x;
      centerY.value = tapEvent.y;

      rippleOpacity.value = 0.8;
      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });

      if (onTap) runOnJS(onTap)();
    })
    .onEnd(() => {
      rippleOpacity.value = withTiming(0, { duration: 1000 });
    });

  const rStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2);
    //substract the radius to align the circle in the middle
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: "#00F076",
      position: "absolute",
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
        {
          scale: scale.value
        }
      ]
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <View ref={aRef} style={style}>
        <Animated.View style={[style, { overflow: "hidden" }]}>
          <Animated.View>{children}</Animated.View>
          <Animated.View style={rStyle} />
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default Ripple;
