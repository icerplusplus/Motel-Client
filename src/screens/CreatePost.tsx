import { Button, MapScreen } from "@/components";
import { useBottomSheet } from "@/contexts";
import { useLocation } from "@/hooks";
import { TabParamList } from "@/navigators";
import { global } from "@/utils/root.style";
import { colors } from "@/utils/variables";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { categories } from "mocks";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import {
  Checkbox,
  Divider,
  TextInput,
  TouchableRipple,
} from "react-native-paper";

interface CreatePostScreenProps {}

export const CreatePostInStepOne = (props: CreatePostScreenProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  return (
    <View style={styles.container}>
      <View className="px-2 space-y-4">
        <Text className="text-xl font-medium uppercase">Tạo bài viết mới</Text>
        <View className="space-y-1">
          <Text className="text-base">Thêm hình ảnh</Text>
          <TouchableRipple rippleColor="rgba(0, 0, 0, 0.32)">
            <View className="items-center p-4 border border-gray-300 rounded-md">
              <Ionicons
                name="md-cloud-upload-outline"
                size={48}
                color={colors.sky}
              />
              <Text className="text-lg font-medium">Upload your photo</Text>
              <Text className="w-4/5 text-slate-400 text-base text-center">
                Just tap here to browse your gallery to upload photo
              </Text>
            </View>
          </TouchableRipple>
        </View>
        <View className="space-y-1">
          <Text className="text-base">Tiêu đề</Text>
          <TextInput
            mode="outlined"
            placeholder="Nhập tiêu đề"
            placeholderTextColor={colors["gray-300"]}
            outlineColor={colors["gray-300"]}
            outlineStyle={{
              borderColor: colors["gray-300"],
            }}
            style={styles.inputPaper}
          />
        </View>
        <View className="space-y-1">
          <Text className="text-base">Mô tả</Text>
          <TextInput
            mode="outlined"
            placeholder="Nhập tiêu đề"
            placeholderTextColor={colors["gray-300"]}
            outlineColor={colors["gray-300"]}
            outlineStyle={{
              borderColor: colors["gray-300"],
            }}
            multiline={true}
            style={[styles.inputPaper, styles.inputTextArea]}
          />
        </View>
        <View>
          <Button
            title="Tiếp tục"
            colors={colors.sky}
            onPress={() => navigation.navigate("CreatePostInStepTwo")}
          />
        </View>
      </View>
    </View>
  );
};

