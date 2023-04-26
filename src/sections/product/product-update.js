import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions
  } from '@mui/material';
  import { useCallback, useEffect, useRef, useState } from 'react';
  import PropTypes from 'prop-types';
import { getOneProduct } from 'src/api/apiService';
import axios from 'axios';

  
  const UpdateProduct = (props) => {

    const { Product, Collection, onSuccess, onSubmit } = props;

    const collections = Collection;
    const productDetail = Product;

    const [values, setValues] = useState({
      name: productDetail.name,
      description: productDetail.description,
      price: productDetail.price,
      stock: productDetail.stock,
      discount: productDetail.discount,
      collection: productDetail.category_id,
    });
  
    const handleChange = useCallback(
      (event) => {
        setValues((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
      },
      []
    );

    const [selectedCollection, setSelectedCollection] = useState(productDetail.category_id._id);
    const handleSelectChange = (event) => {
      setSelectedCollection(event.target.value);
    };
    const [updateProduct, setUpdateProduct] = useState(null);
  
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('description', values.description);
          formData.append('price', values.price);
          formData.append('stock', values.stock);
          formData.append('discount', values.discount);
          formData.append('category_id', selectedCollection);
          uploadedFiles.forEach((file) => {
            formData.append('file', file);
          })

          axios.put(`http://localhost:4000/product/${productDetail._id}`, formData,
          {headers: {
              'Content-Type': 'multipart/form-data',
            },}).then((res) => {
                setUpdateProduct(res.data);
                onSubmit(res.data);
            
            });
          // onSuccess();
        } catch (e) {
          console.log('Error creating product:', e);
        }
      },
      [updateProduct, onSuccess]
    );
  
    const UploadBox = styled(Box)({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
      border: '2px dashed gray',
      borderRadius: 4,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f2f2f2',
      },
      '&:focus': {
        outline: 'none',
      },
    });
  
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const inputRef = useRef(null);

    const handleFileChange = (event) => {
      const files = event.target.files;
      setUploadedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    };
  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Edit the below product information then click save button to update the selected product"
            title="Update Product"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    helperText="Please specify the product name"
                    label="Name"
                    name="name"
                    onChange={handleChange}
                    required
                    value={values.name}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Collection"
                    name="collection"
                    onChange={handleSelectChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={selectedCollection}
                  >
                    {collections.map((option) => (
                      <option
                        key={option._id}
                        value={option._id}
                      >
                        {option.name}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
  
                  <Box>
                        <label htmlFor="upload-file">
                            <UploadBox component="div">
                                <input
                                    ref={inputRef}
                                    accept="image/*,.png,.gif,.jpeg,.jpg"
                                    id="upload-file"
                                    multiple
                                    type="file"
                                    onChange={handleFileChange}
                                    hidden
                                />
                                <Box sx={{ mt: 1 }}>
                                  {uploadedFiles.length == 0 ? 
                                  <small>Upload product image</small>
                                  : 
                                  uploadedFiles.map((file, index) => (
                                    <img
                                      key={index}
                                      src={URL.createObjectURL(file)}
                                      alt={`Uploaded Image ${index + 1}`}
                                      style={{ width: "100px", height: "100px", margin: "10px" }}
                                    />
                                  ))
                                  }
                                    
                                </Box>
                            </UploadBox>
                        </label>
                        </Box>
  
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    onChange={handleChange}
                    required
                    multiline
                    value={values.description}
                  />
  
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Stock"
                    name="stock"
                    onChange={handleChange}
                    required
                    type="number"
                    value={values.stock}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    onChange={handleChange}
                    required
                    type="number"
                    value={values.price}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={4}
                >
                  <TextField
                    fullWidth
                    label="Discount"
                    name="discount"
                    onChange={handleChange}
                    required
                    type="number"
                    value={values.discount}
                  />
                </Grid>
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Save
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };

  UpdateProduct.propTypes = {
    product: PropTypes.object,
  };
  
  export default UpdateProduct;
  