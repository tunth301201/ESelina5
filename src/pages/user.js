import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import { MoreVert } from '@mui/icons-material';
import {
  Avatar,
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
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreateUser from 'src/sections/user/user-create';
import UpdateUser from 'src/sections/user/user-update';
import ViewUser from 'src/sections/user/user-view';
import { format } from 'date-fns';
import axios from 'axios';
import { useJwt } from 'react-jwt';
import getAllUsers from 'src/api/apiServices';

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


const items = [
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    firstname: 'Carson',
    lastname: 'Darrin',
    email: 'Clothes',
    noOfOrders: 5,
    role: 'Customer',
    createdAt: 1555016400000,
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/assets/avatars/avatar-fran-perez.png',
    firstname: 'Fran',
    lastname: 'Perez',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Seller',
    createdAt: 1555016400000,
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554930000000,
  },
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554757200000,
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554670800000,
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554670800000,
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554670800000,
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554757200000,
  },
  {
    id: '5e8877da9a65442b11551975',
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554757200000,
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    firstname: 'Fran',
    lastname: 'John',
    email: 'Phone',
    noOfOrders: 10,
    role: 'Customer',
    createdAt: 1554757200000,
  }
];


  

const Page = () => {
  
  
//   const [users, setUsers] = useState([]);
//   const { decodedToken, isTokenExpired } = useJwt(localStorage.getItem('token'));
// console.log("decodedToken: "+ decodedToken)

//   if (isTokenExpired) {
//     // Token hết hạn
//     // Điều hướng người dùng đến trang đăng nhập hoặc cập nhật token mới
//     window.location.href = '/auth/login';
//   }

//   if (decodedToken.role !== 'seller') {
//     // Người dùng không có vai trò 'seller'
//     // Hiển thị thông báo lỗi hoặc từ chối truy cập vào trang
//     window.location.href = '/auth/login';
//   }

//   useEffect(() => {
//     axios.get("http://localhost:4000/user").then((response) => {
//       setProducts(response.data);
//     });
//   }, []);
const [users, setUsers] = useState([]);

useEffect(() => {
  getAllUsers().then(res => {
    setUsers(res.data);
  });
}, []);

console.log("all users: "+ users)
  
  const [open, setOpen] = useState(false);

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

  const [selectedEditUser, setSelectedEditUser] = useState(null);

  const [selectedDeleteUser, setSelectedDeleteUser] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      headerAlign: 'center',
      flex: 1, 
      sortable: true,
      minWidth: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={params.row.avatar}
            alt={params.row.firstname}
            style={{ width: 40, height: 40, marginRight: 10 }}
          />
          
          <Typography variant="subtitle2">
            {params.row.firstname} {params.row.lastname}
          </Typography>
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1, sortable: true, align: 'left', headerAlign: 'left' },
    { field: 'noOfOrders', headerName: 'No Of Orders', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
    { field: 'role', headerName: 'Permission', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
      flex: 1, 
      sortable: true, 
      align: 'right', 
      headerAlign: 'right',
      renderCell: (params) => {
      // let createdAt = format(params.row.createdAt, 'dd/MM/yyyy');
      let createdAt = format(new Date(params.row.createdAt), 'dd/MM/yyyy HH:mm:ss');
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
          const viewUser = {
            id: params.row.id,
            firstname: params.row.firstname,
            lastname: params.row.lastname,
            avatar: params.row.avatar,
            email: params.row.email,
            noOfOrders: params.row.noOfOrders
          };
          setSelectedUser(viewUser);
          setOpenView(true);
          handleMenuClose();
        };
        const handleEditClick = () => {
          const editUser = {
            id: params.row.id,
            firstname: params.row.firstname,
            lastname: params.row.lastname,
            avatar: params.row.avatar,
            email: params.row.email,
            noOfOrders: params.row.noOfOrders
          };
          setSelectedEditUser(editUser);
          setOpenEdit(true);
          handleMenuClose();
        };
        const handleDeleteClick = () => {
          const deleteUser = {
            id: params.row.id,
            firstname: params.row.firstname,
            lastname: params.row.lastname,
            avatar: params.row.avatar,
            email: params.row.email,
            noOfOrders: params.row.noOfOrders
          };
          setSelectedDeleteUser(deleteUser);
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
              {params.row.role === "Seller" ? (<MenuItem onClick={handleEditClick}>Edit</MenuItem>):null}
              <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  const [sortModel, setSortModel] = useState([
    {
      field: 'createdAt',
      sort: 'desc',
    },
  ]);

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

const rows = users.map((item) => {
    return {
      id: item._id,
      firstname: item.firstname,
      lastname: item.lastname,
      avatar: '/assets/avatars/avatar-carson-darrin.png',
      email: item.email,
      noOfOrders: 0,
      role: item.role,
      createdAt: item.createdAt,
    };
  });


  return (
    <>
      <Head>
        <title>
          User Management
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
                  User Management
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
                      placeholder="Search User"
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
                      Add
                    </Button>
                </Stack>
              </Stack>
            </Card>

            {/* User Table start */}
            <Card>
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
                }}
                getRowHeight={() => 'auto'} 
                pageSizeOptions={[10, 25, 50]} />
              </div>
            </Card>
            {/* User Table end */}
          </Stack>

          {/* Create User Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
              {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add New User
              </BootstrapDialogTitle> */}
              {/* <DialogContent dividers> */}
                <CreateUser />
              {/* </DialogContent> */}
            
            </BootstrapDialog>
          </div>
          {/* Create User Dialog end */}

          {/* Edit User Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleEditClose}
              aria-labelledby="customized-dialog-title"
              open={openEdit}
            >
              {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleEditClose}>
                Update User
              </BootstrapDialogTitle> */}
              {/* <DialogContent dividers> */}
               <UpdateUser />
                 {/* User={selectedEditUser}
                
              {/* </DialogContent> */}
            </BootstrapDialog>
          </div>
          {/* Edit User Dialog end */}

          {/* View User Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={openView}
              >
                <ViewUser 
                //  User={selectedUser}
                />
              </BootstrapDialog>
          </div>
          {/* View User Dialod end */}

          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeleteUser ? `${selectedDeleteUser.firstname} ${selectedDeleteUser.lastname}` : 'this User'}?
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