export const CreatePostInStepTwo = () => {
  const [categorySelected, setCategorySelected] = React.useState<
    string | undefined
  >();
  const [bedRoomNumberSelected, setBedRoomNumberSelected] =
    React.useState<number>(1);
  const [bathRoomNumberSelected, setBathRoomNumberSelected] =
    React.useState<number>(1);
  const [garageNumberSelected, setGarageNumberSelected] =
    React.useState<number>(1);

  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();

  return (
    <ScrollView>
      <View style={styles.container}>
        <View className="px-2 space-y-4">
          <Text className="text-xl font-medium uppercase">
            Thông tin chi tiết
          </Text>
          <View className="flex-col space-y-2 p-4 border border-gray-300 rounded-lg">
            <View className="space-y-1">
              <Text className="text-base uppercase">Loại phòng</Text>
              <TouchableRipple rippleColor="rgba(0, 0, 0, 0.32)">
                <View className="flex-row flex-wrap">
                  {categories.map((category) => (
                    <View key={category.ID} className="flex-row items-center">
                      <Checkbox
                        onPress={() => setCategorySelected(category.ID)}
                        color={colors.sky}
                        status={
                          category.ID === categorySelected
                            ? "checked"
                            : "unchecked"
                        }
                        uncheckedColor={colors["gray-300"]}
                      />
                      <Text>{category.name}</Text>
                    </View>
                  ))}
                </View>
              </TouchableRipple>
            </View>

            <Divider />

            <View className="space-y-1 my-2">
              <Text className="text-base uppercase">Số phòng ngủ</Text>
              <View className="flex-row space-x-4">
                {[...new Array(5).keys()].map((_, index) => (
                  <TouchableOpacity
                    key={`bedroom-${index}`}
                    className={`border ${
                      bedRoomNumberSelected === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    } w-10 h-10 p-0.5 rounded`}
                    onPress={() => setBedRoomNumberSelected(index)}
                  >
                    <View
                      className={`w-full h-full items-center justify-center ${
                        bedRoomNumberSelected === index
                          ? "rounded  bg-sky-100 "
                          : ""
                      }`}
                    >
                      <Text>{index}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Divider />
            <View className="space-y-1  my-2">
              <Text className="text-base uppercase">Số phòng Tắm</Text>
              <View className="flex-row space-x-4">
                {[...new Array(5).keys()].map((_, index) => (
                  <TouchableOpacity
                    key={`bathroom-${index}`}
                    className={`border ${
                      bathRoomNumberSelected === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    } w-10 h-10 p-0.5 rounded`}
                    onPress={() => setBathRoomNumberSelected(index)}
                  >
                    <View
                      className={`w-full h-full items-center justify-center ${
                        bathRoomNumberSelected === index
                          ? "rounded  bg-sky-100 "
                          : ""
                      }`}
                    >
                      <Text>{index}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Divider />
            <View className="space-y-1  my-2">
              <Text className="text-base uppercase">Nhà giữ xe</Text>
              <View className="flex-row space-x-4">
                {[...new Array(5).keys()].map((_, index) => (
                  <TouchableOpacity
                    key={`garage-${index}`}
                    className={`border ${
                      garageNumberSelected === index
                        ? "border-blue-500"
                        : "border-gray-300"
                    } w-10 h-10 p-0.5 rounded`}
                    onPress={() => setGarageNumberSelected(index)}
                  >
                    <View
                      className={`w-full h-full items-center justify-center ${
                        garageNumberSelected === index
                          ? "rounded  bg-sky-100 "
                          : ""
                      }`}
                    >
                      <Text>{index}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View className="space-y-1">
            <Text className="text-base">Thời gian đóng cửa</Text>
            <TextInput
              mode="outlined"
              placeholder="Nhập số giờ đóng cửa"
              placeholderTextColor={colors["gray-300"]}
              outlineColor={colors["gray-300"]}
              outlineStyle={{
                borderColor: colors["gray-300"],
              }}
              style={styles.inputPaper}
              right={<TextInput.Affix text="pm" />}
              keyboardType="numeric"
            />
          </View>
          <View className="space-y-1">
            <Text className="text-base">Diện tích</Text>
            <TextInput
              mode="outlined"
              placeholder="Nhập số diện tích của phòng"
              placeholderTextColor={colors["gray-300"]}
              outlineColor={colors["gray-300"]}
              outlineStyle={{
                borderColor: colors["gray-300"],
              }}
              style={styles.inputPaper}
              right={<TextInput.Affix text="m2" />}
              keyboardType="numeric"
            />
          </View>
          <View className="space-y-1">
            <Text className="text-base">Số tiền phải trả mỗi tháng</Text>
            <TextInput
              mode="outlined"
              placeholder="Nhập số diện tích của phòng"
              placeholderTextColor={colors["gray-300"]}
              outlineColor={colors["gray-300"]}
              outlineStyle={{
                borderColor: colors["gray-300"],
              }}
              style={styles.inputPaper}
              right={<TextInput.Affix text="VND" />}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Button
              title="Tiếp tục"
              colors={colors.sky}
              onPress={() => navigation.navigate("CreatePostInStepTree")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export const CreatePostInStepTree = () => {
  const { location } = useLocation();

  const [latitude, setLatitude] = React.useState<number | undefined>();
  const [longitude, setLongitude] = React.useState<number | undefined>();

  const { toggleBottomSheetView, setView } = useBottomSheet();

  const openMapView = () => {
    setView(
      <View style={{ height: global.screen.height * 0.8 - 40 }}>
        <MapScreen
          latitude={location.latitude}
          longitude={location.longitude}
        />
      </View>
    );
    toggleBottomSheetView();
  };

  return (
    <ScrollView className="bg-white">
      <View style={[styles.container]}>
        <View className="px-2 space-y-4">
          <Text className="text-xl font-medium uppercase">
            Thông tin vị trí
          </Text>
          <View className="flex-col space-y-4">
            <View className="space-y-1">
              <Text className="text-base">Thêm vị trí trên bản đồ</Text>
              <View>
                <MapView style={styles.map} initialRegion={location} />
                <View
                  style={styles.map}
                  className="absolute w-full px-4 items-center justify-center"
                >
                  <TouchableOpacity
                    onPress={openMapView}
                    className="flex-row items-center space-x-2 bg-white rounded-lg p-3 w-full"
                  >
                    <Ionicons
                      name="md-location-outline"
                      size={24}
                      color="black"
                    />
                    <View className="flex-1">
                      <Text className="text-base font-semibold">
                        Chọn vị trí trên bản đồ
                      </Text>
                    </View>
                    <View className="p-1.5 bg-gray-300/20 rounded-md">
                      <MaterialIcons
                        name="keyboard-arrow-right"
                        size={24}
                        color={colors.slate}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View className="space-y-1">
              <Text className="text-base">Địa chỉ</Text>
              <TextInput
                mode="outlined"
                placeholder="Nhập địa chỉ"
                placeholderTextColor={colors["gray-300"]}
                outlineColor={colors["gray-300"]}
                outlineStyle={{
                  borderColor: colors["gray-300"],
                }}
                style={styles.inputPaper}
              />
            </View>
            <View>
              <Button title="Hoàn thành" colors={colors.sky} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 5,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
  inputPaper: {
    borderWidth: 0.4,
    borderColor: colors["gray-300"],
    backgroundColor: "white",
    borderRadius: 5,
  },
  inputTextArea: {
    paddingVertical: 20,
  },
  map: {
    flex: 1,
    height: global.screen.height * 0.15,
  },
});
