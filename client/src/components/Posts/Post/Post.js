import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardMedia, Button, Typography, Paper } from '@material-ui/core/';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Infos = () => {
    if (post.favorite?.length > 0) {
      return post.favorite.find((favorite) => favorite === (user?.result?.googleId || user?.result?._id))
        ? (
          <><Favorite fontSize="small" />&nbsp;{post.favorite.length > 2 ? `You and ${post.favorite.length - 1} others` : `${post.favorite.length} Fav${post.favorite.length > 1 ? 's' : ''}` }</>
        ) : (
          <><FavoriteBorder fontSize="small" />&nbsp;{post.favorite.length} {post.favorite.length === 1 ? 'Fav' : 'Favs'}</>
        );
    }

    return <><FavoriteBorder fontSize="small" />&nbsp;Fav</>;
  };

  const apiKey = '9f7098a1ea67a46ab40539e400554d88';

  const [state, setState] = useState(null);

  const getWeather = async (city, country) => {
    const apiCall = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${apiKey}`);
    const response = await apiCall.json();

    if (response.main?.temp) {
      setState(response);
    } else {
      window.alert(`Error getting weather from ${post.city}`);
    }
  };

  useEffect(() => {
    getWeather(post.city, post.country);
  }, [post]);

  if (!user?.result?.name) {
    return (
      <Paper elevation={0} className="paper" style={{ display: 'none' }}>
        <Typography variant="h6" align="center">
          Please Sign In!.
        </Typography>
      </Paper>
    );
  }

  return (
    <Card elevation={0} className={['card', classes.card]}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://i.imgur.com/klfRr4w.gif'} city={post.city} />
      <div className={classes.overlay}>
        <Typography className={classes.city} gutterBottom variant="h5" component="h2">{post.city}</Typography>
        <Typography className={classes.city} variant="body2" color="textSecondary" component="p">{post.country}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white', justifyContent: 'flex-end' }} size="small">
          <Edit fontSize="default" />
        </Button>
      </div>
      )}

      {!state
        ? <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>LOADING</div>
        : (
          <div>
            <div className={classes.details}>
              <Typography className={classes.name} variant="body2">{parseInt(state.main?.temp, 10)}°C</Typography>
              <Typography className={classes.infos} variant="body2">Feels like: {state.main?.feels_like}°C</Typography>
            </div>
            <div className={classes.drawing}>
              <img src={`http://openweathermap.org/img/wn/${state.weather?.[0]?.icon}@2x.png`} />
              <Typography variant="h6">{state.weather?.[0]?.description}</Typography>
            </div>
            <div className={classes.details}>
              <Typography style={{ color: '#87ceeb' }} variant="body2">▼ Min: {state.main?.temp_min}°C</Typography>
              <Typography style={{ color: '#ff1616' }} variant="body2">▲ Max: {state.main?.temp_max}°C</Typography>
            </div>
            <div className={classes.details}>
              <Typography variant="body2">Pressure: {state.main?.pressure} hPa</Typography>
              <Typography variant="body2">Humidity: {state.main?.humidity}%</Typography>
            </div>
            <div className={classes.details}>
              <Typography variant="body2">Wind: {state.wind?.speed} km/h</Typography>
              <Typography variant="body2">Wind: {state.wind?.deg}°</Typography>
            </div>
            <CardActions className={classes.cardActions}>
              <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                <Infos />
              </Button>
              {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
              <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                <DeleteIcon fontSize="small" /> Delete
              </Button>
              )}
            </CardActions>
          </div>
        )}
    </Card>
  );
};

export default Post;
