import { Motel } from "@/utils/type";
import { axiosClient } from "./axios";

interface FindParams {
  latitude: number;
  longitude: number;
  radius?: number;
}

export const motelService = {
  findByLocation: async (params: FindParams): Promise<Motel[] | undefined> => {
    try {
      const response = await axiosClient.post(
        `/motels/find-rooms-by-location`,
        params
      );
      return response.data;
    } catch (error) {
      return undefined;
    }
  },
};
