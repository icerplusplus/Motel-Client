export interface BaseType {
  ID: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface Category {
  ID: string;
  name: string;
  image: string;
  motels: Motel[];
}

export enum Roles {
  ADMIN = "ADMIN",
  USER = "USER",
  RENTER = "RENTER",
}

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  ORDER = "ORDER",
}

export interface Token {
  requestToken: string;
  accessToken: string;
}

export interface User extends Pick<BaseType, "ID" | "createdAt"> {
  fullname: string;
  email: string;
  password?: string;
  phoneNumber: string;
  address: string;
  birthDate: string;
  gender: string;
  avatar: string;
  role: Roles[];
  token?: Pick<Token, "requestToken">;
}

export interface Motel extends Pick<BaseType, "ID"> {
  title: string;
  description: string;
  thumbnails: string[];
  category: Category[];
  bedRoomQuantity: number;
  bathRoomQuantity: number;
  carGarageQuantity: number;
  closeTime: number;

  area: number;
  unitArea: string; // default: m2 //enum: //TypeArea;
  price: number;
  unitPrice: string; // default: vnd //enum: //TypePrice;
  // paymentMethod: string; //enum: //PaymentMethod;
  address: string;
  longtitude: number;
  latitude: number;
  // alias: string[];
  rating: number;
  isChecked: boolean;
  // details: MotelDetail[]; //MotelDetailEntity[];
  comments: any[]; //CommentEntity[];
  owner: User; // UserEntity
}
