import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, IconButton, InputAdornment, Menu,
  MenuItem, OutlinedInput, Stack,
  styled,
  SvgIcon,
  Typography,
  Tabs,
  Tab,
  AppBar
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ViewOrderDetail from 'src/sections/order/order-view';
import { SeverityPill } from 'src/components/severity-pill';
import { format } from 'date-fns';
import SwipeableViews from 'react-swipeable-views';

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
    pending: 'warning',
    delivering: 'primary',
    delivered: 'success',
    refund: 'error'
  };


const orders=[
    {
      id: 'f69f88012978187a6c12897f',
      order_id: 'DEV1049',
      amount: 30.5,
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      customer: {
        name: 'Ekaterina Tankova'
      },
      createdAt: 1555016400000,
      status: 'pending'
    },
    {
      id: '9eaa1c7dd4433f413c308ce2',
      order_id: 'DEV1048',
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      amount: 25.1,
      customer: {
        name: 'Cao Yu'
      },
      createdAt: 1555016400000,
      status: 'delivered'
    },
    {
      id: '01a5230c811bd04996ce7c13',
      order_id: 'DEV1047',
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson'
      },
      createdAt: 1554930000000,
      status: 'refund'
    },
    {
      id: '1f4e1bd0a87cea23cdb83d18',
      order_id: 'DEV1046',
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      amount: 96.43,
      customer: {
        name: 'Anje Keizer'
      },
      createdAt: 1554757200000,
      status: 'delivering'
    },
    {
      id: '9f974f239d29ede969367103',
      order_id: 'DEV1045',
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    },
    {
      id: 'ffc83c1560ec2f66a1c05596',
      order_id: 'DEV1044',
      quantity: 10,
      billing_address: "bsfbfbjlevlj",
      amount: 16.76,
      customer: {
        name: 'Adam Denisov'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    }
  ];


const Page = () => {
  const [open, setOpen] = useState(false);

  const [value, setValue] = useState(0);

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
        let createdAt = format(params.row.createdAt, 'dd/MM/yyyy');
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
        const [anchorEl, setAnchorEl] = useState(null);
        const handleMenuOpen = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleMenuClose = () => {
          setAnchorEl(null);
        };
        const handleViewClick = () => {
          // const viewOrder = {
          //   id: params.row.id,
          //   name: params.row.name,
          //   image: params.row.image,
          //   collection: params.row.collection,
          //   stock: params.row.stock,
          //   price: params.row.price
          // };
          // setSelectedOrder(viewOrder);
          setOpenView(true);
          handleMenuClose();
        };
        const handleDeleteClick = () => {
          const deleteOrder = {
            id: params.row.id,
            order_id: params.row.orderId,
          };
          setSelectedDeleteOrder(deleteOrder);
          setOpenDelete(true);
          handleMenuClose();
        };
        return (
          <div>
            <IconButton
              aria-controls={`actions-menu-${params.id}`}
              aria-haspopup="true"
              aria-label="Actions"
              onClick={handleMenuOpen}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id={`actions-menu-${params.id}`}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleViewClick}>View</MenuItem>
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];


const rows = orders.map((item) => {
    return {
      id: item.id,
      orderId: item.order_id,
      amount: item.amount,
      quantity: item.quantity,
      billingAddress: item.billing_address,
      customerName: item.customer.name,
      createdAt: item.createdAt,
      status: item.status
    };
  });

const pendingrows = orders.filter(order => order.status === 'pending').map((item) => {
    return {
      id: item.id,
      orderId: item.order_id,
      amount: item.amount,
      quantity: item.quantity,
      billingAddress: item.billing_address,
      customerName: item.customer.name,
      createdAt: item.createdAt,
      status: item.status
    };
  });
const deliveringrows = orders.filter(order => order.status === 'delivering').map((item) => {
    return {
      id: item.id,
      orderId: item.order_id,
      amount: item.amount,
      quantity: item.quantity,
      billingAddress: item.billing_address,
      customerName: item.customer.name,
      createdAt: item.createdAt,
      status: item.status
    };
  });
const deliveredrows = orders.filter(order => order.status === 'delivered').map((item) => {
    return {
      id: item.id,
      orderId: item.order_id,
      amount: item.amount,
      quantity: item.quantity,
      billingAddress: item.billing_address,
      customerName: item.customer.name,
      createdAt: item.createdAt,
      status: item.status
    };
  });
const refundrows = orders.filter(order => order.status === 'refund').map((item) => {
    return {
      id: item.id,
      orderId: item.order_id,
      amount: item.amount,
      quantity: item.quantity,
      billingAddress: item.billing_address,
      customerName: item.customer.name,
      createdAt: item.createdAt,
      status: item.status
    };
  });

  return (
    <>
      <Head>
        <title>
          Order Management
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
                <Typography variant="h4">
                  Order Management
                </Typography>
              </Stack>
            </Stack>
            
            <Card>
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
                  <OutlinedInput
                      defaultValue=""
                      fullWidth
                      placeholder="Search order ID"
                      startAdornment={(
                        <InputAdornment position="start">
                          <SvgIcon
                            color="action"
                            fontSize="small"
                          >
                            <MagnifyingGlassIcon />
                          </SvgIcon>
                        </InputAdornment>
                      )}
                      sx={{ maxWidth: 500 }}
                    />
                </Stack>

                {value === 1 && (
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Button
                            startIcon={(
                            <SvgIcon fontSize="small">
                                <PlusIcon />
                            </SvgIcon>
                            )}
                            variant="contained"
                            onClick={handleAddClick}
                        >
                            Shipping
                        </Button>
                    </Stack>
                )}

              </Stack>
            </Card>

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
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
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
                            checkboxSelection disableRowSelectionOnClick
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
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
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
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
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
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
                            slots={{ toolbar: GridToolbar }}
                            disableColumnSelector
                            disableDensitySelector
                            initialState={{
                            pagination: {paginationModel: {pageSize: 10}},
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
                />
              </BootstrapDialog>
          </div>
          {/* View Order Dialod end */}

          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeleteOrder ? `${selectedDeleteOrder.order_id}` : 'this Order'}?
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button onClick={handleDeleteClose}>No</Button>
                  <Button autoFocus onClick={handleDeleteClose} variant="contained">
                    Yes
                  </Button>
                </DialogActions>
              </BootstrapDialog>
          </div>
          {/* Delete Dialog end */}
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
