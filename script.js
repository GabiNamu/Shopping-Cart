// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições! 

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// const getIdFromProductItem = (product) => product.querySelector('span.id').innerText;

// getIdFromProductItem(fetchItem);

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
 const ol = document.getElementsByClassName('cart__items');
 console.log(ol);

 const total = document.createElement('h3');
 const sectionTotal = document.querySelector('.total');
 total.innerText = 0;
 total.className = 'total-price';
 sectionTotal.appendChild(total);
// console.log(sectionTotal);
let resultadoSoma = 0;

let arrayLi = [];

const cartItemClickListener = async (event) => {
  ol[0].removeChild(event.target);
  const parseStorage = JSON.parse(localStorage.getItem('cartItems'));
  const length = parseStorage.length - 1;
   parseStorage.splice(length, 1);
 arrayLi = parseStorage;
 console.log(arrayLi);
   saveCartItems(parseStorage);
  console.log(parseStorage);
  const string = event.target.innerText.split(' | ');
  const stringId = string[0].split(': ');
  console.log(stringId);
  const re = await fetchItem(stringId[1]);
  console.log(re);
  resultadoSoma -= re.price;
  total.innerText = `Subtotal R$ ${resultadoSoma}`;
};

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

// const priceTotal = async (id) => {
//   const result = await fetchItem(id);
//   console.log(result);
//   total.innerText += result.price;
//   return total;
// };

const createCartLi = () => {
  const getStorage = getSavedCartItems();
  if (getStorage !== 'undefined' && getStorage !== null) {
  for (let i = 0; i < getStorage.length; i += 1) {
    const a = getStorage[i].split('|');
    const b = a[2].split(': ');
    const c = b[1].split('$');
     const li = document.createElement('li');
     li.innerText = getStorage[i];
     li.addEventListener('click', cartItemClickListener);
     ol[0].appendChild(li); 
     resultadoSoma += Number(c[1]);
     total.innerText = `Subtotal R$ ${resultadoSoma}`;
  } 
}
  return 'undefined';
};

const findTheId = async (event) => {
  const section = event.target.parentNode;
  const id = section.firstChild.innerText;
  const re = await fetchItem(id);
  resultadoSoma += Number(re.price);
  total.innerText = `Subtotal R$ ${resultadoSoma}`;
  const li = createCartItemElement(re);
  arrayLi.push(li.innerText);
  // if (getSavedCartItems() !== 'undefined') { 
  //   arrayLi.concat(getSavedCartItems());
  //   console.log(arrayLi);
  // }
  
  saveCartItems(arrayLi);
  ol[0].appendChild(li);
  return re;
};

const emptyCart = () => {
  ol[0].innerHTML = '';
  total.innerText = 'Subtotal R$ 0.00';
};

const emptyCartButton = document.querySelector('.empty-cart');
console.log(emptyCartButton);
emptyCartButton.addEventListener('click', emptyCart);

const createElementLoading = async () => {
  const sectionLoading = document.querySelector('.loading');
  const h3 = document.createElement('h3');
  h3.innerText = 'Carregando ...';
  h3.style.display = 'block';
  sectionLoading.appendChild(h3);
  await fetchProducts('computador');
  sectionLoading.remove();

  return h3;
};

// const elementLoadingHidden = () => {
//   const newa = createElementLoading().display = 'none';
//   return newa;
// };

// elementLoadingHidden();

window.onload = async () => { 
  if (createCartLi !== 'undefined') {
    createCartLi();
  } 
  // saveCartItems(getSavedCartItems(createCartLi));
  // createElementLoading();
  createElementLoading();
  const resultado = await fetchProducts('computador');
  // elementLoadingHidden();
  const sectionn = document.querySelector('.items');
  for (let i = 0; i < resultado.results.length; i += 1) {
    const cria = createProductItemElement(resultado.results[i]);
    sectionn.appendChild(cria);
  }
  const buttons = document.getElementsByClassName('item__add');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', findTheId);
    // buttons[i].addEventListener('click', priceTotal); 
  }
};