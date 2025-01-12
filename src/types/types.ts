export interface IChef {
  id: string;
  name: string;
  image: string;
  description: string;
  restaurants: IRestaurant[];
  isChefOfTheWeek: boolean;
  isActive?: boolean;
}

export interface IDish {
  id: string;
  name: string;
  image: string;
  ingredients: string;
  icon: string;
  price: number;
  isActive?: boolean;
}

export interface IRestaurant {
  id: string;
  name: string;
  image: string;
  chef: IChef;
  dishes: IDish[];
  stars: number;
  isActive?: boolean;
}
