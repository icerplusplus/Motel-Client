import { convertTime } from "@/utils/helper";
import { Genders, Roles, User } from "@/utils/type";

export const profile: User = {
  fullname: "Emma Phillips",
  email: "tomota@gmail.com",
  phoneNumber: "0381091091",
  address: "Kt.10, Embong Malang, Surabaya",
  birthDate: convertTime("2001-07-25 13:25:11.008364"),
  gender: Genders.MALE,
  avatar:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
  role: [Roles.RENTER, Roles.ADMIN],
  ID: "53e3dd0a-dfac-409a-a695-c973f805hf64",
  createdAt: convertTime("2023-07-25 13:25:11.008364"),
};
