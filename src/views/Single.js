import React from 'react';
import PropTypes from 'prop-types';
import {
  useSingleMedia,
} from '../hooks/ApiHooks';
import {
  Typography,
  Paper,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comments from './Comments';
import FavouriteButton from '../components/FavouriteButton';
import LikeButton from '../components/LikeButton';

const Single = ({match}) => {
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = (JSON.parse(file.description));
  }
  return (
    <>
      {file !== null &&
      <>
        <BackButton/>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>{file.title}</Typography>
        <Typography
          component="h5"
          variant="h5"
          gutterBottom>
          {file.user ? file.user.username : 'login to see userdata'}
        </Typography>
        <Paper>
          {description &&
          <Media file={file} description={description}/>
          }
          <FavouriteButton/>
          <LikeButton/>
        </Paper>
        <Typography
          component="p"
          variant="caption"
          gutterBottom>
          {description.desc}
        </Typography>
      </>
      }
      <Comments match={match}/>
    </>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};

export default Single;
