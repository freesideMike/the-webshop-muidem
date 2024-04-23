import { findItem } from "../services/itemService";
import "./../scss/style.scss";
import { IFindItems } from "./models/IFindItems";

//Counter for updating badge count 
function updateBadgeCount() {
  let sum = 0;
  for (let item of itemInCart) {
    sum += item.quantity;
  }
  badgeDom.innerHTML = "" + sum;

  // Check if the badge count is zero
  if (sum === 0) {
    totalPrice.innerHTML = "Total price is: 0$";
    cartProductDomm.style.display = "none";
  }
}




const totalPrice = document.getElementById("totalPrice") as HTMLParagraphElement;
const shoppingCart = document.getElementById("shoppingCart")!;
let badgeCount = 0;
const viewBtn = document.getElementById("viewBtn") as HTMLButtonElement;
const badgeDom = document.querySelector(".badge") as HTMLSpanElement;
const productitem = document.getElementById("item-container") as HTMLDivElement;
const cartProductDom = document.querySelector(".cartProducts div") as HTMLDivElement;
const cartProductDomm = document.querySelector(".cartProducts") as HTMLDivElement;
const checkoutPageContainer = document.getElementById("checkoutPageContainer") as HTMLDivElement;
const landing = document.getElementById("landing") as HTMLDivElement;
const productContainer = document.getElementById("productContainer") as HTMLDivElement;


//the itemInCart-array get filled with objects when items are added in cart
let itemInCart: {
  quantity: number;
  id: number;
  title: string;
  price: number;
}[] = [];

//tells you the title of the item you pressed on (clickedItemTitle)
const handleCart= (clickedItemTitle: string) => {
//selectedProduct = True : goes through all the items(find) in the DATA and checks if the item we clicked on is already excisting in the DATA 
const selectedProduct = data.find((product: IFindItems) => product.title === clickedItemTitle); 
    
    if (selectedProduct) {
    badgeCount += 1;

//checks if there is already item in cart
    const productId = selectedProduct.id;
    const existingItem = itemInCart.find((item) => item.id === productId); //this creates a new argument saying if item.id is equal to productId, it will return true, means there is already an existing item

    if (existingItem) {
      existingItem.quantity += 1; //we saying here. Ok since it is true(that the item u pressed on and the item added to cart already is there so there id will be there) then the pressed item with the same id plus its quantity by 1
    } else {
      let product = {
        id: productId,
        title: selectedProduct.title,
        price: selectedProduct.price,
        quantity: 1,
      };
      itemInCart.push(product);
      //console.log(itemInCart);
    }

    badgeDom.innerHTML = "" + badgeCount;
    badgeDom.style.display = "block";

    cartProductDom.innerHTML = ""; //updates the cart everytime
    createHtmlForCart();
  }

};



// Creating html for the cart
function createHtmlForCart() {
  cartProductDom.innerHTML = "";

  for (let i: number = 0; i < itemInCart.length; i++) {
    const item = itemInCart[i];

    const productDetail = document.createElement("div");
    productDetail.innerHTML = `<p id="${item.id}">${
      item.title} - ${item.price.toFixed(2)} USD (Quantity: ${item.quantity})</p>`;
    cartProductDom.appendChild(productDetail);

    const minusIcon = document.createElement("i");
    minusIcon.className = "fa-solid fa-minus minus";
    productDetail.className = "productDetail";
    productDetail.appendChild(minusIcon);
     ///------------ remove -------------------///
     minusIcon.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity = item.quantity - 1;
        badgeCount -= 1;
        console.log(badgeCount)
      } else {
        itemInCart.splice(i, 1);
        badgeCount -= 1;  // decrement badgeCount when an item is removed
      }
      createHtmlForCart()
      createCheckoutHtml();
      updateBadgeCount();
    });

    const plusIcon = document.createElement("i");
    plusIcon.className = "fa-solid fa-plus plus";
    productDetail.appendChild(plusIcon);

    ///------------ add-------------
    plusIcon.addEventListener("click", () => {
      item.quantity = item.quantity + 1;
      badgeCount +=1
      createHtmlForCart()
      createCheckoutHtml();
      updateBadgeCount();
    });

    //Calculating sum
    let sum:number = 0
    itemInCart.forEach(function(obj) {
      sum += obj.price * obj.quantity;

   });

   let sumString:string = "Total price is: "+sum.toFixed(2) + "$";
   totalPrice.innerHTML =""
   totalPrice.innerHTML = sumString
   
  }
 //Button in cart
  viewBtn.addEventListener("click", () => {
    createCheckoutHtml();
    location.href = "#checkout";
    openCartMenu();
    checkoutPageContainer.classList.remove("hidden");
    landing.classList.add("hidden");
    productPage.classList.add("hidden");
    productContainer.classList.add("hidden");
    cartProductDomm.style.display = "none";
  });
}

