import { wsActions } from "../store/ws.slice";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
  uid?: string;
  index?: number;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
  token?: string;
}

export interface IFormUser {
  name?: string;
  email?: string;
  password?: string;
}

export interface ServerResponse {
  success: boolean;
  data: IIngredient[];
}

export interface IOrderResponseItem {
  number: number;
}

export interface IOrderResponse {
  success: boolean;
  name: string;
  order: IOrderResponseItem;
}

export interface IUserResponse {
  success: boolean;
  message?: string;
  user?: IUser;
  accessToken?: string;
  refreshToken?: string;
}

export interface ILocationState {
  from: {
    pathname: string;
  };
  background: Location;
  total?: number;
}

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
}

export interface IOrderRequest {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

export type TWsActions = typeof wsActions;
