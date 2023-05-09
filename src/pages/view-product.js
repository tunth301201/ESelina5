import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Container,
  Unstable_Grid2 as Grid,
  Rating,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { addProductToCart, getFeedbacksByProductId, getOneFeedbackById, getOneProduct, getProductProductRelationship, getProductRating, getRatingFeedbacks, ratingProduct, sendFeedback } from 'src/api/apiServices';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { formatDistanceToNow } from 'date-fns';
import { useFormik } from 'formik';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  function ProductRating({ productId }) {
    const [rating, setRating] = useState(null);
  
    useEffect(() => {
      getProductRating(productId).then((res) => {
        setRating(res.data);
      });
    }, [productId]);
  
    if (!rating) {
      return <span>Loading...</span>;
    }
  
    return <span>{rating}</span>;
  }

  function FeedbackRating({userId, productId}) {
    const [feedbackRating, setFeedbackRating] = useState(null);

    useEffect(() => {
      getRatingFeedbacks(userId, productId).then((res) => {
        setFeedbackRating(res.data.rating);
      });
    },[userId, productId]);
    if (!feedbackRating){
      return <span>Loading...</span>;
    } 
    return <Rating name="read-only" value={feedbackRating} sx={{ ml: 1 }} readOnly />
  }

const Page = () => {
  const router = useRouter();
  const { product } = router.query;
  const productId = product ? product : null;

  const [productItem, setProductItem] = useState(null);
  const [productRating, setProductRating] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  


  useEffect(() => {
    getOneProduct(productId).then((res) => {
      setProductItem(res.data);
      getProductRating(productId).then((res) => {
        if (res.data){
          setProductRating(res.data);
        } else {
          setProductRating(0);
        }
        
      })
      getProductProductRelationship(productId).then((res) => {
        setRelatedProducts(res.data);
      })
      getFeedbacksByProductId(productId).then((res) => {
        setFeedbacks(res.data);
      })
    })
  },[]);



   const [quantity, setQuantity]= useState(1); 
   const handleIncrement = () => {
    setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
          setQuantity(quantity - 1);
        }
      };
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
      };

      const handleViewProduct = (productId) => {
        router.push({
          pathname: '/view-product',
          query: { product: productId }
        });
      }

      const handleAddToCart = (productId, quantity) => {
        const addCartItem = {
          product_id: productId,
          quantity: quantity
        }
        addProductToCart(addCartItem).then((res) => {
        })
      };

      const handleViewAllProduct = (productId) => {
        router.push({
          pathname: '/promotion',
          query: { relatedProduct: productId }
        });
      }

  const formik = useFormik({
    initialValues: {
      rating: 0,
      feedbackContent: '',
      submit: null,
    },
    onSubmit: (values) => {
      try {
        ratingProduct(productId, values.rating).then((res) => {
          sendFeedback(productId, values.feedbackContent).then((res) => {
            getFeedbacksByProductId(productId).then((res) => {
              setFeedbacks(res.data);
              formik.resetForm();
            })
            getProductRating(productId).then((res) => {
              if (res.data){
                setProductRating(res.data);
              } else {
                setProductRating(0);
              }
            })
          })
        });
      } catch (err) {
        console.log(err);
      }
    }
  })
      
   return (
  <>
    <Head>
      <title>
        Product | SelinaShop
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
          {productItem?
          <div>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
              lg={6}
              container
              justifyContent="center" alignItems="center"
            >
              <Grid>
                  <Box sx={{ position: 'relative', maxWidth: '100%' }}>
                      <img alt="" aria-hidden="true" src={`data:${productItem.images[0].contentType};base64,${productItem.images[0].data}`} objectFit='cover' />
                  </Box>
              </Grid>
              <Grid justifyContent="center" alignItems="center">
                  <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ml: 2 }}>
                      <img alt="avatar 1" src={`data:${productItem.images[0].contentType};base64,${productItem.images[0].data}`} style={{ width: '100px', height: '100px', padding: '5px' }} />
                      <img alt="avatar 2" src={`data:${productItem.images[1].contentType};base64,${productItem.images[1].data}`} style={{ width: '100px', height: '100px', padding: '5px' }} />
                      <img alt="avatar 3" src={`data:${productItem.images[2].contentType};base64,${productItem.images[2].data}`} style={{ width: '100px', height: '100px', padding: '5px' }} />
                  </Box>
              </Grid>    
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={6}
            >
              <Box
               sx={{
                  display: 'flex',
                  flexDirection: 'column'
               }}>
                  <Typography
                      gutterBottom
                      variant="h5"
                      >
                      {productItem.name}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0px 5px 0px' }}>
                      <Typography variant="body1">Category: </Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>{productItem.category_id.name}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px 0px 5px 0px' }}>
                      <Typography variant="body1">Rate:</Typography>
                      <Rating name="read-only" value={productRating}  sx={{ ml: 1 }} readOnly />
                      <span>({productRating.toFixed(1)})</span>
                      
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px 0px 5px 0px' }}>
                      <Typography variant="body1">Stock:</Typography>
                      <Typography variant="h6" sx={{ ml: 1 }}>{productItem.stock}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px 0px 5px 0px' }}>
                      <Typography variant="body1">Price: <del>${productItem.price}</del></Typography>
                      <Typography variant="h4" color={'textSecondary'}  sx={{ ml: 3 }}>
                        <>
                          <span style={{color: 'red'}}>
                              ${productItem.discount}
                          </span>
                        </>
                    </Typography>
                  </Box>
                  

                  <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0px 25px 0px' }}>
                      <Typography variant="body1">Quantity:</Typography>
                      <ButtonGroup size="small" sx={{ ml: 1 }}>
                          <Button onClick={handleDecrement}>-</Button>
                          <Button disabled>{quantity}</Button>
                          <Button onClick={handleIncrement}>+</Button>
                      </ButtonGroup>
                  </Box>

                  <Button onClick={handleAddToCart.bind(null, productItem._id, quantity)} variant="contained" sx={{display: 'inline-block', width: '150px'}} >
                      Add to cart
                  </Button>
              </Box>
            </Grid>

            <Grid
              xs={12}
              md={12}
            >
              <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  aria-label="full width tabs example"
                  >
                  <Tab label="Description" {...a11yProps(0)} />
                  <Tab label="Review" {...a11yProps(1)} />
              </Tabs>
              <SwipeableViews
                  index={value}
                  onChangeIndex={handleChangeIndex}
              >
                  
                  <TabPanel value={value} index={0} >
                      
                      <div style={{ width: '100%'}}>
                          <Typography
                              gutterBottom
                              variant="h5"
                              >
                              Specification:
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0px 5px 0px' }}>
                              <Typography variant="body1">{productItem.description}</Typography>
                          </Box>

                      </div>
                  </TabPanel>
                  <TabPanel value={value} index={1} >
                    {feedbacks?.map((feedback) => (
                      <Card sx={{ p: 2, marginBottom: 2 }}>
                      <div style={{ width: '100%', display: 'flex', alignItems: 'center'}}>
                          <Avatar
                          src='/assets/avatars/avatar-neha-punita.png'
                          alt=''
                          style={{ width: 40, height: 40, marginRight: 10 }}
                          />
                          
                          <Box>
                              <Typography variant="subtitle2">
                                  {feedback.user_id.firstname} {feedback.user_id.lastname}
                              </Typography>

                              <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px 0px 5px 0px' }}>
                                  <FeedbackRating 
                                    userId={feedback.user_id._id} 
                                    productId={feedback.product_id}
                                  />
                                  <Typography variant="body1" sx={{ ml: 1 }}>{formatDistanceToNow(new Date(feedback.createdAt))} ago</Typography>
                              </Box>
                          </Box>
                      </div>
                      <Typography variant="body1" padding='10px'>
                          {feedback.feedback_content}
                      </Typography>
                      </Card>
                    ))}
                     
                  <form onSubmit={formik.handleSubmit}>
                    <Card sx={{ p: 2, marginBottom: 2 }}>
                  
                          <CardContent>
                              <Typography
                                  gutterBottom
                                  variant="h5"
                                  >
                                  Write your review
                              </Typography>
                              <Typography
                                  gutterBottom
                                  variant="h6"
                                  padding='20px 0px 5px 5px'
                                  >
                                  Your rating *:
                              </Typography>

                              <Rating 
                                name='rating'
                                padding='5px 0px 5px 5px' 
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                ></Rating>

                              <Typography
                                  gutterBottom
                                  variant="h6"
                                  padding='25px 0px 15px 5px'
                                  >
                                  Your review*:
                              </Typography>

                              <TextField
                                  fullWidth
                                  name="feedbackContent"
                                  value={formik.values.feedbackContent}
                                  onChange={formik.handleChange}
                                  required
                                  multiline
                              />
                          </CardContent>
                          
                          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Button variant="contained" type='submit'>
                                  Send
                              </Button>
                          </CardActions>
                          

                      </Card>
                  </form>
                      
                  </TabPanel>
              </SwipeableViews>
            </Grid>


            <Grid
              xs={12}
              md={12}>
              <Card 
              sx={{
                  flexGrow: 1,
                  py: 0
              }}>
                  <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={2}
                      sx={{ p: 2 }}
                      >
                      <Stack 
                      alignItems="center"
                      direction="row"
                      >
                          <Typography variant="h5">
                              Related Products
                          </Typography>
                      </Stack>
                      <Stack
                      alignItems="center"
                      direction="row">
                          <Button
                          onClick={handleViewAllProduct.bind(null, productId)}
                          color="inherit"
                          endIcon={(
                              <SvgIcon fontSize="small">
                              <ArrowRightIcon />
                              </SvgIcon>
                          )}
                          size="small"
                          variant="text"
                          >
                          View all
                          </Button>
                      </Stack>
                      </Stack>
                  </Card>
              </Grid>

              




              <Grid
                xs={12}
                md={12}>
                    <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                        {relatedProducts?.map((product) => (
                          <Grid item xs={12} sm={4} md={2} lg={2.4} key={product._id}>
                              <Card>
                                <div>
                                <div class="max-w-md w-full bg-white-900 shadow-lg rounded-xl p-3">
                                  <div class="relative h-62 w-full mb-3">
                                    <img src={`data:${product.images[0].contentType};base64,${product.images[0].data}`} alt="product" class=" w-full h-[250px] object-cover rounded-2xl" />
                                  </div>

                                  <div class="flex-auto justify-evenly">
                                    <div class="flex flex-wrap ">
                                      <div class="w-full flex-none text-sm flex items-center text-gray-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <ProductRating productId={product._id} />
                                      </div>
                                      <div class="flex items-center w-full justify-between min-w-0 ">
                                        <h2 class="text-lg mr-auto cursor-pointer text-gray-900 hover:text-purple-500 truncate ">{product.name}</h2>
                                        <div class="flex items-center bg-green-400 text-white text-xs px-2 py-1 ml-3 rounded-lg">
                                          INSTOCK</div>
                                      </div>
                                    </div>
                                    <div class="flex items-center">
                                    <span class="text-x text-gray-500 font-semibold mt-1 ml-2 mr-1"><del class="text-gray-500">${product.price}</del></span>
                                      <div class="text-xl text-red-500 font-semibold mt-1">${product.discount}</div>
                                    </div>
                                    
                                    <div class="flex space-x-2 text-sm font-medium justify-center mt-5">
                                      <button onClick={handleAddToCart.bind(null, product._id, 1)} class="transition ease-in duration-300 inline-flex items-center text-sm font-medium mb-2 md:mb-0 bg-purple-500 px-5 py-2 hover:shadow-lg tracking-wider text-white rounded-full hover:bg-purple-600 ">
                                        <span>Add Cart</span>
                                      </button>
                                      <button onClick={handleViewProduct.bind(null, product._id)} class="transition ease-in duration-300 bg-white-700 border border-gray-700 hover:text-purple-500  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                      </button>
                                    </div>
                                  </div>
                                  </div>
                                </div>
                                </Card>
                          </Grid>
                        ))}
                      </Grid>
                </Grid>

          
          </Grid>
        </div> 
          : ""}
          
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
