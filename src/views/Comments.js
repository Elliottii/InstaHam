import {useComments} from '../hooks/ApiHooks';
import {
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';



const Comments = ({match}) => {

  const commentList = useComments(match.params.id);

  return (
    <>
      {commentList.map((comment) => {
        return <Paper>
          <List >
            <ListItem >
              <ListItemText
                primary={comment.comment}
                secondary={comment.time_added}
              />
            </ListItem>
          </List>
        </Paper>
      })}
    </>
  );
};

Comments.propTypes = {
  match: PropTypes.object,
};
export default Comments;
