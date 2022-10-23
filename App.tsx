import "react-native-gesture-handler";

import { StyleSheet, Text, View } from "react-native";
import Ripple from "./components/Ripple";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView
} from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Ripple
          style={styles.ripple}
          onTap={() => {
            console.log("tap");
          }}
        >
          <Text>Tap</Text>
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  ripple: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 25,
    //ios
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 20,
    //android
    elevation: 2
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "blue",
    alignSelf: "center"
  }
});
