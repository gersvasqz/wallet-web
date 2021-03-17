import axios from 'axios';

const handleOperation = async (operation, data, res) => {
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
    res(resp.data);
  }).catch((e) => {
    console.log('e', e.response.data);
    res(e.response.data);
  });
};

export default handleOperation;
