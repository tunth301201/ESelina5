import {
  Box,
  Button,
  Card, CardActions, CardContent,
  CardHeader, Divider, FormControlLabel, Radio,
  RadioGroup, TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCallback, useState } from 'react';
import { useFormik } from 'formik';
import { createUser } from 'src/api/apiService';
  
  
  const CreateUser = () => {
    const formik = useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        gender: 'female',
        birthday: Date.now(),
        phone: '',
        address: '',
        submit: null
      },
      onSubmit: async(values) => {
        console.log("formik value: ", values);
        try{
          var createUserDto = {
            email: values.email,
            password: values.password,
            firstname: values.firstName,
            lastname: values.lastName,
            gender: values.gender,
            birthday: values.birthday.toString(),
            phone: values.phone,
            address: values.address,
            role: "seller",
          }
          createUser(createUserDto);
        } catch(err) {
          
        }
      }
    });

    // const [values, setValues] = useState({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   password: '',
    //   passwordConfirm: '',
    //   gender: 'female',
    //   birthday: Date.now(),
    //   phone: '',
    //   address: ''
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
  
    // const handleSubmit = useCallback(
    //   (event) => {
    //     event.preventDefault();
    //   },
    //   []
    // );
  
  
    return (
      <form
        autoComplete="off"
        noValidate
        onSubmit={formik.handleSubmit}
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
                    onChange={formik.handleChange}
                    required
                    value={formik.values.email}
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
                    onChange={formik.handleChange}
                    required
                    values={formik.values.firstname}
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
                    onChange={formik.handleChange}
                    required
                    value={formik.values.lastname}
                  />
                </Grid>
                <Grid
                  xs={12}
                  md={12}
                >
                  <RadioGroup
                    row
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel value="female" control={<Radio />} label="Female" labelPlacement="top"/>
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
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                </Grid>

                <Grid
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label="Password (Confirm)"
                    name="passwordConfirm"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.passwordConfirm}
                  />
                </Grid>
                

                <Grid
                xs={12}
                md={6}
                >
                  <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                   />
                </Grid>

                <Grid
                xs={12}
                md={6}
                >
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker 
                    disableFuture
                    label="Birthday"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={formik.values.birthday}
                    onChange={(value) => {
                      formik.setFieldValue('birthday', Date.parse(value));
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid
                  xs={12}
                  md={12}
                >
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </Grid>

              </Grid>
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }} style={{ justifyContent: 'center' }}>
            <Button variant="contained" type='submit'>
              Add user
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  };
  
  export default CreateUser;
  