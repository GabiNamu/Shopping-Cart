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
const createProductItemElement = ({ id, title, thumbnail, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
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

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

// a ol que vai agrupar todas as lis que vão compor o carrinho de compras
 const ol = document.getElementsByClassName('cart__items');
// criacao do total e pegando a section que ele vai ser adicionado no html
 const total = document.createElement('h3');
 const sectionTotal = document.querySelector('.total');
 total.innerText = 0;
 total.className = 'total-price';
 sectionTotal.appendChild(total);

 // foi usado para fazer a soma dos preços e depois foi adicionado no total
let resultadoSoma = 0;
// foi usado para adicionar as lis para poder colocar no localStorage 
const arrayLi = [];

// tentar sedimentar essa funcao em tres menores 
// remove o item do carrinho ao ser clicado, diminui o valor do total e acrescenta o getlocalstorage dentro da variavel arrayli
const cartItemClickListener = async (event) => {
  ol[0].removeChild(event.target.parentNode);
  const parseStorage = JSON.parse(localStorage.getItem('cartItems'));
  const length = parseStorage.length - 1;
   parseStorage.splice(length, 1);
 arrayLi.push(parseStorage);
 console.log(arrayLi);
   saveCartItems(parseStorage);
  console.log(parseStorage);
  const string = event.target.parentNode.innerText.split(' | ');
  const stringId = string[0].split(': ');
  console.log(stringId);
  const re = await fetchItem(stringId[1]);
  console.log(re);
  resultadoSoma -= re.price;
  total.innerText = `Subtotal R$ ${resultadoSoma}`;
};

// a funcao que realmente cria as li
const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item allLi';
  li.innerText = `ID: ${id} | TITLE: ${title}
  R$${price}`;
  // li.addEventListener('click', cartItemClickListener);
  return li;
};

// cria os elementos do cart como a image de thumbnail, renderiza a li, chama a funcao fetchItem,  cria uma section e coloca um append listener
const createCartSection = async (li, id) => {
  const re = await fetchItem(id);
  const image = createProductImageElement(re.thumbnail);
  image.style.marginTop = '10px';
  image.style.borderRadius = '50px';
     const sectionn = document.createElement('section');
     sectionn.appendChild(image);
     sectionn.appendChild(li);
     sectionn.style.display = 'flex';
     sectionn.addEventListener('click', cartItemClickListener);
     return sectionn;
};

// pega os valores do local storage e acrescenta eles na li e na secao, e adiciona ao total, chama uma funcao, cria a li
const createCartLi = async () => {
  const getStorage = getSavedCartItems();
  if (getStorage !== 'undefined' && getStorage !== null) {
  for (let i = 0; i < getStorage.length; i += 1) {
    const a = getStorage[i].split('|');
    const c = a[1].split('$');
    const id = a[0].split(': ');
    const iD = id[1].split(' ');
     const li = document.createElement('li');
     li.innerText = getStorage[i];
     li.className = 'allLi';
     const sectionn = await createCartSection(li, iD[0]);
     ol[0].appendChild(sectionn); 
     resultadoSoma += Number(c[1]);
     total.innerText = `Subtotal R$ ${resultadoSoma}`;
  } 
}
  return 'undefined';
};

// 4 funcoes - achar o id, cria a li renderiza ela e acrescenta o preco ao total, coloca no localStorage, cria image e price e chama a funcao createcartsection
const findTheId = async (event) => {
  const section = event.target.parentNode;
  const id = section.firstChild.innerText;
  const re = await fetchItem(id);
  const image = createProductImageElement(re.thumbnail);
  const pricee = re.price;
  resultadoSoma += Number(re.price);
  total.innerText = `Subtotal R$ ${resultadoSoma}`;
  const li = createCartItemElement(re);
  arrayLi.push(li.innerText);
  saveCartItems(arrayLi);
  const sectionn = await createCartSection(li, id);
  // sectionn.appendChild(pricee);
  ol[0].appendChild(sectionn);
  return re;
};

// 1 funcao - limpa o carrinho e atualiza o total 
const emptyCart = () => {
  ol[0].innerHTML = '';
  total.innerText = 'Subtotal R$ 0.00';
  resultadoSoma = 0;
  saveCartItems('');
};

// pega o botao de esvaziar carrinho e adiciona um eventListener
const emptyCartButton = document.querySelector('.empty-cart');
emptyCartButton.addEventListener('click', emptyCart);

// 2 funcoes - cria e coloca na tela o elemento com o texto carregando..., troca o cursor 
const createElementLoading = async () => {
  const sectionLoading = document.querySelector('.loading');
  const body = document.getElementsByTagName('body');
  body[0].style.cursor = 'wait';
  const h3 = document.createElement('h3');
  h3.innerText = 'Carregando ...';
  h3.style.display = 'block';
  sectionLoading.appendChild(h3);
  await fetchProducts('computador');
  sectionLoading.remove();
  body[0].style.cursor = 'pointer';

  return h3;
};

window.onload = async () => { 
  if (createCartLi !== 'undefined') {
    createCartLi();
  } 
  createElementLoading();
  const resultado = await fetchProducts('computador');
  const sectionn = document.querySelector('.items');
  for (let i = 0; i < resultado.results.length; i += 1) {
    const cria = createProductItemElement(resultado.results[i]);
    sectionn.appendChild(cria);
  }
  const buttons = document.getElementsByClassName('item__add');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', findTheId);
  }
};