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
import { useCallback, useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { format } from 'date-fns';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PropTypes from 'prop-types';
import { createPromotion } from 'src/api/apiService';
import { useFormik } from 'formik';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
  
  const CreatePromotion = (props) => {
    const { Product, onSuccess, onSubmit } = props;
    const products = Product;
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
        discount: 0,
        start_date: Date.now(),
        end_date: Date.now(),
        submit: null
      },
      onSubmit: async(values) => {
        try {
          const newPromotion = {
            name: values.name,
            description: values.description,
            discount: values.discount,
            start_date: values.start_date,
            end_date: values.end_date,
            products: selectedRows.map(p => p.id),
          };
          console.log(startDate)
          console.log(endDate)
          console.log(newPromotion)

          createPromotion(newPromotion).then((res) => {
            onSubmit(res.data);
            onSuccess(res.data);
          });
          
        } catch (e) {
          console.log('Error creating promotion:', e);
        }
      }
    });

    
  


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
      { field: 'discount', headerName: 'Discount', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
      
    ];
  

    const rows = products.map((item) => {
      return {
        id: item._id,
        name: item.name,
        image: `data:${item.images[0].contentType};base64,${item.images[0].data}`,
        collection: item.category_id.name,
        stock: item.stock,
        price: item.price,
        discount: item.discount,
      };
    });

    const [selectedRows, setSelectedRows] = useState([]);


    const handleStartDateChange = (e) => {
      const value = e.target.value;
      setStartDate(value);
    };
  
    const handleEndDateChange = (e) => {
      const value = e.target.value;
      setEndDate(value);
    };

  

 
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
        
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
                    onChange={formik.handleChange}
                    required
                    value={formik.values.name}
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
                    onChange={formik.handleChange}
                    required
                    multiline
                    value={formik.values.description}
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
                    onChange={formik.handleChange}
                    required
                    type="number"
                    value={formik.values.discount}
                  />
  
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                    disableFuture
                    label="Start Date"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={formik.values.start_date}
                    onChange={(value) => {
                      formik.setFieldValue('start_date', Date.parse(value));
                    }}
                    renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                    />
                  </LocalizationProvider>
                                  
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                    disableFuture
                    label="End Date"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={formik.values.end_date}
                    onChange={(value) => {
                      formik.setFieldValue('end_date', Date.parse(value));
                    }}
                    renderInput={(params) => <TextField {...params} style={{ width: "100%" }} />}
                    />
                  </LocalizationProvider>
                                  
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
                    </Stack>
                    
                  </Stack>

                  <div style={{ width: '100%'}}>
                  <DataGrid 
                    autoHeight 
                    checkboxSelection
                    onRowSelectionModelChange={(ids) => {
                      const selectedIDs = new Set(ids);
                      const selectedRows = rows.filter((row) =>
                        selectedIDs.has(row.id),
                      );
            
                      setSelectedRows(selectedRows);
                    }}
                    rows={rows} 
                    columns={columns}
                    initialState={{
                      pagination: {paginationModel: {pageSize: 10}},
                      filter: {
                        filterModel: {
                          items: [],
                          
                        },
                      },
                    }}
                    slotProps={{
                      toolbar: {
                        showQuickFilter: true,
                        quickFilterProps: { debounceMs: 500 },
                      },
                    }}
                    getRowHeight={() => 'auto'} 
                    pageSizeOptions={[10, 25, 50]} />
                  </div>

                  {/* <pre style={{ fontSize: 10 }}>
                    {JSON.stringify(selectedRows, null, 4)}
                  </pre> */}
                                  
                </Grid>
              </Grid>

              

            </Box>
            
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Add Promotion
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  CreatePromotion.propTypes = {
    Product: PropTypes.object,
  };
  export default CreatePromotion;
  