import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface ReadmoreTextProps {
  text: string;
  maxLines: number;
}

export const ReadMoreText = ({ text, maxLines = 3 }: ReadmoreTextProps) => {
  const [showAll, setShowAll] = React.useState(false);
  const charsToShow = showAll ? text.length : maxLines * 60; // Adjust character count per line as needed

  const toggleReadMore = () => {
    setShowAll(!showAll);
  };

  return (
    <View className="relative">
      {text.length > maxLines && (
        <TouchableOpacity onPress={toggleReadMore}>
          <Text className="leading-5 text-zinc-500">
            {text.slice(0, charsToShow)}
            {!showAll && text.length > charsToShow && (
              <Text className="text-teal-500"> ...Read more</Text>
            )}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
