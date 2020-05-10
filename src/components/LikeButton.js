import {Button} from '@material-ui/core';
import LikeIcon from '@material-ui/icons/Favorite';
import UnlikeIcon from '@material-ui/icons/FavoriteBorder';
import React, {useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {
  addLike,
  deleteLike, useLike, useSingleMedia,
} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const LikeButton = ({match}) => {
  const [user] = useContext(MediaContext);
  const getLikes = useLike(match.params.id);
  function ButtonChange(props) {
    const checkLike = props.checkLike;
    if (checkLike) {
    return <UnlikeButton/>;
    }
    return <LikeButton/>;
  }

  function LikeButton(props) {
    return (
      <Button
        startIcon={
          <UnlikeIcon/>
        }
        onClick={() => {
          {
            addLike(match.params.id, 1, localStorage.getItem('token'));
            window.location.reload();
          }
        }}
      >
      </Button>);
  }

  function UnlikeButton(props) {
    return (
      <Button
        startIcon={
          <LikeIcon/>
        }
        onClick={() => {
          {
            deleteLike(match.params.id, localStorage.getItem('token'));
            window.location.reload();
          }
        }}
      >
      </Button>);
  }

  return (
    <>
      <ButtonChange checkLike={(getLikes.find(item => item.user_id === user.user_id))}/>
      <Button>
        Likes: {getLikes.length}
      </Button>
    </>
  );
};
LikeButton.propTypes = {
  id: PropTypes.string,
};
export default withRouter(LikeButton);
