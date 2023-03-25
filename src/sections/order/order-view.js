import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions,
    Typography,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Table
  } from '@mui/material';
  import { useCallback, useRef } from 'react';
  import PropTypes from 'prop-types';
  
  
  const ViewOrderDetail = () => {

    const columns = [
        {field: 'name', headerName: 'Product Name', flex: 1},
        {field: 'image', headerName: 'Image', flex: 1},
        {field: 'price', headerName: 'Price', flex: 1},
        {field: 'quantity', headerName: 'Qty', flex: 1},
    ];

    const rows = [
        {id: "1", name: "Product 1", image: "Image 1", price: 225, quantity: 2},
        {id: "2", name: "Product 2", image: "Image 2", price: 225, quantity: 2},
        {id: "3", name: "Product 3", image: "Image 3", price: 225, quantity: 2},
    ];
  
    return (
      <form
        autoComplete="off"
        noValidate
      >
        <Card>
          <CardHeader
            title="Order Detail"
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
                    <Box sx={{ border: 1, borderRadius:1, padding: 2, borderColor: 'grey.300'  }}>
                        <TextField
                            fullWidth
                            label="Order ID"
                            name="orderID"
                            value="DEV133"
                            InputProps={{
                                readOnly: true
                              }}
                            />
                            <Divider/>
                        <TextField
                            fullWidth
                            label="Placed on"
                            name="placedOn"
                            value="03/23/2023"
                            InputProps={{
                                readOnly: true
                              }}
                            />
                            <Divider/>
                        <TextField
                            fullWidth
                            label="Order Status"
                            name="orderStatus"
                            value="Pending"
                            InputProps={{
                                readOnly: true
                              }}
                            />
                            <Divider/>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell>
                                            Image
                                        </TableCell>
                                        <TableCell>
                                            Price
                                        </TableCell>
                                        <TableCell>
                                            Qty
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((item) => {
                                        return (
                                            <TableRow
                                            hover
                                            key={item.id}
                                            >
                                                <TableCell>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell>
                                                    {item.image}
                                                </TableCell>
                                                <TableCell>
                                                    {item.price}
                                                </TableCell>
                                                <TableCell>
                                                    {item.quantity}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        
                    </Box>
                </Grid>

                <Grid
                xs={12}
                md={6}
                >
                    <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.300'  }}>
                        <TextField
                                fullWidth
                                label="Shipping Address"
                                name="shippingAddress"
                                value="fnkasnlanvca"
                                multiline
                                InputProps={{
                                    readOnly: true
                                }}
                                />
                        <Divider/>
                        <TextField
                            fullWidth
                            label="Customer's Note"
                            name="note"
                            value="kabksjabk"
                            multiline
                            InputProps={{
                                readOnly: true
                              }}
                            />
                    </Box>
                </Grid>

                <Grid
                xs={12}
                md={6}
                >
                    <Box sx={{ border: 1, borderRadius: 1, padding: 1, borderColor: 'grey.300' }}>
                        <Typography
                        variant="subtitle1">
                            Total Price
                        </Typography>
                        <Typography
                        color="text.secondary"
                        variant="subtitle2">
                            Subtotal: $2226 
                        </Typography>
                        <Typography
                        color="text.secondary"
                        variant="subtitle2">
                            Shipping fee: $2226 
                        </Typography>
                        <Divider border={1}/>
                        <Typography
                        variant="subtitle1">
                            Total: $2226 
                        </Typography>
                        <Typography
                        color="text.secondary"
                        variant="subtitle2">
                            Pay by Cash
                        </Typography>
                    </Box>
                </Grid>
                
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </form>
    );
  };
  
  export default ViewOrderDetail;
  