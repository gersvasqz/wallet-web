import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const ListItems = ({ setOperation }) => (
  <List>
    <ListItem button onClick={() => setOperation('Registrar')}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Registrar Cliente" />
    </ListItem>
    <ListItem button onClick={() => setOperation('Recargar')}>
      <ListItemIcon>
        <CreditCardIcon />
      </ListItemIcon>
      <ListItemText primary="Recargar" />
    </ListItem>
    <ListItem button onClick={() => setOperation('Pagar')}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Pagar" />
    </ListItem>
    <ListItem button onClick={() => setOperation('Confirmar pago')}>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Confirmar pago" />
    </ListItem>
    <ListItem button onClick={() => setOperation('Balance')}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Balance" />
    </ListItem>
  </List>
);

export default ListItems;
