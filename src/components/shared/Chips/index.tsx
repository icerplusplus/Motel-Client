import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Category } from "@/utils/type";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabParamList } from "@/navigators";

interface ChipsProps {
  chips: Category[];
}

interface ChipProps {
  icon?: React.ReactNode;
  name: string;
}

export const Chips = (props: ChipsProps) => {
  const navigator = useNavigation<NativeStackNavigationProp<TabParamList>>();

  if (props.chips.length === 0) return;

  const onPress = (id: string) => navigator.navigate("Category", { ID: id });

  return (
    <View className="flex-1 ">
      <View className="space-x-2 flex-row">
        {props.chips.map((chip) => (
          <TouchableOpacity key={chip.ID} onPress={() => onPress(chip.ID)}>
            <Chip name={chip.name} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export const Chip = (props: ChipProps) => {
  return (
    <View className="items-center bg-teal-300/20  px-2 py-[2px] rounded-md">
      {props?.icon && <Text className="mr-1">icon</Text>}
      <Text className="text-teal-500">{props.name}</Text>
    </View>
  );
};
