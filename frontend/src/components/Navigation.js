import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from '../images/finalss.png'
import LanguageIcon from '@mui/icons-material/Language';
import { Badge, Select, createTheme } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';
import { Link } from 'react-router-dom';

const pages = ['Home', 'About', 'Princing', 'Contact'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navigation = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //Select
    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    //Color
    const theme = createTheme({
        palette: {
            primary: {
                main: '#d6b647',
            },
            secondary: {
                main: '#d6b674',
            },
        },
    });


    return (
        <AppBar position="sticky" >
            <Container maxWidth="xl" className='nav'>
                <Toolbar disableGutters>
                    <Link to={'/'}>
                        <Avatar alt="Logo" src={Logo} className='logo' sx={{ width: 56, height: 56 }} />
                    </Link>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
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

                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        <Paper
                            component="form"
                            sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', width: 400, borderRadius: '30px' }}

                        >

                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Ville"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <InputBase
                                className="bold-placeholder"
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Quartier"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Type"
                                inputProps={{ 'aria-label': 'search google maps' }}
                            />

                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                <SearchIcon className='search' />
                            </IconButton>
                        </Paper>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" className='open'>
                            <Box sx={{ display: 'flex', gap: '15px' }} className='ml'>
                                <Typography sx={{ color: 'black' }}>Mode hôte</Typography>
                                <LanguageIcon sx={{ color: 'black' }} />
                            </Box>
                            <Box className='gbtn'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: '10px' }}  >
                                    <MenuIcon />
                                    <Badge badgeContent={1} color="error">
                                        <Avatar alt="Christ Mbuli" src="/static/images/avatar/2.jpg" sx={{ width: 35, height: 35, bgcolor: '#000000' }} />
                                    </Badge>
                                </IconButton>

                            </Box>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    );
};

export default Navigation;