//Toggle function for opening and closing cart
function openCartMenu() {
  if (cartProductDom.innerHTML !== "") {
    cartProductDomm.style.display = cartProductDomm.style.display === "none" ? "block" : "none";
  }
 }

shoppingCart.addEventListener("click", openCartMenu);



//--------- all pages ---------
const productPage = document.getElementById("product") as HTMLDivElement;
const checkoutPage = document.getElementById("checkout") as HTMLDivElement;

//-- checkout section, function for creating html. Overview of products and total price in
const checkoutContainer = document.createElement("section");
checkoutContainer.id = "checkoutContainer"
const checkoutListContainer = document.createElement("section");
const checkoutListUl = document.createElement("ul");
checkoutListUl.className = "checkoutListUl"
 
const createCheckoutHtml = () => {
  
  checkoutListUl.innerHTML = "";
  for (let i = 0; i < itemInCart.length; i++) {


    const checkoutLi = document.createElement("li");
    const checkoutTitle = document.createElement("h4");
    const checkoutQuantity = document.createElement("span");
    const checkoutPrice = document.createElement("span");

    checkoutTitle.innerHTML = itemInCart[i].title;
    checkoutQuantity.innerHTML = "Quantity:" + " " + itemInCart[i].quantity;
    checkoutPrice.innerHTML = "Price:" + " " + itemInCart[i].price;
    
    checkoutPage.appendChild(checkoutContainer);
    checkoutContainer.appendChild(checkoutListContainer);
    checkoutListContainer.appendChild(checkoutListUl);
    checkoutListUl.appendChild(checkoutLi);
    checkoutLi.appendChild(checkoutTitle);
    checkoutLi.appendChild(checkoutQuantity);
    checkoutLi.appendChild(checkoutPrice);


    const minusIcon = document.createElement("i");
    minusIcon.className = "fa-solid fa-minus minus";
    checkoutLi.appendChild(minusIcon);

    const plusIcon = document.createElement("i");
    plusIcon.className = "fa-solid fa-plus plus";
    checkoutLi.appendChild(plusIcon);


    plusIcon.addEventListener("click", () => {
      itemInCart[i].quantity = itemInCart[i].quantity + 1;
      badgeCount += 1;
      createHtmlForCart()
      createCheckoutHtml();
      updateBadgeCount();
    });

    minusIcon.addEventListener("click", () => {
      if (itemInCart[i].quantity > 1) {
        itemInCart[i].quantity = itemInCart[i].quantity - 1;
        badgeCount -= 1;
        console.log(badgeCount)
        
      } else {
        itemInCart.splice(i, 1);
        badgeCount -= 1;  // decrement badgeCount when an item is removed
      }
      createHtmlForCart()
      createCheckoutHtml();
      updateBadgeCount();
    });

   }
   let sum = 0;
   itemInCart.forEach(function (obj) {
     sum += obj.price * obj.quantity;
   });
   let sumString = "Total price is: " + sum.toFixed(2)+ "$";
   const totalPriceLi = document.createElement("li");
   totalPriceLi.id = "totalPrice"; 
   totalPriceLi.innerHTML = sumString;
   checkoutListUl.id = "totalPriceLi"
   checkoutListUl.appendChild(totalPriceLi);
}


