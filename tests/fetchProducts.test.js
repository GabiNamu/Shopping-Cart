require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('testa se é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })

  it('verifica se fetch foi chamada', () => {
   fetchProducts('computador');
   expect(fetch).toHaveBeenCalledTimes(1);
  })
  
  it('verifica se foi usado o endpoint certo', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  })

  it('verifica se o retorno é igual ao objeto computadorSearch', async () => {
    const response = await fetchProducts('computador');
    expect(response).toEqual(computadorSearch);
  })

  it('verifica se sem argumento retorna um erro', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
});
