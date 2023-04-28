import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Unstable_Grid2 as Grid,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getAllCategories } from 'src/api/apiServices';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';




const Page = () => {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    getAllCategories().then((res) => {
      setCollections(res.data);
      console.log(res.data)
    })
  }, []);

  const handleViewProductsByTag = (tagId) => {
    window.location.href = `/promotion?tag=${tagId}`;
  }


 return (
  <>
    <Head>
      <title>
        Collection | SelinaShop
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
        <Stack spacing={3}>

        <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>

                <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px 0px 5px 0px' }}>
                      <SvgIcon fontSize="large" color='primary'>
                          <TagIcon />
                        </SvgIcon>
                        <Typography variant="h4" sx={{ ml: 1 }}>Collection</Typography>
                    </Box>
              </Stack>
            </Stack>

          <Grid
            container
            spacing={3}
          >
            {collections?.map((collection) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={collection._id}
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
                        onClick={handleViewProductsByTag.bind(null,collection._id)}
                      />
                    </Box>
                    <Typography
                      align="center"
                      gutterBottom
                      variant="h5"
                    >
                      {collection.name}
                    </Typography>
                    <Typography
                      align="center"
                      variant="body1"
                    >
                      {collection.description}
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
            ))}
          </Grid>
          
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
