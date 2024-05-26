import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { ListItemIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from "../../logo.svg";
import styles from './NavBar.module.css';

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElSubMenus, setAnchorElSubMenus] = useState({});

  const { orders, loading } = useSelector((state) => state.orders);

  const customers = [...new Set(orders.map(order => order.CustomerName))];
  const items = [...new Set(orders.flatMap(order => order.Items.map(item => item.Item)))];

  if (loading) {
    return null;
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSubMenu = (event, page) => {
    event.stopPropagation();
    setAnchorElSubMenus(prev => ({ ...prev, [page]: event.currentTarget }));
  };

  const handleCloseSubMenu = (page) => {
    setAnchorElSubMenus(prev => ({ ...prev, [page]: null }));
  };

  return (
    <AppBar position="fixed" className={styles.AppBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.NavBar}>
          <div className={styles.logo}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: 2,
                textDecoration: 'none',
              }}
            >
              <img
                src={logo}
                alt="Order Statistics Logo"
                style={{ height: '34px' }}
              />
            </Box>
          </div>
          <Box
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt="Order Statistics Logo"
              style={{ height: '34px' }}
            />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }} className={styles.xsMenu}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                onClick={(e) => handleOpenSubMenu(e, 'Customers')}
              >
                <Typography textAlign="center">Customers</Typography>
                <ListItemIcon>
                  <ExpandMoreIcon />
                </ListItemIcon>
              </MenuItem>
              <Menu
                anchorEl={anchorElSubMenus['Customers']}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElSubMenus['Customers'])}
                onClose={() => handleCloseSubMenu('Customers')}
                className={styles.subMenu}
              >
                {customers.map((customer) => (
                  <MenuItem
                    key={customer}
                    component={Link}
                    to={`/customer/${customer}`}
                    onClick={() => handleCloseSubMenu('Customers')}
                  >
                    {customer}
                  </MenuItem>
                ))}
              </Menu>
              <MenuItem
                onClick={(e) => handleOpenSubMenu(e, 'Items')}
              >
                <Typography textAlign="center">Items</Typography>
                <ListItemIcon>
                  <ExpandMoreIcon />
                </ListItemIcon>
              </MenuItem>
              <Menu
                anchorEl={anchorElSubMenus['Items']}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElSubMenus['Items'])}
                onClose={() => handleCloseSubMenu('Items')}
                className={styles.subMenu}
              >
                {items.map((item) => (
                  <MenuItem key={item} component={Link} to={`/item/${item}`} onClick={() => handleCloseSubMenu('Items')}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Menu>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <MenuItem
              onClick={(e) => handleOpenSubMenu(e, 'Customers')}
            >
              <Typography textAlign="center">Customers</Typography>
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            </MenuItem>
            <Menu
              anchorEl={anchorElSubMenus['Customers']}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElSubMenus['Customers'])}
              onClose={() => handleCloseSubMenu('Customers')}
              className={styles.subMenu}
            >
              {customers.map((customer) => (
                <MenuItem
                  key={customer}
                  component={Link}
                  to={`/customer/${customer}`}
                  onClick={() => handleCloseSubMenu('Customers')}
                >
                  {customer}
                </MenuItem>
              ))}
            </Menu>
            <MenuItem
              onClick={(e) => handleOpenSubMenu(e, 'Items')}
            >
              <Typography textAlign="center">Items</Typography>
              <ListItemIcon>
                <ExpandMoreIcon />
              </ListItemIcon>
            </MenuItem>
            <Menu
              anchorEl={anchorElSubMenus['Items']}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElSubMenus['Items'])}
              onClose={() => handleCloseSubMenu('Items')}
              className={styles.subMenu}
            >
              {items.map((item) => (
                <MenuItem key={item} component={Link} to={`/item/${item}`} onClick={() => handleCloseSubMenu('Items')}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
