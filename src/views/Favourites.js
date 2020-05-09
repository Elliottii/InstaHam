import React from 'react';
import {Typography} from '@material-ui/core';
import FavouritesTable from '../components/FavouritesTable';

const Favourites = () => {
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Favourites</Typography>
      <FavouritesTable />
    </>
  );
};

export default Favourites;
