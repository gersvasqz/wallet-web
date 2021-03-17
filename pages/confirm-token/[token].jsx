import { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import Router, { useRouter } from 'next/router';
import cookie from 'js-cookie';
import handleOperation from '../../lib/handleOperation';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Modal = ({ res, handleClose, classes }) => (
  <div>
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={!!res.msg}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        {res.msg}
      </DialogTitle>
      <DialogContent dividers>
        <div className={classes.root}>
          <Alert severity={res.error ? 'error' : 'success'}>
            <AlertTitle>{res.msg}</AlertTitle>
            <ul>
              {res.errors?.map((item) => <li>{item}</li>)}
            </ul>
          </Alert>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
const confirmToken = () => {
  const [res, setRes] = useState({
    error: false,
    msg: false,
    errors: [],
  });
  const { token } = useRouter().query;
  const handleClose = () => {
    if (process.browser) {
      cookie.remove('auth-wallet');
      Router.push('/');
    }
  };
  useEffect(() => {
    if (!res.msg) handleOperation('Confirmar pago', { token }, setRes);
  });

  const classes = useStyles();

  return (
    <>
      { res.msg && <Modal res={res} handleClose={handleClose} classes={classes} />}
    </>
  );
};
export default confirmToken;
