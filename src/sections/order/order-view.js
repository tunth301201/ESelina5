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
  import { useCallback, useEffect, useRef, useState } from 'react';
  import PropTypes from 'prop-types';
import { getOneProduct, getOrderByOrderId } from 'src/api/apiService';
import { width } from '@mui/system';

  
  const ViewOrderDetail = (props) => {
    const {Order} = props;
    const [orderDetail, setOrderDetail] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    useEffect(() => {
        getOrderByOrderId(Order).then(async (res) => {
            setOrderDetail(res.data);
            const {order_items} = res.data;
            const updatedOrderItems = [];

            for (const orderItem of order_items) {
                await getOneProduct(orderItem.product_id).then((res) => {
                    updatedOrderItems.push({
                        productDetail: res.data,
                        quantity: orderItem.quantity
                    });
                });
            }
            setOrderItems(updatedOrderItems);
        })
    }, []);

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
        {orderDetail? <Box sx={{ px:2 }}>
                    {/* Order information */}
                    <Grid
                    item
                    xs={12}
                    sm={12}>
                    <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                        <Typography variant="h6" sx={{px: 2}}>
                        Order Information
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Grid container>
                        <Grid
                        xs={12}
                        md={4}>
                            <TextField
                            fullWidth
                            label="Order ID"
                            name="orderID"
                            value={orderDetail.order_number}
                            InputProps={{
                                readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid
                        xs={12}
                        md={4}>
                            <TextField
                            fullWidth
                            label="Placed on"
                            name="placedOn"
                            value={formatDateTimeDislay(orderDetail.createdAt)}
                            InputProps={{
                                readOnly: true
                            }}
                            />
                        </Grid>

                        <Grid
                        xs={12}
                        md={4}>
                            <TextField
                            fullWidth
                            label="Order Status"
                            name="orderStatus"
                            value={orderDetail.order_status}
                            InputProps={{
                                readOnly: true
                            }}
                            />
                        </Grid>
                        </Grid>
                        <Table sx={{ marginTop: 2 }}>
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
                            {orderItems?.map((item) => {
                                return (
                                    <TableRow
                                    hover
                                    key={item.productDetail._id}
                                    >
                                        <TableCell>
                                            {item.productDetail.name}
                                        </TableCell>
                                        <TableCell>
                                            <img
                                                class=" w-[10px] h-[10px] object-cover rounded-2xl"
                                                src={`data:${item.productDetail.images[0].contentType};base64,${item.productDetail.images[0].data}`}
                                                alt="product"
                                                style={{ width: '100px', height: '100px', padding: '5px' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {item.productDetail.discount}
                                        </TableCell>
                                        <TableCell>
                                            {item.quantity}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    </Card>
                    </Grid>

                    {/* Delivery information */}
                    <Grid
                    item
                    xs={12}
                    sm={12}>
                    <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                        <Typography variant="h6" sx={{px: 2}}>
                            Delivery information
                        </Typography>

                        <Divider sx={{ my: 2 }} />
                        
                        <Grid container>
                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={orderDetail.user_id.firstname + " " + orderDetail.user_id.lastname}
                            InputProps={{
                            readOnly: true
                            }}
                        />
                        </Grid>

                        <Grid
                            xs={12}
                            md={6}
                        >
                            <TextField
                            fullWidth
                            label="Phone"
                            name="phone"
                            value={orderDetail.delivery_phone}
                            InputProps={{
                            readOnly: true
                            }}
                        />
                        </Grid>

                        <Grid
                        xs={12}
                        md={12}>
                            <TextField
                            fullWidth
                            label="Delivery Address"
                            name="address"
                            value={orderDetail.delivery_address}
                            InputProps={{
                            readOnly: true
                            }}
                        />
                        </Grid>

                        <Grid
                        xs={12}
                        md={6}>
                            <TextField
                            fullWidth
                            label="Delivery Unit"
                            name="carrier"
                            value={orderDetail.carrier}
                            InputProps={{
                                readOnly: true
                            }}
                            >
                            </TextField>
                        </Grid>

                        <Grid
                        xs={12}
                        md={6}>
                            <TextField
                            fullWidth
                            label="Payment Method"
                            name="paymentMethod"
                            value="Cash On Delivery"
                            InputProps={{
                            readOnly: true
                            }}
                        />
                        </Grid>
                        </Grid>
                    </Card>
                    </Grid>
                    
             

                {/* Total Price */}
                <Grid
                item
                xs={12}
                sm={12}>
                    <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                    <Typography variant="h6" sx={{px: 2}}>
                        Total Price
                    </Typography>

                    <Divider sx={{ my: 2 }} />
                
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography color="text.secondary" variant="subtitle2">SubTotal:</Typography>
                        <Typography variant="h7">+ $145</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center" padding="0px 0 10px 0">
                        <Typography color="text.secondary" variant="subtitle2">Discount:</Typography>
                        <Typography variant="h7">- $25</Typography>
                        </Box>

                        <Box display="flex" justifyContent="space-between" alignItems="center" padding="0px 0 10px 0">
                        <Typography color="text.secondary" variant="subtitle2">Shipping fee:</Typography>
                        <Typography variant="h7">+ $25</Typography>
                        </Box>

                        <Divider />

                        <Box display="flex" justifyContent="space-between" alignItems="center" padding="10px 0 10px 0">
                        <Typography color="text.secondary" variant="subtitle1">Total:</Typography>
                        <Typography color="red" variant="h6">${orderDetail.total_price}</Typography>
                        </Box>

                    </Card>
                </Grid>
                
            </Box>: ""}
            
          
      
      </form>
    );
  };

  ViewOrderDetail.propTypes = {
    Order: PropTypes.object,
  };
  export default ViewOrderDetail;
  