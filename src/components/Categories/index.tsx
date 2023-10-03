import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { categories } from "mocks";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TabParamList } from "@/navigators";

interface CategoriesProps {}
interface CategoryProps {
  ID: string;
  name: string;
  image: string;
  onPress?: (id: string) => void;
}

export const Category = (props: CategoryProps) => {
  return (
    <TouchableOpacity
      className="justify-center items-center"
      onPress={() => props?.onPress && props?.onPress(props.ID)}
    >
      <View className="bg-gray-200/30 p-3 rounded-full">
        <Image
          source={{ uri: props.image }}
          className="item-center bg-gray-300/20 rounded-full p-2 w-8 h-8"
        />
      </View>
      <Text>{props.name}</Text>
    </TouchableOpacity>
  );
};

export const Categories: React.FC<CategoriesProps> = ({}) => {
  const navigator = useNavigation<NativeStackNavigationProp<TabParamList>>();

  const onPress = (id: string) => navigator.navigate("Category", { ID: id });
  return (
    <View className="px-2 bg-white">
      <FlatList
        data={categories}
        horizontal
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={() => <View style={{ paddingHorizontal: 8 }} />}
        keyExtractor={(item) => item.ID}
        renderItem={({ item }) => (
          <Category {...item} key={item.ID} onPress={() => onPress(item.ID)} />
        )}
      />
    </View>
  );
};
