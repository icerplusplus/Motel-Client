import { store } from "@/stores";
import React from "react";
import { View, Text } from "react-native";
import { Provider } from "react-redux";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DefaultTheme}>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
};

export default Layout;
