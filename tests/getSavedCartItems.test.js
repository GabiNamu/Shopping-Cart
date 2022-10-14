const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('verifica se localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('verifica se localStorage.getItem é chamada com o parâmetro cartItems', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  })
//  it('', () => {
//   if (localStorage.getItem('cartItems')) {
//     const obj = JSON.parse(localStorage.getItem('cartItems'));
//     expect(getSavedCartItems()).toEqual(obj);
//   }
//  })
  // it('espera um retorno', () => {
  //   const createCartLi = (param, c) => {
  //     const li = document.createElement('li');
  //     li.innerText = param;
  //     li.addEventListener('click', cartItemClickListener);
  //     ol[0].appendChild(li);
  //     resultadoSoma += Number(c[1]);
  //     total.innerText = resultadoSoma;
  //   };
  //   if (localStorage.getItem('cartItems')) {
  //     expect(getSavedCartItems(createCartLi)).toReturnWith('ok');
  //   }
  // })

  // it('', () => {
  //   const createCartLi = (param, c) => {
  //     const li = document.createElement('li');
  //     li.innerText = param;
  //     li.addEventListener('click', cartItemClickListener);
  //     ol[0].appendChild(li);
  //     resultadoSoma += Number(c[1]);
  //     total.innerText = resultadoSoma;
  //   };
  //   getSavedCartItems(createCartLi);
  //   expect(getSavedCartItems).toHaveBeenCalledWith(createCartLi);
  // })

  // it('', () => {
  //   if (localStorage.getItem('cartItems') === 'undefined' || localStorage.getItem('cartItems') === null) {
  //     expect(getSavedCartItems()).toReturnWith('undefined');
  //   }
  // })
});
