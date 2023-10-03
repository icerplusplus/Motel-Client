import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface ChatScreenProps {}

export const ChatScreen = (props: ChatScreenProps) => {
  return (
    <View style={styles.container}>
      <Text>ChatScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
