import { colors } from "@/utils/variables";
import React from "react";
import { Rating, AirbnbRating } from "react-native-ratings";

interface StarRatingProps {
  rating: number;
  size?: number;
  tintColor?: string;
}

export const StarRating = ({
  rating,
  size = 14,
  tintColor = colors.white,
}: StarRatingProps) => {
  const id = React.useId();
  return (
    <Rating
      readonly
      key={id}
      showRating={false}
      startingValue={rating}
      fractions={1}
      imageSize={size}
      style={{}}
      // tintColor={tintColor}
    />
  );
};
