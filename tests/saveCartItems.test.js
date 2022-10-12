const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('verifica se localStorage.setItem é chamado', () => {
    saveCartItems('ID: MLB2663207668 | TITLE: Microsoft Office 365 Personal 1 Usuário (box) Qq2-01386 | PRICE: $99');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  })

  it('verifica se localStorage.setItem foi chamado com parâmetros especificos', () => {
    saveCartItems('ID: MLB2663207668 | TITLE: Microsoft Office 365 Personal 1 Usuário (box) Qq2-01386 | PRICE: $99');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItem', 'ID: MLB2663207668 | TITLE: Microsoft Office 365 Personal 1 Usuário (box) Qq2-01386 | PRICE: $99');
  })
});
