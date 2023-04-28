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
import { createOrder, getCartByUserId, getOneProduct } from 'src/api/apiServices';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';


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
  const [quantity, setQuantity]= useState(1); 
  const [reviewNewOrder, setReviewNewOrder] = useState(null);

   const handleIncrement = () => {
    setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };

  useEffect(() => {
    getCartByUserId().then(async (res) => {
      setCart(res.data);
      const {cart_items} = res.data;

      const updatedCartItems = []; 

      for (const cartItem of cart_items) {
        await getOneProduct(cartItem.product_id).then((res) => {
          updatedCartItems.push({
            productDetail: res.data,
            quantity: cartItem.quantity
          }); 
        });
        
      }
      console.log("update cart item: ", updatedCartItems)

      setCartItems(updatedCartItems);
      console.log("cartItems: ", cartItems)
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


    const [selectedCarrier, setSelectedCarrier] = useState(carriers[0].value);

  const handleChangeCarrier = (event) => {
    setSelectedCarrier(event.target.value);
  };

    const [values, setValues] = useState({
      phone: "",
      address: "",
      carrier: carriers[0].value,
      method: "Cash",
    });
  
    const handleChange = useCallback(
      (event) => {
        setValues((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
      },
      []
    );


    const handleSubmitCheckout = useCallback(
      (event) => {
        event.preventDefault();

        try {
          const newOrder = {
            delivery_phone: values.phone,
            delivery_address: values.address,
            carrier: values.carrier,
            payment_method: values.method
          }
          console.log(newOrder);
          createOrder(newOrder).then((res) => {
            setReviewNewOrder(res.data);
            console.log(res.data);
            handleClickAlert();
          })
          
        } catch (error) {
          console.log('Error creating order:', error);
        }
      },
      [values]
    );


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
                          {cartItems?.map( c => 
                          
                            <Grid
                                item
                                xs={12}
                                sm={12}
                              >
                                <Card sx={{ borderRadius: 2, position: 'relative' }}>
                                    <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
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
                                            <CardContent >
                                                <Typography variant="subtitle1" noWrap>
                                                    {c.productDetail.name}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px 0px 5px 0px' }}>
                                                    <Typography variant="body1">${c.productDetail.discount} x {c.quantity}</Typography>
                                                    <Typography variant="subtitle1" color={'textSecondary'}  sx={{ ml: 3 }}>
                                                      <>
                                                        <span style={{color: 'red'}}>
                                                            ${c.productDetail.discount * c.quantity}
                                                        </span>
                                                      </>
                                                  </Typography>
                                                </Box>

                                                <ButtonGroup size="small" sx={{ ml: 1 }}>
                                                    <Button onClick={handleDecrement}>-</Button>
                                                    <Button disabled>{quantity}</Button>
                                                    <Button onClick={handleIncrement}>+</Button>
                                                </ButtonGroup>
                                            </CardContent>
                                        </Grid>
                                    </Grid>
                                  </Card>
                              </Grid>
                            )}
                          </Grid>
                          
 
                            <Grid
                              item
                              xs={12}
                              sm={4}
                            >
                              <Card sx={{ borderRadius: 2, py: 1.5, px: 2 }}>
   
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
                                      // onChange={handleChange}
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
                                      onChange={handleChange}
                                      required
                                      value={values.phone}
                                    />
                                    </Grid>

                                    <Grid
                                     xs={12}
                                     md={12}>
                                      <TextField
                                      fullWidth
                                      label="Delivery Address"
                                      name="address"
                                      onChange={handleChange}
                                      required
                                      value={values.address}
                                    />
                                    </Grid>

                                    <Grid
                                    xs={12}
                                    md={6}>
                                      <TextField
                                        fullWidth
                                        label="Delivery Unit"
                                        name="carrier"
                                        onChange={handleChangeCarrier}
                                        required
                                        select
                                        SelectProps={{ native: true }}
                                        value={selectedCarrier}
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
                                    <Typography variant="h7">+ $250</Typography>
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
                                    <Button variant="contained" onClick={handleSubmitCheckout.bind(null)}>
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
                                      value={reviewNewOrder.createdAt}
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
                                        {cartItems?.map((item) => {
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
                                      value="Selina Nguyen"
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
                                    <Typography variant="h7">+ $250</Typography>
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
