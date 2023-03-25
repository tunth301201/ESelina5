import {
  Box,
  Button,
  Card, CardActions, CardContent,
  CardHeader, Divider, TextField,
  Unstable_Grid2 as Grid,
  Typography,
  Stack,
OutlinedInput,
InputAdornment,
SvgIcon
} from '@mui/material';
import { useCallback, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

  
  const CreatePromotion = () => {
    // const [values, setValues] = useState({
    //   firstName: 'Anika',
    //   lastName: 'Visser',
    //   email: 'demo@devias.io',
    //   phone: '',
    //   state: 'los-angeles',
    //   country: 'USA'
    // });
  
    // const handleChange = useCallback(
    //   (event) => {
    //     setValues((prevState) => ({
    //       ...prevState,
    //       [event.target.name]: event.target.value
    //     }));
    //   },
    //   []
    // );

    const items = [
      {
        id: '5e887ac47eed253091be10cb',
        image: '/assets/avatars/avatar-carson-darrin.png',
        name: 'Carson Darrin',
        collection: 'Clothes',
        stock: 5,
        price: 12.5,
        createdAt: 1555016400000,
      },
      {
        id: '5e887b209c28ac3dd97f6db5',
        image: '/assets/avatars/avatar-fran-perez.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1555016400000,
      },
      {
        id: '5e887b7602bdbc4dbb234b27',
        image: '/assets/avatars/avatar-jie-yan-song.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554930000000,
      },
      {
        id: '5e86809283e28b96d2d38537',
        image: '/assets/avatars/avatar-anika-visser.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554757200000,
      },
      {
        id: '5e86805e2bafd54f66cc95c3',
        image: '/assets/avatars/avatar-miron-vitold.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554670800000,
      },
      {
        id: '5e887a1fbefd7938eea9c981',
        image: '/assets/avatars/avatar-penjani-inyene.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554670800000,
      },
      {
        id: '5e887d0b3d090c1b8f162003',
        image: '/assets/avatars/avatar-omar-darboe.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554670800000,
      },
      {
        id: '5e88792be2d4cfb4bf0971d9',
        image: '/assets/avatars/avatar-siegbert-gottfried.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554757200000,
      },
      {
        id: '5e8877da9a65442b11551975',
        image: '/assets/avatars/avatar-iulia-albu.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554757200000,
      },
      {
        id: '5e8680e60cba5019c5ca6fda',
        image: '/assets/avatars/avatar-nasimiyu-danai.png',
        name: 'Fran Perez',
        collection: 'Phone',
        stock: 10,
        price: 10.2,
        createdAt: 1554757200000,
      }
    ];

    const columns = [
      { 
        field: 'name', 
        headerName: 'Name', 
        headerAlign: 'center',
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
      { field: 'collection', headerName: 'Collection', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
      { field: 'stock', headerName: 'Stock', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
      { field: 'price', headerName: 'Price', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
      { 
        field: 'createdAt', 
        headerName: 'Created At', 
        flex: 1, 
        sortable: true, 
        align: 'right', 
        headerAlign: 'right',
        renderCell: (params) => {
        let createdAt = format(params.row.createdAt, 'dd/MM/yyyy');
        return (
            <Typography variant="subtitle2">
                {createdAt}
            </Typography>
        );
        },
      },   
    ];
  
    const [sortModel, setSortModel] = useState([
      {
        field: 'createdAt',
        sort: 'desc',
      },
    ]);

    const handleSortModelChange = (newSortModel) => {
      setSortModel(newSortModel);
    };

    const rows = items.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image,
        collection: item.collection,
        stock: item.stock,
        price: item.price,
        createdAt: item.createdAt,
      };
    });

    const [selectedDate, handleDateChange] = useState(new Date());

    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
      },
      []
    );
  
 
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        
      >
        <Card>
          <CardHeader
            subheader="Please enter Promotion information to add to your store"
            title="Add New Promotion"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    // onChange={handleChange}
                    required
                  />
                </Grid>
                
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    // onChange={handleChange}
                    required
                    multiline
                  />
  
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Discount (%)"
                    name="discount"
                    // onChange={handleChange}
                    required
                    type="number"
                  />
  
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    // onChange={handleChange}
                    required
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                                  
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="End Date (%)"
                    name="endDate"
                    // onChange={handleChange}
                    required
                    type="datetime-local"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                                  
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={2}
                    >
                      <OutlinedInput
                          defaultValue=""
                          fullWidth
                          placeholder="Search product"
                          startAdornment={(
                            <InputAdornment position="start">
                              <SvgIcon
                                color="action"
                                fontSize="small"
                              >
                                <MagnifyingGlassIcon />
                              </SvgIcon>
                            </InputAdornment>
                          )}
                          sx={{ maxWidth: 500 }}
                        />
                    </Stack>
                    
                  </Stack>

                  <div style={{ width: '100%'}}>
                  <DataGrid 
                    autoHeight 
                    rows={rows} 
                    columns={columns}
                    checkboxSelection
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                    initialState={{
                      pagination: {paginationModel: {pageSize: 10}},
                    }}
                    getRowHeight={() => 'auto'} 
                    pageSizeOptions={[10, 25, 50]} />
                  </div>
                                  
                </Grid>
              </Grid>

              

            </Box>
            
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained">
              Add Promotion
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreatePromotion;
  