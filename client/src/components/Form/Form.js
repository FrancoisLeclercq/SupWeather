import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { createPost, updatePost } from '../../actions/posts';
import useStyles from './styles';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ city: '', country: '', data: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((country) => country._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ city: '', country: '', data: '', selectedFile: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    }
    document.querySelector('#file > input').value = null;
    clear();
  };

  if (!user?.result?.name) {
    return (
      <Paper elevation={0} className="paper" style={{ padding: 12 }}>
        <Typography variant="h6" align="center">
          Please Sign In to SupWeather to see the climate around the world.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} className={['paper noselect', classes.transition]} style={{ padding: 12 }}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.city}"` : '+ Add city'}</Typography>
        <TextField className="placeholderStyle form-control" name="city" variant="outlined" label="City name" required fullWidth value={postData.city} onChange={(e) => setPostData({ ...postData, city: e.target.value })} />
        <TextField className="placeholderStyle form-control" name="country" variant="outlined" label="Country code" fullWidth value={postData.country} onChange={(e) => setPostData({ ...postData, country: e.target.value })} />
        <div id="file" className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" style={{ backgroundColor: '#5FCB7B', color: 'white' }} size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;
