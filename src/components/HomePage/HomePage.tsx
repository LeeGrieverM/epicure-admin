import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import GenericTable from "../GenericTable/GenericTable";
import { IRestaurant, IChef, IDish, DataType } from "../../types/types";
import { StyledContainer, StyledBox, StyledButton } from "./HomePage.style";
import { useNavigate, useParams } from "react-router-dom";
import { fetchData, deleteData, restoreData } from "../../state/DataTable/DataTable.thunk";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector((state: RootState) => state.data.value);
  const navigate = useNavigate();
  const { model } = useParams();
  const [selectedMenu, setSelectedMenu] = React.useState<string>(model || DataType.Restaurants);

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
    navigate(`/dashboard/${model}`);
  };


const handleDelete = async (id: string) => {
  try {
    await dispatch(deleteData(`/${selectedMenu}/${id}`));
    dispatch(fetchData(`/${selectedMenu}`));
  } catch (error) {
    console.error("Error deleting entry:", error);
  }
};

const handleRestore = async (id: string) => {
  try {
    await dispatch(restoreData(`/${selectedMenu}/${id}`)); // Dispatch the restore action
    dispatch(fetchData(`/${selectedMenu}`)); // Fetch data again after restoration
  } catch (error) {
    console.error("Error restoring entry:", error);
  }
};

const handleAction = (item: IChef | IDish | IRestaurant) => {
  if (item.isActive) {
    handleDelete(item._id); 
  } else {
    handleRestore(item._id);
  }
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
          onAction={handleAction} // Pass handleDelete function as prop
        />
      </StyledContainer>
    </>
  );
};

export default HomePage;
