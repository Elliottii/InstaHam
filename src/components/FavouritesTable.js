import React from 'react';
import MediaRow from './MediaRow';
import {useFavouritesMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const FavouritesTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const picArray = useFavouritesMedia();

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={matches ? 3 : 2}>
        {
          picArray.map((file) =>
            <GridListTile key={file.file_id}>
              <MediaRow file={file}/>
            </GridListTile>)
        }
      </GridList>
    </div>
  );
};
export default FavouritesTable;
