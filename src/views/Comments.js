import {
  deleteComment,
  useComments,
} from '../hooks/ApiHooks';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import CommentsForm from '../components/CommentsForm';


const Comments = ({match}) => {
  const [user] = useContext(MediaContext);
  const commentList = useComments(match.params.id);

  return (
    <>
      {
        commentList.map((comment) =>
          <Paper>
            <List>
              <ListItem >
                <ListItemText
                  primary={comment.comment}
                  secondary={comment.time_added}
                />
                <IconButton
                  aria-label={`Delete file`}
                  onClick={() => {
                    if (comment.user_id === user.user_id) {
                      const delOK = window.confirm(
                        'Do you really want to delete?');
                      if (delOK) {
                        deleteComment(comment.comment_id);
                      }
                    } else {
                      window.alert('You can only delete own comments');
                    }
                  }
                  }
                >Delete</IconButton>
              </ListItem>
            </List>
          </Paper>)
      }
      <CommentsForm/>
    </>
  );
};

Comments.propTypes = {
  match: PropTypes.object,
};
export default Comments;
