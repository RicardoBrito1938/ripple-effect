import "react-native-gesture-handler";

import { StyleSheet, Text, View } from "react-native";
import Ripple from "./components/Ripple";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
          <Text style={styles.text}>Tap</Text>
        </Ripple>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#0C0D0D",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 24
  },
  ripple: {
    width: "100%",
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4B4E4D",
    borderRadius: 8,
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
  text: {
    color: "white",
    fontWeight: "700"
  }
});
