import {Button} from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {
  addFavouritesMedia,
  deleteFavouritesMedia, useFavouritesMedia, useSingleFavourites,
} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';

const FavouriteButton = ({match}) => {
  const [user] = useContext(MediaContext);
  const getFavourites = useSingleFavourites(match.params.id);
  function ButtonChange(props) {
    const checkFavourite = props.checkFavourite;
    if (checkFavourite) {
      return <DelFavouriteButton/>;
    }
    return <AddFavouriteButton/>;
  }

  function AddFavouriteButton(props) {
    return (
      <Button
        startIcon={
          <StarBorderIcon/>
        }
        onClick={() => {
          addFavouritesMedia(match.params.id, localStorage.getItem('token'));
          window.location.reload(false)
        }
        }
      >
      </Button>);
  }

  function DelFavouriteButton(props) {
    return (
      <Button
        startIcon={
          <StarIcon/>
        }
        onClick={() => {
          deleteFavouritesMedia(match.params.id, localStorage.getItem('token'));
          window.location.reload(false)
        }
        }
      >
      </Button>
    );
  }

  return (
    <>
      <ButtonChange checkFavourite={((getFavourites.find(item => item.user_id === user.user_id)))}/>
    </>
  );
};
FavouriteButton.propTypes = {
  match: PropTypes.object,
};
export default withRouter(FavouriteButton);
