//crear un formulario para filtrar los dados
//_1 - fetch la API
//_2 - tranformar los dados en JSON
//_3 printar los produtos filtrados en la pagina
//cada bebida en un li
//mapear la API para solo tener los dados necesarios
//_4
//_5 anadir un evento en los botones
//_6 funcao handleClick: armazer nos produtos en un array en la cesta
//_Crear el array y hacer push de cada produto
//_7 funcao handleDelete: eliminar los productos de la cesta
//_8 crear un boton para finalizar la compra
//_9 funcao handleCompra: elimina los itens de la cesta
//_10
const section = document.querySelector(".list");
const cesta = document.querySelector(".cesta");
const ul = document.querySelector("ul");
const confirmacionCompra = document.querySelector(".confirmacionCompra");
const basket = document.querySelector(".basket-total")





const serachInput = document.querySelector(".drinkSearch");
const searchBtn = document.querySelector(".drinkSearchBtn");

const removeBtn = document.querySelectorAll(".removeBtn");
const btnComprar = document.querySelector(".comprar");


const handleSearch = (event) => {
  event.preventDefault();
  drink = serachInput.value;
  getDataApi(drink);
};
searchBtn.addEventListener("click", handleSearch);

let drink = "coffe";
let allDrinks = [];
let cestaArray = [];

const getDataApi = async (nameDrink) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nameDrink}`;
  const resp = await fetch(url);
  const respJson = await resp.json();
  console.log(respJson);
  //hago copai de mi variable global
  allDrinks = [...respJson.drinks];
  console.log(allDrinks);
  allDrinks = mapArray(allDrinks);
  renderDrink(allDrinks);
};

const mapArray = (array) => {
  return array.map((element) => {
    return {
      id: element.idDrink,
      name: element.strDrink,
      photo: element.strDrinkThumb,
      alcoholic: element.strAlcoholic,
    };
  });
};

const handleAddCesta = (event) => {
  const id = event.target.parentNode.id;
  const findDrink = allDrinks.find(drink => drink.id === id)
  const findIndex = cestaArray.findIndex(drink => drink.id === id)
  const reduceCesta = cestaArray.reduce((suma,drink) => suma += drink.quantity, 1)
 

  if(findIndex === -1){
    cestaArray.push(findDrink),
    findDrink.quantity = 1
    basket.innerHTML = reduceCesta
  } else {
    findDrink.quantity +=1
    basket.innerHTML = reduceCesta
  }
  
  renderCesta(cestaArray);
   
};

const handleRemoveCesta = (event) => {
  const id = event.target.parentNode.id;

 const findDrink = cestaArray.findIndex(drink => drink.id === id) 
  if(findDrink !== -1){
    if(cestaArray[findDrink].quantity === 1 ){
      cestaArray.splice(findDrink, 1)
      const reduceCesta = cestaArray.reduce((suma,drink) => suma += drink.quantity, 0) 
      basket.innerHTML = reduceCesta
    } else{ 
    cestaArray[findDrink].quantity -=1
    const reduceCesta = cestaArray.reduce((suma,drink) => suma += drink.quantity, 0)
    basket.innerHTML = reduceCesta

  }       renderCesta(cestaArray);
  } 

 
};

const renderCesta = () => {
  cesta.innerHTML = `<h2>Cesta de compras</h2>`;
  
  for (const item of cestaArray) {
    cesta.innerHTML += `
     <ul>
      <li> (${item.quantity}) -  ${item.name} </li>
    </ul>
    `;
  }
};

const handleCompra = ()=>{
  cesta.innerHTML = ""
  const total = cestaArray.reduce((suma, item) => suma+=item.quantity, 0)
  confirmacionCompra.innerHTML =  `
  <h2>Su compra ha sido realizada con éxito</h2>
  <h4>Itens comprados: </h4>
  `;

 for (const iten of cestaArray) {
  confirmacionCompra.innerHTML += `<li>${iten.name}: units: ${iten.quantity}</li>`
   
}
confirmacionCompra.innerHTML += `Total = ${total} drinks`

cesta = []


}

btnComprar.addEventListener("click", handleCompra)

const renderDrink = (allDrinks) => {
  section.innerHTML = "";

  for (const drink of allDrinks) {
    section.innerHTML += `
        <article id="${drink.id}" class="article">
        <img src="${drink.photo}" alt="">
        <h3>${drink.name}</h3>
        <p>${drink.alcoholic}</p>
        <button class="addBtn">+</button>
        <button class="removeBtn">-</button>
    </article>`;
  }
  const addBtn = document.querySelectorAll(".addBtn");
  for (const btn of addBtn) {
    btn.addEventListener("click", handleAddCesta);
  }

  const removeBtn = document.querySelectorAll(".removeBtn");
  for (const btn of removeBtn) {
    btn.addEventListener("click", handleRemoveCesta);
  }
};

const main = async () => {
  await getDataApi(drink);
};

main();
