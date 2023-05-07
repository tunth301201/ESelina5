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
  import PropTypes from 'prop-types';
  import { updateCategory } from 'src/api/apiService';
import { useFormik } from 'formik';
  
  const UpdateCollection = (props) => {
    const { Collection, onSuccess, onSubmit } = props;

    const formik = useFormik({
      initialValues: {
        name: Collection.name,
        description: Collection.description,
      },
      onSubmit: async(values) => {
        try {
          const upCategory = {
            name: values.name,
            description: values.description
          }
          console.log(Collection)
          updateCategory(Collection.id, upCategory).then((res) => {
            onSubmit(res.data);
            onSuccess(res.data); 
          });
          
        } catch (e) {
          console.log('Error updating category:', e);
        }
      }
    });

  
  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <Card>
          <CardHeader
            title="Update Collection"
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
                    defaultValue={formik.values.name}
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
                    defaultValue={formik.values.description}
                    multiline
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

  UpdateCollection.propTypes = {
    Collection: PropTypes.object,
  };
  
  export default UpdateCollection;
  