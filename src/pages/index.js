import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';

const now = new Date();

const Page = () => (
  <>
    <Head>
      <title>
        Overview | Devias Kit
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
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewBudget
              difference={10}
              positive
              sx={{ height: '100%' }}
              value="$2500"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTotalCustomers
              difference={12}
              positive={false}
              sx={{ height: '100%' }}
              value="120"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$500"
            />
          </Grid>
          <Grid
            xs={12}
            lg={12}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This month',
                  data: [10, 3, 2, 4, 6, 12, 14, 12, 15, 17, 18, 20]
                },
                {
                  name: 'Last month',
                  data: [12, 9, 5, 2, 1, 7, 6, 9, 13, 15, 12, 10]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
      
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewLatestProducts
              products={[
                {
                  id: '5ece2c077e39da27658aa8a9',
                  image: '/assets/products/product-1.png',
                  name: 'Gentle Cleansing Foam',
                  updatedAt: subHours(now, 3).getTime()
                },
                {
                  id: '5ece2c0d16f70bff2cf86cd8',
                  image: '/assets/products/product-2.png',
                  name: 'Night Cream',
                  updatedAt: subDays(subHours(now, 2), 2).getTime()
                },
                {
                  id: 'b393ce1b09c1254c3a92c827',
                  image: '/assets/products/product-5.png',
                  name: 'Acne Spot Treatment',
                  updatedAt: subDays(subHours(now, 1), 1).getTime()
                },
                {
                  id: 'a6ede15670da63f49f752c89',
                  image: '/assets/products/product-6.png',
                  name: 'Lip Scrub',
                  updatedAt: subDays(subHours(now, 3), 3).getTime()
                },
                {
                  id: 'bcad5524fe3a2f8f8620ceda',
                  image: '/assets/products/product-7.png',
                  name: 'Hydrating Face Oil',
                  updatedAt: subDays(subHours(now, 5), 6).getTime()
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            <OverviewLatestOrders
              orders={[
                {
                  id: 'f69f88012978187a6c12897f',
                  ref: 'ADHR1234',
                  amount: 120,
                  customer: {
                    name: 'Sophia Johnson'
                  },
                  createdAt: "21/04/2023 18:00:28",
                  status: 'waiting'
                },
                {
                  id: '9eaa1c7dd4433f413c308ce2',
                  ref: 'DEVH1983',
                  amount: 250,
                  customer: {
                    name: 'Noah Harris'
                  },
                  createdAt: "21/04/2023 17:54:48",
                  status: 'delivered'
                },
                {
                  id: '01a5230c811bd04996ce7c13',
                  ref: 'HDGN1736',
                  amount: 109,
                  customer: {
                    name: 'Mia Lee'
                  },
                  createdAt: "21/04/2023 17:39:46",
                  status: 'return'
                },
                {
                  id: '1f4e1bd0a87cea23cdb83d18',
                  ref: 'DEVS1046',
                  amount: 95,
                  customer: {
                    name: 'Liam Brown'
                  },
                  createdAt: "21/04/2023 17:23:42",
                  status: 'waiting'
                },
                {
                  id: '9f974f239d29ede969367103',
                  ref: 'HDJD1045',
                  amount: 320,
                  customer: {
                    name: 'Ava Thompson'
                  },
                  createdAt: "21/04/2023 17:18:58",
                  status: 'delivered'
                },
                {
                  id: 'ffc83c1560ec2f66a1c05596',
                  ref: 'IDNS1044',
                  amount: 168,
                  customer: {
                    name: 'Ethan Martinez'
                  },
                  createdAt: "21/04/2023 17:17:58",
                  status: 'delivered'
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
