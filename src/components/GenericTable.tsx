import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { IRestaurant, IChef, IDish } from '../types/types';

interface Column {
  id: string;
  label: string;
  getValue: (item: IRestaurant | IChef | IDish) => React.ReactNode;
}

interface Props {
  data: IRestaurant[] | IChef[] | IDish[];
}

const GenericTable: React.FC<Props> = ({ data }) => {
  const columns: Column[] = [
    { id: 'name', label: 'Title', getValue: (item) => item.name },
    { 
      id: 'active', 
      label: 'Active', 
      getValue: (item) => (
        <span style={{ backgroundColor: item.isActive ? 'green' : 'red', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
          {item.isActive ? 'Active' : 'Not Active'}
        </span>
      ) 
    }, 
    { id: 'image', label: 'Image', getValue: (item) => <img src={item.image} alt="item" style={{ width: 100, height: 100 }} /> },


  ];
    return (
      <Table>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.id}>{column.label}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.getValue(item)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    );
  };
  
  export default GenericTable;