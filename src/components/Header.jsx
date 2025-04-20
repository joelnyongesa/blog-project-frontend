import { alpha, styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Header({ user, onLogout }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${baseUrl}logout`, { 
        method: "DELETE",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      onLogout();
      setDrawerOpen(false);
      setSnackbar({
        open: true,
        message: 'Logged out successfully!',
        severity: 'success',
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || 'Logout failed. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        paddingY: '2rem'
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }} color='#000'>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              sx={{ 
                fontWeight: 700,
                textDecoration: 'none',
                color: '#000'
              }}
            >
              Articulate
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
            {user ? (
              <>
                <Typography 
                  variant="body2" 
                  sx={{ mr: 1, color: "#000", cursor: 'pointer' }}
                  onClick={handleMenuClick}
                >
                  Welcome, {user.username}!
                </Typography>
                <Avatar 
                  src={user.avatar} 
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  onClick={handleMenuClick}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={menuOpen}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                    },
                  }}
                >
                  <MenuItem 
                    component={Link} 
                    to="/update-profile"
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <EditIcon fontSize="small" />
                    </ListItemIcon>
                    Update Profile
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    to="/my-articles"
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <ArticleIcon fontSize="small" />
                    </ListItemIcon>
                    My Articles
                  </MenuItem>
                  <MenuItem 
                    component={Link} 
                    to="/create-article"
                    onClick={handleMenuClose}
                  >
                    <ListItemIcon>
                      <PostAddIcon fontSize="small" />
                    </ListItemIcon>
                    Create New Article
                  </MenuItem>
                </Menu>
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleLogout}
                  sx={{ ml: 2 }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  component={Link}
                  to="/login"
                  color="primary"
                  variant="text"
                >
                  Sign In
                </Button>
                <Button 
                  component={Link}
                  to="/signup"
                  color="primary"
                  variant="contained"
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: '56px',
                  width: '100%',
                  maxWidth: '100%',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                
                {user ? (
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar 
                      src={user.avatar} 
                      sx={{ width: 64, height: 64, mb: 2, mx: 'auto' }}
                    />
                    <Typography variant="h6" gutterBottom>
                      Welcome, {user.username}!
                    </Typography>
                    
                    <MenuItem 
                      component={Link} 
                      to="/update-profile"
                      onClick={toggleDrawer(false)}
                      sx={{ py: 1.5 }}
                    >
                      <ListItemIcon>
                        <EditIcon fontSize="small" />
                      </ListItemIcon>
                      Update Profile
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/my-articles"
                      onClick={toggleDrawer(false)}
                      sx={{ py: 1.5 }}
                    >
                      <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                      </ListItemIcon>
                      My Articles
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/create-article"
                      onClick={toggleDrawer(false)}
                      sx={{ py: 1.5 }}
                    >
                      <ListItemIcon>
                        <PostAddIcon fontSize="small" />
                      </ListItemIcon>
                      Create New Article
                    </MenuItem>
                    
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ mb: 2, mt: 2 }}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <>
                    <MenuItem sx={{ py: 1.5 }}>
                      <Button 
                        component={Link}
                        to="/signup"
                        color="primary" 
                        variant="contained" 
                        fullWidth
                        onClick={toggleDrawer(false)}
                      >
                        Sign Up
                      </Button>
                    </MenuItem>
                    <MenuItem sx={{ py: 1.5 }}>
                      <Button 
                        component={Link}
                        to="/login"
                        color="primary" 
                        variant="outlined" 
                        fullWidth
                        onClick={toggleDrawer(false)}
                      >
                        Sign In
                      </Button>
                    </MenuItem>
                  </>
                )}
                
                <Divider sx={{ my: 3 }} />
              </Box>
            </Drawer>
          </Box>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity={snackbar.severity}
              variant="filled"
              sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}