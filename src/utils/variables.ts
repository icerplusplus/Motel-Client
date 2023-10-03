export const logo = require("@/assets/images/logo.png");

export const colors = {
  white: "#fff",
  black: "#000",
  screen: "#F6F6F6",
  rose: "#F43F5E",
  gray: "#F6F6F6",
  "gray-300": "#d1d5db",
  input: "#f0f1f4a9",
  green: "#38ADA7",
  star: "#FFC400",
  teal: "#14b8a6",
  "teal-300": "#5eead4",
  slate: "#64748b",
  sky: "#38bdf8",
};

export const loading = require("@/assets/animations/loading.json");
export const MarkerIcon = require("@/assets/images/map_marker.png");

export const googleMapApiKey = process.env.EXPO_PUBLIC_MAP_KEY as string;
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL as string;
