const urlMaker = (product) => `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;

const fetchProducts = async (product) => {
  try {
  const response = await fetch(urlMaker(product));
  const objJson = await response.json();
  return objJson;
  } catch (error) {
    return error;
  }
};

console.log(fetchProducts('computador'));
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
