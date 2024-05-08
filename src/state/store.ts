import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurant/restaurantsSlice';
import dishesReducer from './dish/dishesSlice';
import chefsReducer from './chef/chefSlice';


export const store = configureStore({
  reducer: {
    restaurants: restaurantReducer,
    dishes: dishesReducer,
    chefs: chefsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;