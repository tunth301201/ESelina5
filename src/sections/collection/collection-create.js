import {
    Box,
    Button,
    Card, CardContent,
    CardHeader, styled, TextField,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions
  } from '@mui/material';
  import { useCallback, useRef } from 'react';
  
  
  const CreateCollection = () => {
    // const [values, setValues] = useState({
    //   firstName: 'Anika',
    //   lastName: 'Visser',
    //   email: 'demo@devias.io',
    //   phone: '',
    //   state: 'los-angeles',
    //   country: 'USA'
    // });
  
    // const handleChange = useCallback(
    //   (event) => {
    //     setValues((prevState) => ({
    //       ...prevState,
    //       [event.target.name]: event.target.value
    //     }));
    //   },
    //   []
    // );
  
    const handleSubmit = useCallback(
      (event) => {
        event.preventDefault();
      },
      []
    );
  
 
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
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
                    // onChange={handleChange}
                    required
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
                    // onChange={handleChange}
                    required
                    multiline
                  />
  
                </Grid>
               
                
              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained">
              Add Collection
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreateCollection;
  