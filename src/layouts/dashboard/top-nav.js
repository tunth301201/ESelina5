import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton, InputAdornment, OutlinedInput, Stack,
  SvgIcon,
  Tooltip,
  Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import FireIcon from '@heroicons/react/24/solid/FireIcon';
import TrophyIcon from '@heroicons/react/24/solid/TrophyIcon';
import SparklesIcon from '@heroicons/react/24/solid/SparklesIcon';
import { useEffect, useState } from 'react';
import { getAllCategories, getCartByUserId } from 'src/api/apiServices';
import {selinashoplogo} from '../../components/selinashoplogo.png'
import HomeIcon from '@heroicons/react/24/solid/HomeIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import ShoppingCartIcon from '@heroicons/react/24/solid/ShoppingCartIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { useFormik } from 'formik';
import { searchProductResult } from 'src/api/apiServices';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const TOP_NAV_HEIGHT = 64;

export const TopNav = ({onNavOpen, onCartUpdated}) => {
  // const { onNavOpen, carts, updateCart } = props;
  const router = useRouter();
  const accountPopover = usePopover();
  const [carts, setCarts] = useState([]);
  const [noOfCarts, setNoOfCarts] = useState(0);

  const updateCart = () => {
    getCartByUserId().then((res) => {
      setCarts(res.data);
      const { cart_items } = res.data;
      if(cart_items){
        setNoOfCarts(cart_items.length);
      } 
    });
  };
  
  
  useEffect(() => {
    updateCart();
  }, [onCartUpdated]);

  const handleViewCart = () => {
    router.push({
      pathname: '/cart',
    });
  }


  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getAllCategories().then((res) => {
      setCategories(res.data);
    })
  },[]);

  const [selectedCategory, setSelectedCategory] = useState(categories[0]?._id);

  const handleSelectChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      search: '',
      submit: null
    },
    onSubmit: (values) => {
      if (values.search && values.search.length > 0) {
      router.push({
        pathname: '/promotion',
        query: { search: values.search }
      });
    }
  }
  });
 

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          top: 0,
        }}
      >
       

       
{/* Nav1 */}
<header class="bg-white">
  <div class="container mx-auto px-4 py-8 flex items-center">

    <div class="mr-auto md:w-48 flex-shrink-0 center" onClick={onNavOpen}>
      <img class="" src="/assets/selinashoplogo.png" alt="" width="100px"/>
    </div>

{/* SEARCHING */}
<form onSubmit={formik.handleSubmit}>
    <div class="w-full max-w-xs xl:max-w-lg 2xl:max-w-2xl bg-gray-100 rounded-md hidden xl:flex items-center">
      <select  onChange={handleSelectChange} value={selectedCategory} class="bg-transparent uppercase font-bold text-sm p-4 mr-4" name="" id="">
        
        {categories?.map((option) => (
                    <option
                      key={option._id}
                      value={option._id}
                    >
                      {option.name}
                    </option>
                  ))}
      </select>
      
        <input class="border-l border-gray-300 bg-transparent font-semibold text-sm pl-4" value={formik.values.search} onChange={formik.handleChange} name='search' type="text" placeholder="I'm searching for ..." />
        <button type="submit" class="border-l border-gray-300 bg-transparent font-semibold text-sm ml-auto">
          <svg class="h-5 px-4 text-gray-500 svg-inline--fa fa-search fa-w-16 fa-9x" aria-hidden="true" focusable="false" data-prefix="far" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"></path></svg>
        </button>
    </div>
</form>



    <div class="ml-auto md:w-48 hidden sm:flex flex-col place-items-end">
      <span class="font-bold md:text-xl">+84 352 997 187</span>
      <span class="font-semibold text-sm text-gray-400">Support 24/7</span>
    </div>
    

 
    <nav class="contents">
      <ul class="ml-4 xl:w-48 flex items-center justify-end">
        <li class="ml-2 lg:ml-4 relative inline-block">
        <Tooltip title="Cart">
              <IconButton onClick={handleViewCart.bind(null)}>
                <Badge
                  badgeContent={noOfCarts}
                  color="success"
                >
                  <SvgIcon fontSize="medium">
                    <ShoppingBagIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
        </li>
        <li class="ml-2 lg:ml-4 relative inline-block">
        

            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40
              }}
              src="/assets/avatars/avatar-neha-punita.png"
            />
        </li>
      </ul>
    </nav>


  </div>
  <hr/>
</header>



{/* Nav2 */}
<header class="header sticky top-0 bg-white shadow-md flex items-center justify-between px-0 py-0">

    <h1 class="w-3/12">
        
    </h1>


    <nav class="nav font-semibold text-lg">
        <ul class="flex items-center">
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
              <Link href='/'>
                <SvgIcon><HomeIcon/></SvgIcon> Home
              </Link>
            </li>
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link href='/promotion'>
                <SvgIcon><FireIcon/></SvgIcon> Promotion
              </Link>          
            </li>
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link href='/collection'>
               <SvgIcon><TagIcon/></SvgIcon> Collection
              </Link>
            </li>
            <li class="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
              <Link href='/order'>
                <SvgIcon><ShoppingBagIcon/></SvgIcon> Order
              </Link>
            </li>
        </ul>
    </nav>

   
    <div class="w-3/12 flex justify-end">
        
    </div>
</header>
 



      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
