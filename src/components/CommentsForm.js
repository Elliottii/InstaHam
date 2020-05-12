import {Button, Grid} from '@material-ui/core';
import {ValidatorForm} from 'react-material-ui-form-validator';
import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom';
import useCommentsForm from '../hooks/CommentsHooks';
import {addComment} from '../hooks/ApiHooks';
import TextField from '@material-ui/core/TextField';

const CommentsForm = ({match}) => {
  const doComment = async () => {
    try {
      const file_id = (match.params.id);
      const token = localStorage.getItem('token');
      await addComment(file_id, inputs.comment, token);
      window.location.reload();
    } catch (e) {
      console.log(e.message);
    }

  };
  const {inputs, handleInputChange, handleSubmit} = useCommentsForm(doComment);


  return (
    <ValidatorForm
      onSubmit={handleSubmit}
      instantValidate={false}
      noValidate
    >
    <Grid container>
      <Grid item>

          <Grid container>
            <Grid container item>
              <TextField
                fullWidth
                type="text"
                name="comment"
                multiline
                label="Leave comment"
                onChange={handleInputChange}
                value={inputs.comment}
                validators={[
                  'required',
                ]}
                errorMessages={[
                  'Cannot be empty',
                ]}
              />
              <Button
                style={{
                  backgroundColor: 'black',
                }}
                fullWidth
                color="primary"
                type="submit"
                variant="contained">
                Send
              </Button>
            </Grid>
          </Grid>
      </Grid>
    </Grid>
    </ValidatorForm>
  );
};

CommentsForm.propTypes = {
  match: PropTypes.object,
};

export default withRouter(CommentsForm);
