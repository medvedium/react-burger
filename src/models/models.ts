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
  count: number;
  uid?: string;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  isAuth?: boolean;
}

export interface ServerResponse {
  success: boolean;
  data: IIngredient[];
}
