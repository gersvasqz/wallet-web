import React, { useState, useEffect, useRef } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Grid, Button, InputAdornment as IA } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import handleOperation from '../lib/handleOperation';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const FormRegister = ({ operation, res }) => {
  const classes = useStyles();
  const formRef = useRef();
  const [req, setRequest] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOperation(operation, req, res);
  };

  const setData = (prop) => ({ target }) => {
    const { value: v } = target;
    setRequest({ ...req, [prop]: v });
  };

  useEffect(() => {
    formRef.current.resetValidations();
  });
  return (
    <ValidatorForm ref={formRef} className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
      <Grid container item xs={12} spacing={3}>
        {operation === 'Registrar' && (
          <>
            <TextValidator
              id="name"
              value={req.name}
              onChange={setData('name')}
              label="Nombre"
              variant="outlined"
              validators={['required']}
              errorMessages={['Nombre es requerido']}
            />
            <TextValidator
              id="email"
              value={req.email}
              onChange={setData('email')}
              label="Email"
              variant="outlined"
              validators={['required', 'isEmail']}
              errorMessages={['Email es requerido', 'Email no válido']}
            />
          </>
        )}
        {
          operation !== 'Confirmar pago' && (
            <>
              <TextValidator
                id="dni"
                label="DNI"
                value={req.dni}
                onChange={setData('dni')}
                variant="outlined"
                validators={['required']}
                errorMessages={['DNI es requerido']}
              />
              <TextValidator
                id="phone"
                type="number"
                value={req.phone}
                onChange={setData('phone')}
                label="Teléfono"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                validators={['required', 'minNumber:0']}
                errorMessages={['Teléfono es requerido', 'Debe ser positivo']}
              />
            </>
          )
        }
        {
          (operation === 'Pagar' || operation === 'Recargar') && (
            <TextValidator
              id="value"
              label="Valor"
              type="number"
              value={req.value}
              onChange={setData('value')}
              variant="outlined"
              InputProps={{
                startAdornment: (<IA position="start">$</IA>),
              }}
              validators={['required']}
              errorMessages={['Valor es requerido']}
            />
          )
        }
        {
          operation === 'Confirmar pago'
          && (
            <TextValidator
              id="token"
              label="Token"
              value={req.token}
              onChange={setData('token')}
              variant="outlined"
              validators={['required']}
              errorMessages={['Token es requerido']}
            />
          )
        }
      </Grid>
      <Grid container item xs={12}>
        <p />
      </Grid>
      <Grid container item xs={12}>
        <Button type="submit" variant="contained" color="primary">
          {operation}
        </Button>
      </Grid>
    </ValidatorForm>
  );
};

export default FormRegister;
