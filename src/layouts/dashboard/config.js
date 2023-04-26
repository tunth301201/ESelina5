import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import DocumentChartBarIcon from '@heroicons/react/24/solid/DocumentChartBarIcon';
import FireIcon from '@heroicons/react/24/solid/FireIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import TagIcon from '@heroicons/react/24/solid/TagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Product',
    path: '/product',
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Collection',
    path: '/collection',
    icon: (
      <SvgIcon fontSize="small">
        <TagIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Order',
    path: '/order',
    icon: (
      <SvgIcon fontSize="small">
        <DocumentChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'User',
    path: '/user',
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Promotion',
    path: '/promotion',
    icon: (
      <SvgIcon fontSize="small">
        <FireIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Account',
    path: '/account',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
];
