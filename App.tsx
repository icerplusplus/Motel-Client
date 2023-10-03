import "expo-dev-client";

import { store } from "@/stores";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { NativeWindStyleSheet } from "nativewind";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetProvider } from "@/contexts";
import { TabNavigator } from "@/navigators";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";

export default function App() {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <PaperProvider>
              <BottomSheetProvider>
                <TabNavigator />
              </BottomSheetProvider>
            </PaperProvider>
          </QueryClientProvider>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

NativeWindStyleSheet.setOutput({
  default: "native",
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
