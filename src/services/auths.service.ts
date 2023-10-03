import { API_URL } from "@/utils/variables";
import { axiosClient } from "./axios";

interface SuccessResponse {
  status: number;
  message: string;
}

interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

interface AddUserProfilesParams {
  email: string;
  fullname: string;
  password: string;
  phoneNumber: string;
  address: string;
  birthDate: string;
  gender: string;
  avatar: string;
}

export const authService = {
  signup: async (phoneNumber: string) => {
    try {
      const { data } = await axiosClient.post(
        `${API_URL}/auths/register-with-phone-number`,
        { phoneNumber }
      );

      return data as Response;
    } catch (error) {
      console.log("[Auths] - SignUp service: ", error);
      //   return error;
    }
  },
  generateOtp: async (phoneNumber: string) => {
    try {
      const { data } = await axiosClient.post(`${API_URL}/auths/generate-otp`, {
        phoneNumber,
      });

      return data as { status: number; otp: string };
    } catch (error) {
      console.log("[Auths] - OTP Generater service: ", error);
      //   return error;
    }
  },
  verifyOtp: async (phoneNumber: string, otp: string) => {
    try {
      const { data } = await axiosClient.post(`${API_URL}/auths/generate-otp`, {
        phoneNumber,
        otp,
      });

      return data as { confirm: boolean };
    } catch (error) {
      console.log("[Auths] - Verify OTP service: ", error);
      //   return error;
    }
  },
  addUserProfiles: async (params: AddUserProfilesParams) => {
    try {
      const { data } = await axiosClient.post(`${API_URL}/auths/generate-otp`, {
        ...params,
      });

      return data as {
        phoneNumber: string;
        ID: string;
        role: string;
        accessToken: string;
        refreshToken: string;
      };
    } catch (error) {
      console.log("[Auths] - Add User Profiles service: ", error);
      //   return error;
    }
  },
};
