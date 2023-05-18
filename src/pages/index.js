import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { addProductToCart, getAllCategories, getAllProducts, getCartByUserId, getCollabProducts, getFiveProducts, getProductRating, getUserBasedProducts } from 'src/api/apiServices';
import { useRouter } from 'next/navigation';
import { TopNav } from 'src/layouts/dashboard/top-nav';

const Page = () => {
  const router = useRouter();


  const items = [
    {
      src: "https://img.freepik.com/premium-vector/luxury-banner-cosmetic-ads-exquisite-container-with-purple-satin-bokeh-background_68094-175.jpg?w=2000",
      alt: "banner1",
    },
    {
      src: "https://st4.depositphotos.com/1561359/22205/v/600/depositphotos_222053720-stock-illustration-floral-skincare-banner-ads-petals.jpg",
      alt: "banner2",
    },
    {
      src: "https://watermark.lovepik.com/photo/40012/6005.jpg_wh1200.jpg",
      alt: "banner3",
    },
  ];

  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [collections, setCollections] = useState([]);
  const [userBasedProducts, setUserBasedProducts] = useState([]);
  const [collabProducts, setCollabProducts] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);

  useEffect(() => {
    getFiveProducts().then((res) => {
      console.log("5 products: ", res.data)
      setProducts(res.data);
      // getCartByUserId().then((res) => {
      //   const { cart_items } = res.data;
      //   setCartCount(cart_items.length);
      // })
      getAllCategories().then((res) => {
        setCollections(res.data);
        // console.log(res.data);
      })
    })
  }, []);

  useEffect(() => {
    Promise.all([getUserBasedProducts(), getCollabProducts()])
      .then(([userBasedRes, collabRes]) => {
        console.log("user based products: ", userBasedRes.data);
        setUserBasedProducts(userBasedRes.data);
        console.log("collab products: ", collabRes.data);
        setCollabProducts(collabRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
 

  const handleViewProduct = (productId) => {
    router.push({
      pathname: '/view-product',
      query: { product: productId }
    });
  }

  const handleViewAllProduct = (type) => {
    router.push({
      pathname: '/promotion',
      query: { type: type }
    });
  }
  
  const handleAddToCart = (productId, quantity) => {
    const addCartItem = {
      product_id: productId,
      quantity: quantity
    }
    addProductToCart(addCartItem).then((res) => {
      setCartUpdated(!cartUpdated);
    })
  }; 

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

  return (
  <>
  <DashboardLayout stateCartUpdated={cartUpdated}>
    <Head>
      <title>
        Home | SelinaShop
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
     
      <Container maxWidth="xl">
        <Grid
          container
          spacing={1}
        >
          <Grid
          xs={12}
          lg={12}
          >
          {/* display slider */}
          <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
            {items.map((item, index) => (
              <div key={index}  width="100px" height="300px">
                <img src={item.src} alt={item.alt} w-full />
              </div>
            ))}
          </Carousel>

          </Grid>

      

        {/* Display categories in here */}

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
             <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pb: 1
                    }}
                  >
                    <Avatar
                      src='https://i.pinimg.com/originals/28/87/99/2887999c4d837ed4a068e50046b97891.png'
                      variant="square"
                    />
                  </Box>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                  >
                    {collections[0]?.name}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                  >
                    {collections[0]?.description}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ShoppingBagIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      125 purchases
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      35 products
                    </Typography>
                  </Stack>
                </Stack>
            </Card>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pb: 1
                    }}
                  >
                    <Avatar
                      src='https://image.pngaaa.com/400/1236400-middle.png'
                      variant="square"
                    />
                  </Box>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                  >
                    {collections[1]?.name}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                  >
                    {collections[1]?.description}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ShoppingBagIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      125 purchases
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      35 products
                    </Typography>
                  </Stack>
                </Stack>
            </Card>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pb: 1
                    }}
                  >
                    <Avatar
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB7qyo92IAEafvcHQeRuqDQ1mIeY-NjQTd3z-ierEAA4S5MXb4B53S5JTzDIchYX1OGaY&usqp=CAU'
                      variant="square"
                    />
                  </Box>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                  >
                    {collections[2]?.name}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                  >
                    {collections[2]?.description}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ShoppingBagIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      125 purchases
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      35 products
                    </Typography>
                  </Stack>
                </Stack>
            </Card>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      pb: 1
                    }}
                  >
                    <Avatar
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvuawwoP7VROmt_mEgQ9EVLKEENJv4yCUvGSyr8810v366xDB6jsCGFKbWPguMrMAGagk&usqp=CAU'
                      variant="square"
                    />
                  </Box>
                  <Typography
                    align="center"
                    gutterBottom
                    variant="h5"
                  >
                    {collections[3]?.name}
                  </Typography>
                  <Typography
                    align="center"
                    variant="body1"
                  >
                    {collections[3]?.description}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <Divider />
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ p: 2 }}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ShoppingBagIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      125 purchases
                    </Typography>
                  </Stack>
                  <Stack
                    alignItems="center"
                    direction="row"
                    spacing={1}
                  >
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                    <Typography
                      color="text.secondary"
                      display="inline"
                      variant="body2"
                    >
                      35 products
                    </Typography>
                  </Stack>
                </Stack>
            </Card>
          </Grid>


        {/* Flash sale */}
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
                    <Avatar
                      src='https://media.istockphoto.com/id/1455032686/vector/flash-sale-label-vector-illustration.jpg?s=612x612&w=0&k=20&c=8YKplEoNd606VmQpNa1P3xhP0D8xFmTIJ9gyviNXjaM='
                      variant="square"
                    />
                    <Typography variant="h5">
                      Flash Sale
                    </Typography>
                  </Stack>

                  <Stack
                  alignItems="center"
                  direction="row">
                    <Button
                    onClick={handleViewAllProduct.bind(null, "flashsale")}
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

        {/* Display product of flash sale */}
        <Grid
        xs={12}
        md={12}>
            <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                {products?.slice(0, 5).map((product) => (
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
                                <span>Add to Cart</span>
                                
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



        {/* Display 3 promotion banners in here */}

          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <img src={items[0].src} alt={items[0].alt} objectFit="cover" width="100%" height="100%"/>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <img src={items[1].src} alt={items[1].alt} objectFit="cover" width="100%" height="100%"/>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <img src={items[2].src} alt={items[2].alt} objectFit="cover" width="100%" height="100%"/>
          </Grid>



          {/*User-Product today  */}
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
                    direction="row">
                      <Avatar
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxT1GHzCuslg3PvYgJ9wIp9IH15T7-50FZg&usqp=CAU'
                        variant="square"
                      />
                      <Typography variant="h5">
                        Featured Products
                      </Typography>
                    </Stack>
                    <Stack
                    alignItems="center"
                    direction="row">
                      <Button
                      onClick={handleViewAllProduct.bind(null, "featured-products")}
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

          {/* Display featured product */}
          <Grid
              xs={12}
              md={12}>
                  <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                      {userBasedProducts?.slice(0, 5).map((product) => (
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
                                      <span>Add to Cart</span>
                                    </button>
                                    <button class="transition ease-in duration-300 bg-white-700 border border-gray-700 hover:text-purple-500  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
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


        {/* Recommendation product today */}
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
                   direction="row">
                    <Avatar
                      src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3PFSnkBqgurJPn711rxPTt1iIZu7crsU17_bvZ3J59GVjaYqy0zuhzQ5NerhPM3OFaq4&usqp=CAU'
                      variant="square"
                    />
                    <Typography variant="h5">
                      Today Products
                    </Typography>
                  </Stack>
                  <Stack
                  alignItems="center"
                  direction="row">
                    <Button
                      onClick={handleViewAllProduct.bind(null, "today-products")}
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

        {/* Display recommendation product */}
        <Grid
        xs={12}
        md={12}>
            <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                {collabProducts?.splice(0, 5).map((product) => (
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
                                <span>Add to Cart</span>
                              </button>
                              <button class="transition ease-in duration-300 bg-white-700 border border-gray-700 hover:text-purple-500  hover:shadow-lg text-gray-400 rounded-full w-9 h-9 text-center p-2">
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
      </Container>
    </Box>
    </DashboardLayout>
  </>
)};

// Page.getLayout = (page) => (
//   <DashboardLayout onCartUpdated={cartUpdated}>
//     {page}
//   </DashboardLayout>
// );

export default Page;
