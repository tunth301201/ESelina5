import { useCallback, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useFormik } from 'formik';
import { getUserById, getUserProfile } from 'src/api/apiService';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';

const genders = [
  {
    value: 'male',
    label: 'Male'
  },
  {
    value: 'female',
    label: 'Female'
  }
];

export const AccountProfileDetails = () => {
  // const [userProfile, setUserProfile] = useState(null);
  // useEffect(() => {
  //   getUserById("642185b90999692a58fa508b").then((res) => {
  //     console.log("User Profile: "+res.data.firstname)
  //     setUserProfile(res.data);
  //   })
  // },[])



  const formik = useFormik({
    initialValues: {
      firstName: "Tu",
      lastName: "Nguyen",
      email: "tunth301201@gmail.com",
      password: '',
      passwordConfirm: '',
      gender: "female",
      birthday: new Date("30-12-2001"),
      phone: "0352997187",
      address: "151B, Can Tho",
      submit: null
    },
    onSubmit: async(values) => {
      // console.log("formik value: ", values);
      // try{
      //   var createUserDto = {
      //     email: values.email,
      //     password: values.password,
      //     firstname: values.firstName,
      //     lastname: values.lastName,
      //     gender: values.gender,
      //     birthday: values.birthday.toString(),
      //     phone: values.phone,
      //     address: values.address,
      //     role: "seller",
      //   }
      //   createUser(createUserDto);
      // } catch(err) {
        
      // }
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
          subheader="The information can be edited"
          title="Profile"
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
                    value={formik.values.firstName}
                  />
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
                    value={formik.values.lastName}
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
                    fullWidth
                    disableFuture
                    label="Birthday"
                    openTo="year"
                    views={['year', 'month', 'day']}
                    value={formik.values.birthday}
                    onChange={(value) => {
                      formik.setFieldValue('birthday', Date.parse(value));
                    }}
                    renderInput={(params) => <TextField fullWidth {...params} />}
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
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
