import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import {formatPrice} from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart, updateAmount, total }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <div>
                <button type="button">
                  <MdRemoveCircleOutline
                    size={20}
                    color="#7159C1"
                    onClick={() => decrement(product)}
                  />
                </button>
                <input type="number" readOnly value={product.amount} />
                <button type="button">
                  <MdAddCircleOutline
                    size={20}
                    color="#7159C1"
                    onClick={() => increment(product)}
                  />
                </button>
              </div>
              <td />
              <td>
                <strong>{product.subTotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subTotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(state.cart.reduce((total, product) => {
    return total + product.price * product.amount
  }, 0))
});

// Reduce serve para pegar um array e reduzir a um único valor, neste caso, passamos em todos os itens do array e somamos com total.
// O número 0 é prq o total inicia no 0.

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
