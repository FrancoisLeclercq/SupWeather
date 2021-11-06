import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '43%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
    marginLeft: '20px',
    marginRight: '20px',
    marginBottom: '10px',
  },
  title: {
    padding: '16 16px',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    transition: '0.25s',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: '27px',
    fontWeight: 'bold',
    marginBottom: '-5em',
  },
  infos: {
    marginTop: '0.7em',
  },
  city: {
    color: 'white',
    fontWeight: 'bold',
  },
  drawing: {
    textAlign: 'center',
    marginTop: '-0.75em',
    marginBottom: '1em',
  },
});
