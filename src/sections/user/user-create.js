import {
  Box,
  Button,
  Card, CardActions, CardContent,
  CardHeader, Divider, FormControlLabel, Radio,
  RadioGroup, TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useCallback } from 'react';
  
  
  const CreateUser = () => {
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
  
  
    const handleSelectFileClick = () => {
      inputRef.current.click();
    };
  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Card>
          <CardHeader
            subheader="Please enter user information to add to your store"
            title="Add New Seller"
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
                    label="Email"
                    name="email"
                    // onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="First Name"
                    name="firstName"
                    // onChange={handleChange}
                    required
                  >
                  </TextField>
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="lastName"
                    // onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <RadioGroup
                    row
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" checked labelPlacement="top"/>
                    <FormControlLabel value="male" control={<Radio />} label="Male" labelPlacement="top"/>
                  </RadioGroup>
  
                </Grid>
               
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Password (Confirm)"
                    name="confirm"
                    type="password"
                  />
                </Grid>

              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained">
              Add user
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreateUser;
  