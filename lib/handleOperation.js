/* eslint-disable eqeqeq */
import axios from 'axios';
import cookie from 'js-cookie';
import translate from '../messages.json';

const translateResp = ({
  error, errors, msg, data, session,
}) => {
  const res = {
    error: error == 'true',
    msg: '',
    errors: [],
  };
  const sendToken = 'Your Authorization Token has been sent to: ';
  if (data) res.msg = `${data.name}, su saldo es de ${data.value}$`;
  else if (msg.includes(sendToken)) res.msg = `${translate[sendToken]} ${msg.replace(sendToken, '')}`;
  else res.msg = translate[msg];
  if (Array.isArray(errors)) errors.forEach((item) => res.errors.push(translate[item]));
  else if (typeof errors === 'string') res.errors.push(translate[errors]);

  if (session) {
    if (process.browser) {
      if (cookie.get('auth-wallet')) cookie.remove('auth-wallet');
      cookie.set('auth-wallet', session, { expires: 1 });
    }
  }
  return res;
};

const handleOperation = (operation, data, res) => {
  const { NEXT_PUBLIC_API_HOST } = process.env;
  let endpoint = '';
  let method = 'post';
  switch (operation) {
    case 'Registrar':
      endpoint = 'client';
      break;
    case 'Recargar':
      endpoint = 'recharge';
      break;
    case 'Pagar':
      endpoint = 'payment';
      break;
    case 'Confirmar pago':
      endpoint = `confirm-token/${data.token}`;
      method = 'get';
      axios.defaults.headers.common['auth-wallet'] = cookie.get('auth-wallet');
      break;
    case 'Balance':
      endpoint = 'balance';
      break;
    default:
      res({ error: true, msg: 'Operación no valida', errors: [] });
      return;
  }

  axios({
    method,
    url: `${NEXT_PUBLIC_API_HOST}${endpoint}`,
    data: method === 'post' ? data : {},
  }).then((resp) => {
    res(translateResp(resp.data));
  }).catch((e) => {
    if (e.response && e.response.data) res(translateResp(e.response.data));
  });
};

export default handleOperation;
