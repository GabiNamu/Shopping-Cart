const saveCartItems = (param) => {
  if (param !== undefined || param !== null || param !== '') {
  const storage = localStorage.setItem('cartItems', JSON.stringify(param));
  return storage;
  }
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
