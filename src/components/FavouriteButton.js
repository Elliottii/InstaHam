import {Button} from '@material-ui/core';
import StarsIcon from '@material-ui/icons/Stars';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  addFavouritesMedia,
  deleteFavouritesMedia,
} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';

const FavouriteButton = ({match}) => {
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  };

  return (
    <Button
      startIcon={
        toggle ?
          <StarsIcon/> :
          <HighlightOffIcon/>
      }
      onClick={() => {
        {
          toggle ?
            addFavouritesMedia(match.params.id, localStorage.getItem('token')) :
            deleteFavouritesMedia(match.params.id, localStorage.getItem('token'));
        }
        showHide();
      }}
    >
      {toggle ? 'Add favourite' : 'Delete favourite'}
    </Button>
  );
};
FavouriteButton.propTypes = {
  id: PropTypes.string,
};
export default withRouter(FavouriteButton);
