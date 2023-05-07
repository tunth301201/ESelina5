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
import { useFormik } from 'formik';

  
  const UpdateProduct = (props) => {

    const { Product, Collection, onSuccess, onSubmit } = props;

    const collections = Collection;
    const productDetail = Product;


    const formik = useFormik({
      initialValues: {
        name: productDetail.name,
        description: productDetail.description,
        price: productDetail.price,
        stock: productDetail.stock,
        discount: productDetail.discount,
        collection: productDetail.category_id._id,
        files: []
      },
      onSubmit: async(values) => {
        try {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('description', values.description);
          formData.append('price', values.price);
          formData.append('stock', values.stock);
          formData.append('discount', values.discount);
          formData.append('category_id', values.collection);
  
          console.log("update values: ", values)
  
          uploadedFiles.forEach((file) => {
            formData.append('file', file);
          })

          axios.put(`http://localhost:4000/product/${productDetail._id}`, formData,
          {headers: {
              'Content-Type': 'multipart/form-data',
            },}).then((res) => {
              getOneProduct(res.data._id).then((res) => {
                onSubmit(res.data);
                onSuccess(res.data);
              })
                
            });

        } catch (err) {
          console.log(err);
        }
      }
    });
  

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

  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
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
                    onChange={formik.handleChange}
                    required
                    value={formik.values.name}
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
                    onChange={formik.handleChange}
                    required
                    select
                    SelectProps={{ native: true }}
                    value={formik.values.collection}
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
                                    onChange={(event) => {
                                      const files = event.target.files;
                                      setUploadedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
                                      formik.setFieldValue("files", files);
                                    }}
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
                    onChange={formik.handleChange}
                    required
                    multiline
                    value={formik.values.description}
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
                    onChange={formik.handleChange}
                    required
                    type="number"
                    value={formik.values.stock}
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
                    onChange={formik.handleChange}
                    required
                    type="number"
                    value={formik.values.price}
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
                    onChange={formik.handleChange}
                    required
                    type="number"
                    value={formik.values.discount}
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
  