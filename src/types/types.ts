export interface IChef {
  _id: string;
  name: string;
  image: string;
  description: string;
  restaurants: IRestaurant[];
  isChefOfTheWeek: boolean;
  isActive?: boolean;
}

export interface IDish {
  _id: string;
  name: string;
  image: string;
  ingredients: string;
  icon: string;
  price: number;
  isActive?: boolean;
}

export interface IRestaurant {
  _id: string;
  name: string;
  image: string;
  chef: IChef;
  dishes: IDish[];
  stars: number;
  isActive?: boolean;
}

export enum DataType {
  Restaurants = "restaurants",
  Chefs = "chefs",
  Dishes = "dishes",
}