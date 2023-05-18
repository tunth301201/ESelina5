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
import { useEffect, useState } from 'react';
import { getFiveLatestProducts, getSixLatestOrder, getTotalBudget, getTotalProfit, getTotalProfitByMonth, getTotalUser, getTotalUserThisMonth } from 'src/api/apiService';

const now = new Date();

const Page = () => { 
  const [budget, setTotalBudget] = useState(null);
  const [fiveLatestProducts, setFiveLatestProducts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(null);
  const [percentUsers, setPercentUsers] = useState(null);
  const [totalProfit, setTotalProfit] = useState(null);
  const [totalProfitByMonth, setTotalProfitByMonth] = useState([]);
  const [sixLatestOrders, setSixLatestOrders] = useState([]);


  useEffect(() => {
    getTotalBudget().then((res) => {
      setTotalBudget(res.data);
      console.log("total budget: ", res.data)
    });
  },[]);

  useEffect(() => {
    getTotalUser().then((res) => {
      setTotalUsers(res.data);
      console.log("total users: ", res.data)
    });
  }, []);

  useEffect(() => {
    getTotalUserThisMonth().then((res) => {
      setPercentUsers(res.data.percentChange);
      console.log("total users this month: ", res.data)
    });
  }, []);

  useEffect(() => {
    getTotalProfit().then((res) => {
      setTotalProfit(res.data);
      console.log("total profit: ", res.data)
    });
  }, []);

  useEffect(() => {
    getTotalProfitByMonth().then((res) => {
      setTotalProfitByMonth(res.data);
      console.log("total profit this month: ", res.data)
    });
  }, []);


  useEffect(() => {
    getFiveLatestProducts().then((res) => {
      setFiveLatestProducts(res.data);
    });
  },[])


  useEffect(() => {
    getSixLatestOrder().then((res) => {
      setSixLatestOrders(res.data);
    })
  }, []);


  return (
  <>
    <Head>
      <title>
        Dashboard
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
            {budget? (
              <OverviewBudget
              difference={10}
              positive
              sx={{ height: '100%' }}
              value={budget}
            />
            ) : ""}
            
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            {totalUsers? (
              <OverviewTotalCustomers
              difference={(Math.abs(percentUsers)).toFixed(1)}
              positive={false}
              sx={{ height: '100%' }}
              value={totalUsers}
            />
            ) : ""}
            
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={4}
          >
            {totalProfit? (
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value={totalProfit}
              />
            ) : ""}
            
          </Grid>
          <Grid
            xs={12}
            lg={12}
          >
            {totalProfitByMonth.length > 0 ? (
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This month',
                    data: [totalProfitByMonth[0][1], totalProfitByMonth[1][1], totalProfitByMonth[2][1], totalProfitByMonth[3][1], totalProfitByMonth[4][1], totalProfitByMonth[5][1], totalProfitByMonth[6][1], totalProfitByMonth[7][1], totalProfitByMonth[8][1], totalProfitByMonth[9][1], totalProfitByMonth[10][1], totalProfitByMonth[11][1]]
                  },
                  {
                    name: 'Last month',
                    data: [totalProfitByMonth[0][2], totalProfitByMonth[1][2], totalProfitByMonth[2][2], totalProfitByMonth[3][2], totalProfitByMonth[4][2], totalProfitByMonth[5][2], totalProfitByMonth[6][2], totalProfitByMonth[7][2], totalProfitByMonth[8][2], totalProfitByMonth[9][2], totalProfitByMonth[10][2], totalProfitByMonth[11][2]]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            ) : ""}
            
          </Grid>
      
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            {fiveLatestProducts? (
              <OverviewLatestProducts
              products={fiveLatestProducts}
              sx={{ height: '100%' }}
            />
            ) : ""}
            
          </Grid>
          <Grid
            xs={12}
            md={12}
            lg={8}
          >
            {sixLatestOrders? (
              <OverviewLatestOrders
                orders={sixLatestOrders}
                sx={{ height: '100%' }}
              />
            ) : ""}
            
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
)
            };

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
