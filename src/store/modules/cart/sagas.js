import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { formatPrice } from '../../../util/format';

import api from '../../../services/api';
import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExist = yield select(state => state.cart.find(p => p.id === id));

  if (productExist) {
    const amount = productExist.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCartSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
// All é utilizado para ouvir as actions, takeLatest para "pegar" somente a última.
// Primeiro parâmetro define qual action, segundo define qual função será executada.
