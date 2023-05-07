import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions
  } from '@mui/material';
  import { useCallback, useRef, useState } from 'react';
import { createCategory } from 'src/api/apiService';
import { useFormik } from 'formik';
  
  
  const CreateCollection = ({ onSuccess, onSubmit }) => {

    const formik = useFormik({
      initialValues: {
        name: "",
        description: ""
      },
      onSubmit: async(values) => {
        try {
          const newCategory = {
            name: values.name,
            description: values.description
          }
          createCategory(newCategory).then((res) => {
            onSubmit(res.data);
            onSuccess(res.data); 
          });
          
          
        } catch (error) {
          console.log('Error creating category:', error);
        }
      }
    })

  
 
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Please enter Collection information to add to your store"
            title="Add New Collection"
          />
          <CardContent sx={{ pt: 0 }}>
            <Box sx={{ m: -1.5 }}>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    onChange={formik.handleChange}
                    required
                    value={formik.values.name}
                  />
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
               
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Add Collection
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreateCollection;
  