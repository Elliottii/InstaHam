import React, {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@material-ui/core';
import {getAvatarImage} from '../hooks/ApiHooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import ProfileForm from '../components/ProfileForm';
import BackButton from '../components/BackButton';
// eslint-disable-next-line
import {makeStyles} from '@material-ui/core/styles/makeStyles';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = () => {
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  return (
    <>
      <BackButton/>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Profile</Typography>
      {user !== null &&
      <Card>
        {avatar.length > 0 &&
        <CardMedia
          component="img"
          image={mediaUrl + avatar.pop().filename}
          alt="Avatar image"
          title="Avatar image"
        />
        }

        <CardContent>
          <List>
            <ListItem>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={user.username} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText primary={user.email} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={user.full_name} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
      }
      <ProfileForm />
    </>
  );
};

export default Profile;
