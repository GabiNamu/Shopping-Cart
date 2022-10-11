require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('verifica se é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  })

  it('verifica se fetch foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it('verifica se usa o endpoint https://api.mercadolibre.com/items/MLB1615760527', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('verifica se o retorno é igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('verifica se sem argumento retorna um erro', async () => {
    const response = await fetchItem();
    expect(response).toEqual(new Error('mensagem esperada aqui'));
  })
});
