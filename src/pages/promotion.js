import {
  Box,
  Card,
  Container,
  Unstable_Grid2 as Grid,
  Pagination
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addProductToCart, getAllProducts, getProductsByTag, getProductRating, getAllUserBasedProducts, getAllCollabProducts, getAllProductProductRelationship, searchProductResult } from 'src/api/apiServices';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';



const Page = () => {
  const router = useRouter();
  const { tag } = router.query;
  const { type } =  router.query;
  const { relatedProduct } = router.query;
  const { search } = router.query;
  
  const tagId = tag ? tag : null;
  const typeC = type ? type : null;
  const relatedProductId = relatedProduct ? relatedProduct : null; 
  const searchC = search ? search : null;

  const [productsByTag, setProductsByTag] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  
  useEffect(() => {
    if (tagId) {
      getProductsByTag(tagId).then((res) => {
        setProductsByTag(res.data);
        console.log("displaying product by Tag")
      })
    }
    else if (typeC == "featured-products"){
      getAllUserBasedProducts().then((res) => {
        setProductsByTag(res.data);
        console.log("displaying products by user-based")
      })
    }
    else if (typeC == "today-products"){
      getAllCollabProducts().then((res) => {
        setProductsByTag(res.data);
        console.log("displaying products by collab")
      })
    }
    else if (relatedProductId) {
      getAllProductProductRelationship(relatedProductId).then((res) => {
        setProductsByTag(res.data);
        console.log("displaying related products")
      })
    }
    else if (searchC) {
      searchProductResult(searchC).then((res) => {
        if (res.data){
          setProductsByTag(res.data);
          console.log("displaying search results")
        }
        
      })
    }
    else {
      getAllProducts().then((res) => {
        setProductsByTag(res.data);
        console.log("displaying all products")
      })
    }
   
  }, [tagId, typeC, relatedProductId, searchC]);


  const [page, setPage] = useState(1);
  const numPages = Math.ceil(productsByTag.length/20);
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  const startIndex = (page -1)*20;
  const displayedProducts = productsByTag.slice(startIndex, startIndex + 20);

  const handleAddToCart = (productId, quantity) => {
    const addCartItem = {
      product_id: productId,
      quantity: quantity
    }
    addProductToCart(addCartItem).then((res) => {
      setCartUpdated(!cartUpdated);
    })
  };
  const handleViewProduct = (productId) => {
    router.push({
      pathname: '/view-product',
      query: { product: productId }
    });
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

  return (
    <> 
    <DashboardLayout stateCartUpdated={cartUpdated}>
      <Head>
        <title>
          Promotion
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
          <Grid container spacing={2} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
            {displayedProducts?.map((product) => (
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
          
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Pagination count={numPages} page={page} onChange={handleChangePage} variant="outlined" color="secondary" size='small' />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  );
};


// Page.getLayout = (page) => (
//   <DashboardLayout>
//     {page}
//   </DashboardLayout>
// );

export default Page;
