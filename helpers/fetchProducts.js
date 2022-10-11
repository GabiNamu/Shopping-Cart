const fetchProducts = async (query) => {
  try {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const response = await fetch(url);
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
