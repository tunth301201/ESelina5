import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Unstable_Grid2 as Grid,
  TextField,
  styled
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { getOneProduct } from 'src/api/apiService';


const CreateProduct = (props) => {
  const { Collection, onSuccess, onSubmit } = props;

  const collections = Collection;

  const [newProduct, setNewProduct] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      discount: 0,
      collection: collections[0]._id,
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

        console.log("uploaded file: ", uploadedFiles)

        uploadedFiles.forEach((file) => {
          formData.append('file', file);
        })

        axios.post("http://localhost:4000/product/upload", formData,
        {headers: {
            'Content-Type': 'multipart/form-data',
          },}).then((res) => {
              setNewProduct(res.data);
              getOneProduct(res.data._id).then((res) => {
                onSubmit(res.data);
                onSuccess(newProduct);
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
          subheader="Please enter product information to add to your store"
          title="Add New Product"
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
                  required
                  select
                  onChange={formik.handleChange}
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
            Add product
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

CreateProduct.propTypes = {
  Collection: PropTypes.object,
};

export default CreateProduct;