import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import { IRestaurant, IChef, IDish } from '../types/types';
import { useState } from 'react';

interface Column<T> {
  id: string;
  label: string;
  getValue: (item: T) => React.ReactNode;
}

interface Props {
  data: (IRestaurant | IChef | IDish)[];
}


const GenericTable: React.FC<Props> = ({ data }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const getColumns = (dataType: string): Column<IRestaurant | IChef | IDish>[] => {
    let columns: Column<IRestaurant | IChef | IDish>[] = [
      { id: "name", label: "Title", getValue: (item) => item.name },
      // { 
      //   id: "id", 
      //   label: "ID", 
      //   getValue: (item) => item.id 
      // },
      { 
        id: "active", 
        label: "Active", 
        getValue: (item) => (
          <span style={{ backgroundColor: item.isActive ? "green" : "red", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
            {item.isActive ? "Active" : "Not Active"}
          </span>
        ) 
      },
      { 
        id: "image", 
        label: "Image", 
        getValue: (item) => <img src={item.image} alt={dataType} style={{ width: 100, height: 100 }} /> 
      }
    ];

    if (dataType === "chef") {
      columns = [
        ...columns,
        { 
          id: "description", 
          label: "Description", 
          getValue: (item) => {
            const descriptionWords = (item as IChef).description.split(' ');
            const shortDescription = descriptionWords.slice(0, 25).join(' ');
            return (
              <>
                {showFullDescription ? (item as IChef).description : shortDescription}
                {descriptionWords.length > 25 && (
                  <Button onClick={() => setShowFullDescription(!showFullDescription)}>
                    {'⬇︎'}
                  </Button>
                )}
              </>
            );
          }
        },        { 
          id: "restaurants", 
          label: "Restaurants", 
          getValue: (item) => (item as IChef).restaurants.map((restaurant) => restaurant.name).join(", ") 
        },
        { 
          id: "isChefOfTheWeek", 
          label: "Chef of the Month", 
       
          getValue: (item) =>
            <span style={{ backgroundColor: (item as IChef).isChefOfTheWeek ? "green" : "red", color: "white", padding: "4px 8px", borderRadius: "4px" }}>
            {(item as IChef).isChefOfTheWeek ? "Yes" : "No"}
          </span>
        }
      ];
    } else if (dataType === "dish") {
      columns = [
        ...columns,
        { id: "ingredients", label: "Ingredients", getValue: (item) => (item as IDish).ingredients },
        { id: "icon", label: "Icon", getValue: (item) => <img src={(item as IDish).icon} alt="Icon" style={{ width: 50, height: 50 }} /> },
        { id: "price", label: "Price", getValue: (item) => `₪${(item as IDish).price.toFixed(2)}` }
      ];
    } else if (dataType === "restaurant") {
      columns = [
        ...columns,
        { 
          id: "chef", 
          label: "Chef", 
          getValue: (item) => (item as IRestaurant).chef.name 
        },
        { 
          id: "dishes", 
          label: "Dishes", 
          getValue: (item) => (item as IRestaurant).dishes.map((dish) => dish.name).join(", ") 
        },
        { id: "stars", label: "Stars", getValue: (item) => (item as IRestaurant).stars.toString() }
      ];
    }

    return columns;
  };

  if (!Array.isArray(data) || data.length === 0) {
    return null; 
  }

  const dataType = Object.prototype.hasOwnProperty.call(data[0], "description") ? "chef" : Object.prototype.hasOwnProperty.call(data[0], "ingredients") ? "dish" : "restaurant";
  const columns = getColumns(dataType);

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id} style={{ width: "400px" }}>{column.label}</TableCell>
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