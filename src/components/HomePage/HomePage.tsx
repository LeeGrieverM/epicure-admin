import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import GenericTable from "../GenericTable/GenericTable";
import { IRestaurant, IChef, IDish, DataType } from "../../types/types";
import { StyledContainer, StyledBox, StyledButton } from "./HomePage.style";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../state/DataTable/DataTable.thunk";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.value);
  const [selectedMenu, setSelectedMenu] = React.useState<string>("restaurants");
  const navigate = useNavigate();

  useEffect(() => {
    switch (selectedMenu) {
      case DataType.Restaurants:
        dispatch(fetchData(`/${DataType.Restaurants}`));
        break;
      case DataType.Chefs:
        dispatch(fetchData(`/${DataType.Chefs}`));
        break;
      case DataType.Dishes:
        dispatch(fetchData(`/${DataType.Dishes}`));
        break;
      default:
        break;
    }
  }, [dispatch, selectedMenu]);

  const handleMenuClick = (model: string) => {
    setSelectedMenu(model);
    navigate(`/dashboard/:${model}`);
  };

  return (
    <>
      <StyledContainer>
        <StyledBox>
          <StyledButton onClick={() => handleMenuClick(DataType.Restaurants)}>
            Restaurants
          </StyledButton>
          <StyledButton onClick={() => handleMenuClick(DataType.Chefs)}>
            Chefs
          </StyledButton>
          <StyledButton onClick={() => handleMenuClick(DataType.Dishes)}>
            Dishes
          </StyledButton>
        </StyledBox>
        <GenericTable
          data={
            selectedMenu === DataType.Restaurants
              ? (data as IRestaurant[])
              : selectedMenu === DataType.Chefs
              ? (data as IChef[])
              : (data as IDish[])
          }
        />
      </StyledContainer>
    </>
  );
};

export default HomePage;
