import React, {useContext, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  fade,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import VPNKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import UploadIcon from '@material-ui/icons/NoteAdd';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import StarsIcon from '@material-ui/icons/Stars';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userdata = await checkToken(localStorage.getItem('token'));
        setUser(userdata);
      } catch (e) {
        history.push('/home');
      }
    };

    checkUser();
  }, [history, setUser]);

  return (
    <>
      <AppBar style={{background: 'black'}}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <ListItem
            button
            component={RouterLink}
            to="/home"
          >
            <ListItemIcon>
              <img src="http://users.metropolia.fi/~eelik/instaham/instahamlogo.png"
                   alt="logo"/>
            </ListItemIcon>
          </ListItem>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          {user === null &&
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/"
          >
            <ListItemIcon>
              <VPNKeyIcon/>
            </ListItemIcon>
            <ListItemText primary="Login"/>
          </ListItem>
          }

          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/home"
          >
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
          {user !== null &&
          <>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/profile"
            >
              <ListItemIcon>
                <AccountBoxIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile"/>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/upload"
            >
              <ListItemIcon>
                <UploadIcon/>
              </ListItemIcon>
              <ListItemText primary="Upload"/>
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/myfiles"
            >
              <ListItemIcon>
                <PermMediaIcon/>
              </ListItemIcon>
              <ListItemText primary="My files"/>
            </ListItem>

            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/myfavourites"
            >
              <ListItemIcon>
                <StarsIcon/>
              </ListItemIcon>
              <ListItemText primary="Favourites"/>
            </ListItem>

            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/logout"
            >
              <ListItemIcon>
                <ExitToAppIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout"/>
            </ListItem>

          </>
          }
        </List>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Nav);