// the function that creates the html for the product-page after you have clicked the show-info-button
const createInfoHtml = (product: IFindItems) => {
  const productPop = document.getElementById("productPop") as HTMLDivElement;
  if (productPop) {
    productPop.innerHTML = "";
    const productItem = document.createElement("div");
    const productTitle = document.createElement("h3");
    const productDescription = document.createElement("p");
    const productImage = document.createElement("img");
    const productPrice = document.createElement("span");
    const productAddToCartBtn = document.createElement("button");
    const productBack = document.createElement("button");
    const producdtButtonContainer = document.createElement("div");
    
    productTitle.innerHTML = product.title;
    productDescription.innerHTML = product.description;
    productImage.src = product.image;
    productPrice.innerHTML = `Cost: ${product.price.toFixed(2)} USD`;
    productAddToCartBtn.innerHTML = "Add to Cart";
    productBack.innerHTML = "Back";
    
    
    productPop.appendChild(productImage);
    productPop.appendChild(productItem);
    productItem.appendChild(productTitle);
    productItem.appendChild(productDescription);
    productItem.appendChild(productPrice);
    productItem.appendChild(producdtButtonContainer);
    producdtButtonContainer.appendChild(productAddToCartBtn);
    producdtButtonContainer.appendChild(productBack);
    
    productItem.className = "productItem";
    productTitle.className = "productTitle";
    productImage.className = "productImage";
    productPrice.className = "productPrice";
    producdtButtonContainer.className = "producdtButtonContainer";
    productAddToCartBtn.className = "addToCartBtn primaryButton";
    productBack.className = "productBack secondaryButton";
    
    productAddToCartBtn.addEventListener("click", () => handleCart(product.title));
    
    //Tillbaka knapp på produktsidan, tar en tillbaka till startsida.
    productBack.addEventListener("click", () => {
      landing.classList.remove("hidden")
      productContainer.classList.add("hidden");
      productPage.classList.add("hidden");
      location.href = "#top";
      cartProductDomm.style.display = "none";
    });
  
  } 
}
  
//Creating html for each produc
function createHtmlforCards(data: IFindItems[]) {

  for (let i = 0; i < data.length; i++) {
    const item = document.createElement("div");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const price = document.createElement("span");
    const buttonContainer = document.createElement("div");
    const addToCartBtn = document.createElement("button");
    const showInfo = document.createElement("button");
    
      const product = data[i];

      title.innerHTML = product.title;
      image.src = product.image;
      addToCartBtn.innerHTML = "Add to Cart";
      showInfo.innerHTML = "Show more";
      
      price.innerHTML = `${product.price.toFixed(2)} USD`;
      
      productitem.appendChild(item);
      item.appendChild(image);
      item.appendChild(title);
      item.appendChild(price);
      item.appendChild(buttonContainer);
      buttonContainer.appendChild(showInfo);
      buttonContainer.appendChild(addToCartBtn);
      
      item.className = "item";
      title.className = "title";
      image.className = "image";
      price.className = "price";
      addToCartBtn.className = "addToCartBtn primaryButton";
      showInfo.className = "showInfo secondaryButton";

      showInfo.addEventListener("click", () => {
        createInfoHtml(data[i]);
        productContainer.classList.remove("hidden");
        landing.classList.add("hidden");
        productPage.classList.remove("hidden");
        cartProductDomm.style.display = "none";   
      });
      
      addToCartBtn.addEventListener("click", () => handleCart(product.title));
    }
}

//Import from database products.json
const data = await findItem();
createHtmlforCards(data);

let purchasePopUp = document.getElementById("purchasePopUp")
let overlayPopUp = document.getElementById("overlayPopUp");
const purchase = document.getElementById("purchase") as HTMLFormElement;

//for when submitting form when completing purchase
purchase?.addEventListener("submit", (event) => {
  event?.preventDefault();
  purchasePopUp?.classList.remove("hidden");
  overlayPopUp?.classList.remove("hidden");
});

const ok = document.getElementById("purchasePopUpButton");
//When pressing ok in modal refreshing page. 
ok?.addEventListener("click", () => {
  window.location.href = 'index.html'
});

//For logo, always takes you back to startpage without clearing the cart. 
const redirect = document.querySelector(".redirect");

redirect?.addEventListener("click", () => {
location.href = "#top";
landing.classList.remove("hidden");
productContainer.classList.add("hidden");
productPage.classList.add("hidden");
checkoutPageContainer.classList.add("hidden");
cartProductDomm.style.display = "none";
});



    
  
  

