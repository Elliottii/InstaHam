import {Button} from '@material-ui/core';
import LikeIcon from '@material-ui/icons/Favorite';
import UnlikeIcon from '@material-ui/icons/FavoriteBorder';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  addLike,
  deleteLike,
} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';

const LikeButton = ({match}) => {
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <Button
      startIcon={
        toggle ?
          <UnlikeIcon/> :
          <LikeIcon/>
      }
      onClick={() => {
        {
          toggle ?
            addLike(match.params.id, 1, localStorage.getItem('token')) :
            deleteLike(match.params.id, localStorage.getItem('token'));
        }
        showHide();
      }}
    >
      {toggle ? 'Like' : 'Unlike'}
    </Button>
  );
};
LikeButton.propTypes = {
  id: PropTypes.string,
};
export default withRouter(LikeButton);
