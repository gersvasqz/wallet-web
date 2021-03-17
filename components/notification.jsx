import { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => (<MuiAlert elevation={6} variant="filled" {...props} />);

const MyALert = (res, show, handleClose) => (
  <Snackbar open={show} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
    <Alert onClose={handleClose} severity={res.error ? 'error' : 'success'}>
      {res.msg}
    </Alert>
  </Snackbar>
);

const notification = (res) => {
  const [show, setShow] = useState(false);
  const handleClose = (event, reason) => {
    console.log(event, reason);
    if (reason === 'clickaway') return;
    setShow(false);
  };

  useEffect(() => {
    if (res.msg) setShow(true);
    if (show) setTimeout(() => setShow(false), 30000);
  });
  console.log('show', show);
  return (
    <>
      {res.error && (
      <Grid container xs={12}>
        <Grid item className="alert alert-danger mt-3">
          {res.msg}
        </Grid>
        <Grid item className="alert alert-danger mt-3">
          <ul>
            {res.errors.map((item) => <li>{item}</li>)}
          </ul>
        </Grid>
      </Grid>
      )}
      {show && <MyALert res={res} show={show} handleClose={handleClose} />}
    </>
  );
};

export default notification;
