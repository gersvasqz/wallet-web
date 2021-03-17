import { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const MuiAlert = (props) => (<Alert elevation={6} variant="filled" {...props} />);

const MyALert = ({ res, show, handleClose }) => (
  <Snackbar open={show} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <MuiAlert onClose={handleClose} severity={res.error ? 'error' : 'success'}>
      {res.msg}
    </MuiAlert>
  </Snackbar>
);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const notification = ({ res, setRes }) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setRes({
      error: false,
      msg: null,
      errors: [],
    });
    setShow(false);
  };

  useEffect(() => {
    if (res.msg) setShow(true);
    if (show) {
      setTimeout(() => {
        setRes({
          error: false,
          msg: null,
          errors: [],
        });
        setShow(false);
      }, 30000);
    }
  });
  return (
    <>
      {res.msg && (
      <div className={classes.root}>
        <Alert severity={res.error ? 'error' : 'success'}>
          <AlertTitle>{res.msg}</AlertTitle>
          <ul>
            {res.errors?.map((item) => <li>{item}</li>)}
          </ul>
        </Alert>
      </div>
      )}
      {show && <MyALert res={res} show={show} handleClose={handleClose} />}
    </>
  );
};

export default notification;
