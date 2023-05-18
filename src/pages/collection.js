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
  DialogTitle, IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  SvgIcon,
  Typography
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { deleteOneCategory, getAllCategories, getOneProduct, getProductsByCollectionId } from 'src/api/apiService';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import CreateCollection from 'src/sections/collection/collection-create';
import UpdateCollection from 'src/sections/collection/collection-update';


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
  const [selectedEditCollection, setSelectedEditCollection] = useState(null);
  const [selectedDeleteCollection, setSelectedDeleteCollection] = useState(null);
  const [collections, setCollections] = useState([]);


  useEffect(() => {
    getAllCategories().then((res) =>{
      setCollections(res.data);
    })
    .catch(error => {
      console.error("Error getting category:", error);
    });
  }, []);

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

  const handleCreateNewCategory = (values) => {
    collections.push(values);
    setCollections([...collections]);
  };

  const handleUpdateCategory = (values) => {
      setCollections(prevCollections => {
        const index = prevCollections.findIndex(category => category._id === values._id);
        const updatedCollections = [...prevCollections];
        updatedCollections[index] = {
          ...updatedCollections[index],
          name: values.name,
          description: values.description
        };
        return updatedCollections;
  })
  };

  const handleDeleteCollectionClick = (collectionId) => {
    deleteOneCategory(collectionId).then((res) => {
      handleDeleteClose();
      setCollections(collections.filter((collection) => collection._id !== collectionId));
    })
    .catch((err) => {
      console.log(err);
    });
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

  function ActionsCell(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [productsInCollection, setProductsInCollection] = useState(false);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    const handleEditClick = () => {
      const editCollection = {
        id: props.row.id,
        name: props.row.name,
        description: props.row.description,
      };
      setSelectedEditCollection(editCollection);
      setOpenEdit(true);
      handleMenuClose();
    };

    useEffect(() => {
      getProductsByCollectionId(props.row.id).then((res) =>{
        if (res.data.length > 0) {
          setProductsInCollection(true);
        }
      });
    }, [props.row.id])

    const handleDeleteClick = () => {
      const deleteCollection = {
        id: props.row.id,
        name: props.row.name,
        description: props.row.description,
      };
      setSelectedDeleteCollection(deleteCollection);
      setOpenDelete(true);
      handleMenuClose();
    };
    return (
      <div>
        <IconButton
          aria-controls={`actions-menu-${props.id}`}
          aria-haspopup="true"
          aria-label="Actions"
          onClick={handleMenuOpen}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id={`actions-menu-${props.id}`}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          {!productsInCollection && (
            <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
          )}
        </Menu>
      </div>
    );
  }

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { field: 'description', headerName: 'Description', flex: 1, sortable: true, align: 'center', headerAlign: 'center' },
    { 
      field: 'createdAt', 
      headerName: 'Created At', 
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
      renderCell: (params) => <ActionsCell {...params} />,
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

const rows = collections.map((item) => {
    return {
      id: item._id,
      name: item.name,
      description: item.description,
      createdAt: item.createdAt,
    };
  });


  return (
    <>
      <Head>
        <title>
          Collection Management
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
                  Collection Management
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



            {/* Collection Table start */}
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
            {/* Collection Table end */}
          </Stack>



          {/* Create Collection Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
            >
                <CreateCollection 
                onSuccess={() => handleClose()} 
                onSubmit={handleCreateNewCategory}/>
            </BootstrapDialog>
          </div>
          {/* Create Collection Dialog end */}



          {/* Edit Collection Dialog start */}
          <div>
            <BootstrapDialog
              onClose={handleEditClose}
              aria-labelledby="customized-dialog-title"
              open={openEdit}
            >
                <UpdateCollection 
                 Collection={selectedEditCollection}
                 onSuccess={() => handleEditClose()} 
                 onSubmit={handleUpdateCategory}
                />
            </BootstrapDialog>
          </div>
          {/* Edit Collection Dialog end */}



          {/* Delete Dialog start */}
          <div>
            <BootstrapDialog
                onClose={handleDeleteClose}
                aria-labelledby="customized-dialog-title"
                open={openDelete}
              >
                <DialogContent dividers>
                  Are you sure to delete {selectedDeleteCollection ? `${selectedDeleteCollection.name}` : 'this Collection'}?
                </DialogContent>
                <DialogActions style={{ justifyContent: 'center' }}>
                  <Button onClick={handleDeleteClose}>No</Button>
                  <Button autoFocus onClick={handleDeleteCollectionClick.bind(null, selectedDeleteCollection?.id)} variant="contained">
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
