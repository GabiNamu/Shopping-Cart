const fetchItem = async (id) => {
  try {
  const url = `https://api.mercadolibre.com/items/${id}`;
  const response = await fetch(url);
  const objJson = await response.json();
  console.log(objJson.price);
  return objJson;
  } catch (error) {
    return error;
  }
};

console.log(fetchItem('MLB2187832413'));

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
