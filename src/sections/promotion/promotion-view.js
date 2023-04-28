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
    
    const ViewPromotion = (props) => {
   
      const {Product, Promotion} = props;
  
  
  
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
    
      const products = Product.filter(product => Promotion.products.includes(product._id));
      console.log(products)

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
  
     
      function formatDateTimeDislay(inputString) {
        // Convert input string to JavaScript Date object
        var date = new Date(inputString);
      
        // Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
        var year = date.getFullYear();
        var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
        var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
        var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
        var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
        var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero
      
        // Format the date and time components into a user-friendly string
        var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
      
        // Return the formatted date and time string
        return formattedDateTime;
      }
  
   
      return (
        <form
          autoComplete="off"
          noValidate
    
        >
          <Card>
            <CardHeader
              title="Promotion Information"
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
                      required
                      value={Promotion.name}
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
                      required
                      multiline
                      value={Promotion.description}
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
                      required
                      type="number"
                      value={Promotion.discount}
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
                      value={formatDateTimeDislay(Promotion.start_date)}
                      required
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
                      label="End Date"
                      name="endDate"
                      value={formatDateTimeDislay(Promotion.end_date)}
                      required
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
                      </Stack>
                      
                    </Stack>
  
                    <div style={{ width: '100%'}}>
                    <DataGrid 
                      autoHeight 
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
            
          </Card>
        </form>
      );
    };
    
    ViewPromotion.propTypes = {
      Product: PropTypes.object,
      Promotion: PropTypes.object,
    };
    export default ViewPromotion;
    