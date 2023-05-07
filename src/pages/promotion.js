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
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreatePromotion from 'src/sections/promotion/promotion-create';
import UpdatePromotion from 'src/sections/promotion/promotion-update';
import ViewPromotion from 'src/sections/promotion/promotion-view';
import { format } from 'date-fns';
import { deleteOnePromotion, getAllProducts, getAllPromorions, getOnePromotion } from 'src/api/apiService';

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


const Page = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [selectedEditPromotion, setSelectedEditPromotion] = useState(null);
  const [selectedDeletePromotion, setSelectedDeletePromotion] = useState(null);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  


  useEffect(() => {
    getAllPromorions().then((res) => {
      setPromotions(res.data);
      getAllProducts().then((res) => {
        setProducts(res.data);
      })
    })
    .catch((err) => {
      console.error("Error getting promotion:", error);
    });
  }, [])

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
  };

  const handleViewClose = () => {
    setOpenView(false);
  }

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
    { field: 'name', headerName: 'Name', flex: 1, sortable: true, align: 'left', headerAlign: 'center' },
    { field: 'description', headerName: 'Description', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { field: 'discount', headerName: 'Discount', flex: 1, sortable: true, align: 'right', headerAlign: 'right' },
    { 
        field: 'startDate', 
        headerName: 'Start Date', 
        flex: 1, 
        sortable: true, 
        align: 'right', 
        headerAlign: 'right',
        renderCell: (params) => {
          let startDate = formatDateTimeDislay(params.row.startDate);
          return (
            <Typography variant="subtitle2">
                {startDate}
            </Typography>
        );
        },
      },     { 
      field: 'endDate', 
      headerName: 'End Date', 
      flex: 1, 
      sortable: true, 
      align: 'right', 
      headerAlign: 'right',
      renderCell: (params) => {
        let endDate = formatDateTimeDislay(params.row.endDate);
      return (
          <Typography variant="subtitle2">
              {endDate}
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
        const handleViewClick = async () => {
          await getOnePromotion(params.row.id).then((res) => {
            setSelectedPromotion(res.data);
          })
          setOpenView(true);
          handleMenuClose();
        };
        const handleDeleteClick = () => {
          const deletePromotion = {
            id: params.row.id,
            name: params.row.name,
          };
          setSelectedDeletePromotion(deletePromotion);
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

  const [sortModel, setSortModel] = useState([
    {
      field: 'startDate',
      sort: 'desc',
    },
  ]);

  const handleSortModelChange = (newSortModel) => {
    setSortModel(newSortModel);
  };

  const handleCreateNewPromotion = (values) => {
    promotions.push(values);
    setPromotions([...promotions]);
  };

  const handleDeletePromotionClick = (promotionId) => {
    deleteOnePromotion(promotionId).then((res) => {
      handleDeleteClose();
      setPromotions(promotions.filter((promotion) => promotion._id !== promotionId));
    })
    .catch((err) => {
      console.log(err);
    });
  }

const rows = promotions.map((item) => {
    return {
      id: item._id,
      name: item.name,
      description: item.description,
      discount: item.discount,
      startDate: item.start_date,
      endDate: item.end_date,
    };
  });


  return (
    <>
      <Head>
        <title>
          Promotion Management
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
                  Promotion Management
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

            {/* Promotion Table start */}
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
            </Card>
            {/* Promotion Table end */}
          </Stack>

          {/* Create Promotion Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              maxWidth="lg"
            >
                <CreatePromotion 
                onSuccess={() => handleClose()}
                onSubmit={handleCreateNewPromotion}
                Product={products}
                />
            
            </BootstrapDialog>
          </div>
          {/* Create Promotion Dialog end */}

          {/* Edit Promotion Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleEditClose}
              aria-labelledby="customized-dialog-title"
              open={openEdit}
              maxWidth="lg"
            >
              {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleEditClose}>
                Update Promotion
              </BootstrapDialogTitle> */}
              {/* <DialogContent dividers> */}
                <UpdatePromotion 
                 Promotion={selectedEditPromotion}
                />
              {/* </DialogContent> */}
            </BootstrapDialog>
          </div>
          {/* Edit Promotion Dialog end */}

          {/* View Promotion Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleViewClose}
                aria-labelledby="customized-dialog-title"
                open={openView}
                maxWidth="lg"
              >
                <ViewPromotion 
                 Promotion={selectedPromotion}
                 Product={products}
                />
              </BootstrapDialog>
          </div>
          {/* View Promotion Dialod end */}

          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
               
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeletePromotion ? `${selectedDeletePromotion.name}` : 'this Promotion'}?
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button onClick={handleDeleteClose}>No</Button>
                  <Button autoFocus onClick={handleDeletePromotionClick.bind(null, selectedDeletePromotion?.id)} variant="contained">
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
