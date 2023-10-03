import { global } from "@/utils/root.style";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomSheet } from "react-native-btr";

interface BottomSheetContextProps {
  setView: (content: React.ReactNode) => void;
  toggleBottomSheetView: () => void;
}

interface BottomSheetProviderProps {
  children: React.ReactNode;
}

export const BottomSheetContext = React.createContext<BottomSheetContextProps>({
  setView: (content) => {},
  toggleBottomSheetView: () => {},
});

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = (
  props
) => {
  const [viewContent, setViewContent] = React.useState<React.ReactNode | null>(
    null
  );

  const [visible, setVisible] = React.useState(false);

  const setView = React.useCallback(
    (content: React.ReactNode) => {
      setViewContent(content);
    },
    [viewContent]
  );

  const toggleBottomSheetView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const dynamicData = React.useMemo(
    () => ({ setView, toggleBottomSheetView }),
    []
  );

  return (
    <BottomSheetContext.Provider value={dynamicData}>
      {props.children}
      <StatusBar backgroundColor="transparent" />
      {viewContent && (
        <BottomSheet
          visible={visible}
          //setting the visibility state of the bottom shee
          onBackButtonPress={toggleBottomSheetView}
          //Toggling the visibility state on the click of the back botton
          onBackdropPress={toggleBottomSheetView}
          //Toggling the visibility state on the clicking out side of the sheet
        >
          <View style={{ alignItems: "center", top: 20, zIndex: 10 }}>
            <View
              style={{
                width: 50,
                height: 5,
                backgroundColor: "black",
                borderRadius: 10,
              }}
            />
          </View>
          <View style={styles.bottomNavigationView}>
            <View className="flex-1 h-full rounded-md">{viewContent}</View>
          </View>
        </BottomSheet>
      )}
    </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  bottomNavigationView: {
    backgroundColor: "#fff",
    // width: "100%",
    height: global.screen.height * 0.8,
    // justifyContent: "center",
    // alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 30,
  },
});

export const useBottomSheet = () => React.useContext(BottomSheetContext);
