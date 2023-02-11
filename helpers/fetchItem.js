const createUrl = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  try {
  const response = await fetch(createUrl(id));
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
