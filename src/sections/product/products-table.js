// KHONG CO XAI NHO XOA DUM


import { MoreVert } from '@mui/icons-material';
import {
  IconButton,
  Menu,
  MenuItem, Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const ProductsTable = (props) => {
  const {
    items = []
  } = props;

  
  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      flex: 1, 
      sortable: true,
      minWidth: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={params.row.image}
          alt={params.row.name}
          style={{ width: 80, height: 80, marginRight: 10 }}
        />
        
        <Typography variant="subtitle2">
          {params.row.name}
        </Typography>
      </div>
      ),
    },
    { field: 'collection', headerName: 'Collection', flex: 1, sortable: true },
    { field: 'stock', headerName: 'Stock', flex: 1, sortable: true, alignItems: 'center' },
    { field: 'price', headerName: 'Price', flex: 1, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleMenuClose = () => {
          setAnchorEl(null);
        };
        const handleEditClick = () => {
          // handle edit click
          handleMenuClose();
        };
        const handleDeleteClick = () => {
          // handle delete click
          handleMenuClose();
        };
        return (
          <div>
            <IconButton
              aria-controls={`actions-menu-${params.id}`}
              aria-haspopup="true"
              aria-label="Actions"
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id={`actions-menu-${params.id}`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditClick}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const rows = items.map((item) => {
    return {
      id: item.id,
      name: item.name,
      image: item.image,
      collection: item.collection,
      stock: item.stock,
      price: item.price,
    };
  });


  return (
    <div style={{ width: '100%'}}>
     <DataGrid 
      autoHeight 
      rows={rows} 
      columns={columns}
      initialState={{
        pagination: {paginationModel: {pageSize: 10}},
      }}
      getRowHeight={() => 'auto'} 
      pageSizeOptions={[10, 25, 50]} />
    </div>
  );
};

ProductsTable.propTypes = {
  items: PropTypes.array,
};
