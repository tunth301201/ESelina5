import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

import { RemoveRedEye } from '@mui/icons-material';
import {
  Box,
  Card,
  Container,
  Dialog,
  DialogTitle, IconButton,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  styled
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { getOrderByUserId } from 'src/api/apiServices';
import { SeverityPill } from 'src/components/severity-pill';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ViewOrderDetail from 'src/sections/order/order-view';


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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <SvgIcon fontSize="small">
            <XMarkIcon />
          </SvgIcon>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const statusMap = {
    waiting: 'warning',
    shipping: 'primary',
    delivered: 'success',
    return: 'error'
  };





const Page = () => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(0);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrderByUserId().then((res) => {
      setOrders(res.data);
    })
  })

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleViewClose = () => {
    setOpenView(false);
  }

  const [selectedEditOrder, setSelectedEditOrder] = useState(null);

  const [selectedDeleteOrder, setSelectedDeleteOrder] = useState(null);

  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const columns = [
    { field: 'orderId', headerName: 'Order ID', headerAlign: 'left', align: 'left', flex: 1, sortable: true},
    { field: 'customerName', headerName: 'Customer', flex: 1, sortable: true, align: 'left', headerAlign: 'left' },
    { field: 'quantity', headerName: 'Qty', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { field: 'billingAddress', headerName: 'Billing Address', flex: 1, sortable: true, align: 'left', headerAlign: 'left' },
    { field: 'amount', headerName: 'Amount', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
    { 
        field: 'status', 
        headerName: 'Status', 
        flex: 1, sortable: true, 
        align: 'left', 
        headerAlign: 'left',
        renderCell: (params) => (
            <SeverityPill color={statusMap[params.row.status]}>
                {params.row.status}
            </SeverityPill>
        ),
    },
    { 
        field: 'createdAt', 
        headerName: 'Order Date', 
        flex: 1, 
        sortable: true, 
        align: 'right', 
        headerAlign: 'right',
        renderCell: (params) => {
          let createdAt = formatDateTimeDislay(params.row.createdAt);
          return (
            <Typography variant="subtitle2">
                {createdAt}
            </Typography>
        );
        },
    },    
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      marginRight: 10,
      disableColumnMenu: true,
      renderCell: (params) => {
        
        const handleViewClick = () => {
          setSelectedOrder(params.row.id);
          setOpenView(true);
        };
        return (
          <div>
            <IconButton
              aria-controls={`actions-menu-${params.id}`}
              aria-haspopup="true"
              aria-label="Actions"
              onClick={handleViewClick}
            >
              <RemoveRedEye />
            </IconButton>
          </div>
        );
      },
    },
  ];


const rows = orders.map((item) => {
  const {order_items} = item
  const totalQuantity = order_items.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);
    return {
      id: item._id,
      orderId: item.order_number,
      amount: item.total_price,
      quantity: totalQuantity,
      billingAddress: item.delivery_address,
      customerName: item.user_id.firstname + ' ' + item.user_id.lastname,
      createdAt: item.createdAt,
      status: item.order_status,
    };
  });

const pendingrows = orders.filter(order => order.order_status === 'waiting').map((item) => {
  
  const {order_items} = item
  const totalQuantity = order_items.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);  
  return {
      id: item._id,
      orderId: item.order_number,
      amount: item.total_price,
      quantity: totalQuantity,
      billingAddress: item.delivery_address,
      customerName: item.user_id.firstname + ' ' + item.user_id.lastname,
      createdAt: item.createdAt,
      status: item.order_status,
    };
  });
const deliveringrows = orders.filter(order => order.order_status === 'shipping').map((item) => {
  const {order_items} = item
  const totalQuantity = order_items.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);  
  return {
      id: item._id,
      orderId: item.order_number,
      amount: item.total_price,
      quantity: totalQuantity,
      billingAddress: item.delivery_address,
      customerName: item.user_id.firstname + ' ' + item.user_id.lastname,
      createdAt: item.createdAt,
      status: item.order_status,
    };
  });
