import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Alert,
  Snackbar,
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState, useCallback } from 'react';
import { createOrder, deleteCartItem, getCartByUserId, getOneProduct, getOrderByOrderId, updateCart } from 'src/api/apiServices';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useFormik } from 'formik';


  const carriers = [
    {
      value: 'J&T',
      label: 'J&T'
    },
    {
      value: 'ShoppeeExpress',
      label: 'ShoppeeExpress'
    },
    {
      value: 'GHTK',
      label: 'GHTK'
    }
  ];


const steps = ['Cart', 'Checkout', 'Review'];

const Page = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState([]);

  const [reviewNewOrder, setReviewNewOrder] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const handleDecrement = (index, productId) => {
    const newQuantities = [...quantities];
    newQuantities[index] = Math.max(newQuantities[index] - 1, 0);
    setQuantities(newQuantities);

    var updateCartItemDto = {
      product_id: productId,
      quantity: newQuantities[index]
    }
    updateCart(updateCartItemDto).then((res) => {
      getCartByUserId().then(async (res) => {
        setCart(res.data);
        const { cart_items } = res.data;
    
        const updatedCartItems = [];
        const initialQuantities = []; // <-- Add this
    
        for (const cartItem of cart_items) {
          await getOneProduct(cartItem.product_id).then((res) => {
            updatedCartItems.push({
              productDetail: res.data,
              quantity: cartItem.quantity
            });
            initialQuantities.push(cartItem.quantity); // <-- Add this
          });
    
        }
    
        console.log("updated cart items: ", updatedCartItems)
        setCartItems(updatedCartItems);
        setQuantities(initialQuantities); // <-- Add this
      })
    })
  };
  
  const handleIncrement = (index, productId) => {
    const newQuantities = [...quantities];
    newQuantities[index] += 1;
    setQuantities(newQuantities);

    var updateCartItemDto = {
      product_id: productId,
      quantity: newQuantities[index]
    }
    updateCart(updateCartItemDto).then((res) => {
      getCartByUserId().then(async (res) => {
        setCart(res.data);
        const { cart_items } = res.data;
    
        const updatedCartItems = [];
        const initialQuantities = []; // <-- Add this
    
        for (const cartItem of cart_items) {
          await getOneProduct(cartItem.product_id).then((res) => {
            updatedCartItems.push({
              productDetail: res.data,
              quantity: cartItem.quantity
            });
            initialQuantities.push(cartItem.quantity); // <-- Add this
          });
    
        }
    
        console.log("updated cart items: ", updatedCartItems)
        setCartItems(updatedCartItems);
        setQuantities(initialQuantities); // <-- Add this
      })
    })
  };
  
  const handleDeleteCartItem = (cartItemId) => {
    console.log("delete cart item id: ", cartItemId)
    deleteCartItem(cartItemId).then((res) => {
      getCartByUserId().then(async (res) => {
        setCart(res.data);
        const { cart_items } = res.data;
    
        const updatedCartItems = [];
        const initialQuantities = []; // <-- Add this
    
        for (const cartItem of cart_items) {
          await getOneProduct(cartItem.product_id).then((res) => {
            updatedCartItems.push({
              productDetail: res.data,
              quantity: cartItem.quantity
            });
            initialQuantities.push(cartItem.quantity); // <-- Add this
          });
    
        }
    
        console.log("updated cart items: ", updatedCartItems)
        setCartItems(updatedCartItems);
        setQuantities(initialQuantities); // <-- Add this
      })
    })
  }

  useEffect(() => {
    getCartByUserId().then(async (res) => {
      setCart(res.data);
      const { cart_items } = res.data;

      const updatedCartItems = [];
      const initialQuantities = []; // <-- Add this
      if (cart_items && cart_items.length > 0) {
        for (const cartItem of cart_items) {
          await getOneProduct(cartItem.product_id).then((res) => {
            updatedCartItems.push({
              productDetail: res.data,
              quantity: cartItem.quantity
            });
            initialQuantities.push(cartItem.quantity); // <-- Add this
          });
    
        }
    
        console.log("updated cart items: ", updatedCartItems)
        setCartItems(updatedCartItems);
        setQuantities(initialQuantities); // <-- Add this
      }
      
    })
  }, []);


  const handleClickAlert = () => {
    setOpen(true);
    handleNext();
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const handleNext = () => {
    let newSkipped = skipped;

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleGoToOrder = () => {
    router.push('/order');
  };

  const handleReset = () => {
    setActiveStep(0);
  };

 const formik = useFormik({
  initialValues: {
    phone: "",
    address: "",
    carrier: carriers[0].value,
    method: "Cash",
    submit: null
  },
  onSubmit: (values) => {
    try {
      const newOrder = {
        delivery_phone: values.phone,
        delivery_address: values.address,
        carrier: values.carrier,
        payment_method: values.method
      }
      console.log("new Order: ", newOrder);
      createOrder(newOrder).then((res) => {
        

        getOrderByOrderId(res.data._id).then(async (res) => {
          setReviewNewOrder(res.data);
          const { order_items } = res.data;
    
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


        getCartByUserId().then(async (res) => {
          setCart(res.data);
          const { cart_items } = res.data;
    
          const updatedCartItems = [];
          const initialQuantities = []; // <-- Add this
          if (cart_items && cart_items.length > 0) {
            for (const cartItem of cart_items) {
              await getOneProduct(cartItem.product_id).then((res) => {
                updatedCartItems.push({
                  productDetail: res.data,
                  quantity: cartItem.quantity
                });
                initialQuantities.push(cartItem.quantity); // <-- Add this
              });
        
            }
        
            console.log("updated cart items: ", updatedCartItems)
            setCartItems(updatedCartItems);
            setQuantities(initialQuantities); // <-- Add this
          }
          
        })

        console.log("Create Order: ",res.data);
        handleClickAlert();
      })
      
    } catch (error) {
      console.log('Error creating order:', error);
    }
  }
 })

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
  <>
    <Head>
      <title>
        Cart | SelinaShop
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={1}>
          <div>
            <Grid
              container
              spacing={2}
            >
              
                <Box sx={{ width: '100%', paddingTop: '20px' }}>
                  <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '25px'}}>
                    <Stepper activeStep={activeStep} sx={{ width: '70%'}}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps} >{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Box>
                  

                  {activeStep === 0 && (
                      <Fragment sx={{padding: '10px'}}>
                        <Grid container>
                          <Grid 
                              container
                              item
                              xs={12}
                              sm={8}>
                          {cartItems?.map((c, index) => (
                            <Grid item xs={12} sm={12}>
                              <Card sx={{ borderRadius: 2, position: "relative" }}>
                                <Box sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleDeleteCartItem.bind(null, c.productDetail._id)} >
                                  <SvgIcon fontSize="small">
                                    <XMarkIcon />
                                  </SvgIcon>
                                </Box>

                                <Grid container justify="center">
                                  <Grid item xs={12} sm={4} textAlign="center">
                                    <img
                                      height="170px"
                                      src={`data:${c.productDetail.images[0].contentType};base64,${c.productDetail.images[0].data}`}
                                      alt="product"
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={8} textAlign="left">
                                    <CardContent>
                                      <Typography variant="subtitle1" noWrap>
                                        {c.productDetail.name}
                                      </Typography>

                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          padding: "5px 0px 5px 0px",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          ${c.productDetail.discount} x {c.quantity}
                                        </Typography>
                                        <Typography
                                          variant="subtitle1"
                                          color={"textSecondary"}
                                          sx={{ ml: 3 }}
                                        >
                                          <>
                                            <span style={{ color: "red" }}>
                                              ${c.productDetail.discount * c.quantity}
                                            </span>
                                          </>
                                        </Typography>
                                      </Box>

                                      <ButtonGroup size="small" sx={{ ml: 1 }}>
                                        <Button onClick={() => handleDecrement(index, c.productDetail._id)}>-</Button>
                                        <Button disabled>{quantities[index]}</Button>
                                        <Button onClick={() => handleIncrement(index, c.productDetail._id)}>+</Button>

                                      </ButtonGroup>
                                    </CardContent>
                                  </Grid>
                                </Grid>
                              </Card>
                            </Grid>
                          ))}
                          </Grid>
                          
                                {cartItems.length ? (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={4}
                                  >
                                    <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
        
                                      <Box display="flex" justifyContent="space-between" alignItems="center">
                                          <Typography color="text.secondary" variant="subtitle2">SubTotal:</Typography>
                                          <Typography variant="h7">${cart?.total_price}</Typography>
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
                                          <Typography color="red" variant="h6">${cart?.total_price}</Typography>
                                        </Box>

                                        <Divider />
                                      

                                      <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                          <Button variant="contained" onClick={handleNext}>
                                              Checkout
                                          </Button>
                                      </CardActions>
                                      
                                    </Card>
                                  </Grid>
                                ): ""}          
                            
                        </Grid>
                    </Fragment>
                  )
                  } 



                  {activeStep === 1 && (
                      <Fragment sx={{padding: '10px'}}>

                        <Grid container>

                          {/* Order product list and delivery information */}
                          <Grid 
                            item
                            xs={12}
                            sm={8}
                            container>

                              {/* Product list */}
                              <Grid
                              item
                              xs={12}
                              sm={12}>
                                <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                                  <Typography variant="h6" sx={{px: 2}}>
                                     Product List
                                  </Typography>
                                  <Divider sx={{ my: 2 }} />
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
                                        {cartItems.map((item) => {
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
                                                          class=" w-[100px] h-[100px] object-cover rounded-2xl"
                                                          src={`data:${item.productDetail.images[0].contentType};base64,${item.productDetail.images[0].data}`}
                                                          alt="product"
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
                                <form onSubmit={formik.handleSubmit}>
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
                                        value={cart?.user_id.firstname + ' ' + cart?.user_id.lastname}
                                        required
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
                                        onChange={formik.handleChange}
                                        required
                                        value={formik.values.phone}
                                      />
                                      </Grid>

                                      <Grid
                                      xs={12}
                                      md={12}>
                                        <TextField
                                        fullWidth
                                        label="Delivery Address"
                                        name="address"
                                        onChange={formik.handleChange}
                                        required
                                        value={formik.values.address}
                                      />
                                      </Grid>

                                      <Grid
                                      xs={12}
                                      md={6}>
                                        <TextField
                                          fullWidth
                                          label="Delivery Unit"
                                          name="carrier"
                                          onChange={formik.handleChange}
                                          required
                                          select
                                          SelectProps={{ native: true }}
                                          value={formik.values.carrier}
                                        >
                                          {carriers.map((option) => (
                                            <option
                                              key={option.value}
                                              value={option.value}
                                            >
                                              {option.label}
                                            </option>
                                          ))}
                                        </TextField>
                                      </Grid>

                                      <Grid
                                      xs={12}
                                      md={6}>
                                        <TextField
                                        fullWidth
                                        label="Payment Method"
                                        name="method"
                                        value="Cash On Delivery"
                                        InputProps={{
                                          readOnly: true
                                        }}
                                      />
                                      </Grid>
                                    </Grid>
                                  </Card>
                                </form>
                              </Grid>
                              
                          </Grid>

                          {/* Total Price */}
                          <Grid
                            item
                            xs={12}
                            sm={4}>
                              <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                                <Typography variant="h6" sx={{px: 2}}>
                                    Total Price
                                </Typography>

                                <Divider sx={{ my: 2 }} />
                            
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography color="text.secondary" variant="subtitle2">SubTotal:</Typography>
                                    <Typography variant="h7">${cart?.total_price}</Typography>
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
                                    <Typography color="red" variant="h6">${cart?.total_price}</Typography>
                                  </Box>

                                  <Divider />
                                
                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleBack} color="inherit">
                                        Back to Cart
                                    </Button>
                                    <Button variant="contained" onClick={formik.handleSubmit} type='submit'>
                                        Payment
                                    </Button>
                                </CardActions>
                              </Card>
                          </Grid>
                        </Grid>
                    </Fragment>
                  )
                  } 


                  {activeStep === 2 && (
                      <Fragment sx={{padding: '10px'}}>

                    {reviewNewOrder? 
                          <Grid container>

                          {/* Order product list and delivery information */}
                          <Grid 
                            item
                            xs={12}
                            sm={8}
                            container>

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
                                        value={reviewNewOrder.order_number}
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
                                      label="Placed on"
                                      name="placedOn"
                                      value={formatDateTimeDislay(reviewNewOrder.createdAt)}
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
                                      value="Waiting"
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
                                                              class=" w-[100px] h-[100px] object-cover rounded-2xl"
                                                              src={`data:${item.productDetail.images[0].contentType};base64,${item.productDetail.images[0].data}`}
                                                              alt="product"
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
                                      value={reviewNewOrder.user_id.firstname + ' ' + reviewNewOrder.user_id.lastname}
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
                                      value={reviewNewOrder.delivery_phone}
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
                                      value={reviewNewOrder.delivery_address}
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
                                        value={reviewNewOrder.carrier}
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
                              
                          </Grid>

                          {/* Total Price */}
                          <Grid
                            item
                            xs={12}
                            sm={4}>
                              <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
                                <Typography variant="h6" sx={{px: 2}}>
                                    Total Price
                                </Typography>

                                <Divider sx={{ my: 2 }} />
                            
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography color="text.secondary" variant="subtitle2">SubTotal:</Typography>
                                    <Typography variant="h7">${reviewNewOrder.total_price}</Typography>
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
                                    <Typography color="red" variant="h6">${reviewNewOrder.total_price}</Typography>
                                  </Box>

                                  <Divider />
                                

                                <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Button variant="contained" onClick={handleReset} color="inherit">
                                        Back to Cart
                                    </Button>
                                    <Button variant="contained" onClick={handleGoToOrder}>
                                        Go to Order
                                    </Button>
                                </CardActions>
                              </Card>
                          </Grid>
                        </Grid>
                    : ""}
                        
                      </Fragment>
                   
                  )
                  } 
                  <Snackbar open={open} autoHideDuration={5000} onClose={handleCloseAlert}>
                    <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                      Order successfully!
                    </Alert>
                  </Snackbar>
                </Box>
            
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  </>
)};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
