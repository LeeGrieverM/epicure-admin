import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { StyledTableCell } from "./GenericTable.style";
import { IRestaurant, IChef, IDish, DataType } from "../../types/types";
import { useState } from "react";
import { renderStars } from "./GenericTable.utils";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

interface Column<T> {
  id: string;
  label: string;
  getValue: (item: T) => React.ReactNode;
}

interface Props {
  data: (IRestaurant | IChef | IDish)[];
  onAction: (item: IChef | IDish | IRestaurant) => void;
}

const GenericTable: React.FC<Props> = ({ data, onAction }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getColumns = (
    dataType: string
  ): Column<IRestaurant | IChef | IDish>[] => {
    let columns: Column<IRestaurant | IChef | IDish>[] = [
      { id: "name", label: "Title", getValue: (item) => item.name },
      {
        id: "active",
        label: "Active",
        getValue: (item) => (
          <span
            style={{
              backgroundColor: item.isActive ? "green" : "red",
              color: "white",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            {item.isActive ? "Active" : "Not Active"}
          </span>
        ),
      },
      {
        id: "image",
        label: "Image",
        getValue: (item) => (
          <img
            src={item.image}
            alt={dataType}
            style={{ width: 100, height: 100 }}
          />
        ),
      },
    ];

    if (dataType === DataType.Chefs) {
      columns = [
        ...columns,
        {
          id: "description",
          label: "Description",
          getValue: (item) => {
            const descriptionWords = (item as IChef).description.split(" ");
            const shortDescription = descriptionWords.slice(0, 25).join(" ");
            return (
              <>
                {showFullDescription
                  ? (item as IChef).description
                  : shortDescription}
                {descriptionWords.length > 25 && (
                  <Button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {"⬇︎"}
                  </Button>
                )}
              </>
            );
          },
        },
        {
          id: "restaurants",
          label: "Restaurants",
          getValue: (item) =>
            (item as IChef).restaurants
              .map((restaurant) => restaurant.name)
              .join(", "),
        },
        {
          id: "isChefOfTheWeek",
          label: "Chef of the Month",

          getValue: (item) => (
            <span
              style={{
                backgroundColor: (item as IChef).isChefOfTheWeek
                  ? "green"
                  : "red",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              {(item as IChef).isChefOfTheWeek ? "Yes" : "No"}
            </span>
          ),
        },
      ];
    } else if (dataType === DataType.Dishes) {
      columns = [
        ...columns,
        {
          id: "ingredients",
          label: "Ingredients",
          getValue: (item) => (item as IDish).ingredients,
        },
        {
          id: "icon",
          label: "Icon",
          getValue: (item) => (
            <img
              src={(item as IDish).icon}
              alt="Icon"
              style={{ width: 50, height: 50 }}
            />
          ),
        },
        {
          id: "price",
          label: "Price",
          getValue: (item) => `₪${(item as IDish).price.toFixed(2)}`,
        },
      ];
    } else if (dataType === DataType.Restaurants) {
      columns = [
        ...columns,
        {
          id: "chef",
          label: "Chef",
          getValue: (item) => (item as IRestaurant).chef.name,
        },
        {
          id: "dishes",
          label: "Dishes",
          getValue: (item) =>
            (item as IRestaurant).dishes.map((dish) => dish.name).join(", "),
        },
        {
          id: "stars",
          label: "Stars",
          getValue: (item) => renderStars((item as IRestaurant).stars),
        },
      ];
    }
    columns.push({
      id: "actions",
      label: "",
      getValue: (item) => (
        <IconButton onClick={() => onAction(item)} aria-label="delete">
        {item.isActive ? <DeleteIcon /> : <RestoreIcon />}
      </IconButton>
      ),
    });

    return columns;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const dataType = Object.prototype.hasOwnProperty.call(data[0], "description")
    ? DataType.Chefs
    : Object.prototype.hasOwnProperty.call(data[0], "ingredients")
    ? DataType.Dishes
    : DataType.Restaurants;
  const columns = getColumns(dataType);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, rowIndex) => (
          <TableRow key={rowIndex}>
            {columns.map((column, colIndex) => (
              <TableCell key={colIndex}>{column.getValue(item)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GenericTable;