const deliveredrows = orders.filter(order => order.order_status === 'delivered').map((item) => {
  const {order_items} = item
  const totalQuantity = order_items.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);  
  return {
      id: item._id,
      orderId: item.order_number,
      amount: item.total_price,
      quantity: totalQuantity,
      billingAddress: item.delivery_address,
      customerName: item.user_id.firstname + ' ' + item.user_id.lastname,
      createdAt: item.createdAt,
      status: item.order_status,
    };
  });
const refundrows = orders.filter(order => order.order_status === 'return').map((item) => {
  const {order_items} = item
  const totalQuantity = order_items.reduce((acc, cartItem) => {
    return acc + cartItem.quantity;
  }, 0);  
  return {
      id: item._id,
      orderId: item.order_number,
      amount: item.total_price,
      quantity: totalQuantity,
      billingAddress: item.delivery_address,
      customerName: item.user_id.firstname + ' ' + item.user_id.lastname,
      createdAt: item.createdAt,
      status: item.order_status,
    };
  });


  const [sortModel, setSortModel] = useState([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]);

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  return (
    <>
      <Head>
        <title>
          My Orders | SelinaShop
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
                      <SvgIcon fontSize="large" color='error'>
                          <ShoppingBagIcon />
                        </SvgIcon>
                        <Typography variant="h4" sx={{ ml: 1 }}>My Orders</Typography>
                    </Box>
              </Stack>
            </Stack>
            
            
            <Card>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                <Tab label="All Orders" {...a11yProps(0)} />
                <Tab label="Pending" {...a11yProps(1)} />
                <Tab label="Delivering" {...a11yProps(2)} />
                <Tab label="Delivered" {...a11yProps(3)} />
                <Tab label="Refund" {...a11yProps(4)} />
            </Tabs>
            
            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                
                <TabPanel value={value} index={0} >
                    
                    <div style={{ width: '100%'}}>
                        <DataGrid 
                            autoHeight 
                            rows={rows} 
                            columns={columns}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                            filter: {
                              filterModel: {
                                items: [],
                                
                              },
                            },
                            }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowHeight={() => 'auto'} 
                            pageSizeOptions={[10, 25, 50]} />
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1} >
                <div style={{ width: '100%'}}>
                        <DataGrid 
                            autoHeight 
                            rows={pendingrows} 
                            columns={columns}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                            filter: {
                              filterModel: {
                                items: [],
                                
                              },
                            },
                            }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowHeight={() => 'auto'} 
                            pageSizeOptions={[10, 25, 50]} />
                    </div>
                </TabPanel>

                <TabPanel value={value} index={2} >
                <div style={{ width: '100%'}}>
                        <DataGrid 
                            autoHeight 
                            rows={deliveringrows} 
                            columns={columns}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                            filter: {
                              filterModel: {
                                items: [],
                                
                              },
                            },
                            }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowHeight={() => 'auto'} 
                            pageSizeOptions={[10, 25, 50]} />
                    </div>
                </TabPanel>

                <TabPanel value={value} index={3} >
                <div style={{ width: '100%'}}>
                        <DataGrid 
                            autoHeight 
                            rows={deliveredrows} 
                            columns={columns}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                            filter: {
                              filterModel: {
                                items: [],
                                
                              },
                            },
                            }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowHeight={() => 'auto'} 
                            pageSizeOptions={[10, 25, 50]} />
                    </div>
                </TabPanel>

                <TabPanel value={value} index={4} >
                <div style={{ width: '100%'}}>
                        <DataGrid 
                            autoHeight 
                            rows={refundrows} 
                            columns={columns}
                            sortModel={sortModel}
                            onSortModelChange={handleSortModelChange}
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
                            filter: {
                              filterModel: {
                                items: [],
                                
                              },
                            },
                            }}
                            slotProps={{
                              toolbar: {
                                showQuickFilter: true,
                                quickFilterProps: { debounceMs: 500 },
                              },
                            }}
                            getRowHeight={() => 'auto'} 
                            pageSizeOptions={[10, 25, 50]} />
                    </div>
                </TabPanel>
            </SwipeableViews>
            </Card>
          </Stack>


          {/* View Order Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={openView}
              >
                <ViewOrderDetail 
                Order={selectedOrder}
                />
              </BootstrapDialog>
          </div>
          {/* View Order Dialod end */}

        </Container>
      </Box>
    </>
  );
};


Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
