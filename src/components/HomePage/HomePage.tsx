import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { RootState, AppDispatch } from "../../state/store";
import { fetchRestaurants } from "../../state/restaurant/restaurantThunk";
import { fetchChefs } from "../../state/chef/chefThunk";
import { fetchDishes } from "../../state/dish/dishThunk";
import GenericTable from "../GenericTable/GenericTable";
import { IRestaurant, IChef, IDish } from "../../types/types";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const restaurants = useSelector((state: RootState) => state.restaurants.value);
  const chefs = useSelector((state: RootState) => state.chefs.value);
  const dishes = useSelector((state: RootState) => state.dishes.value);
  const [selectedMenu, setSelectedMenu] = React.useState<"restaurants" | "chefs" |"dishes">("restaurants");

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchChefs());
    dispatch(fetchDishes());
  }, [dispatch]);

  const renderTable = () => {
    let data: IRestaurant[] | IChef[] | IDish[];

    switch (selectedMenu) {
      case "restaurants":
        data = restaurants;
        break;
      case "chefs":
        data = chefs;
        break;
      case "dishes":
        data = dishes;
        break;
      default:
        data = [];
    }

    return <GenericTable data={data} />;
  };

  return (
    <>
      <Container style={{ display: "flex"}}>
        <Box
          mt={10}
          ml={-10}
          pr={10}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button onClick={() => setSelectedMenu("restaurants")}>
            Restaurants
          </Button>
          <Button onClick={() => setSelectedMenu("chefs")}>Chefs</Button>
          <Button onClick={() => setSelectedMenu("dishes")}>Dishes</Button>
        </Box>
        {renderTable()}
      </Container>
    </>
  );
};

export default HomePage;
