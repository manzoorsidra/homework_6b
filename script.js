// localStorage.clear();
let glazeSelectedValue;
let quantitySelectedValue;

// Get click event of add to cart button
var cartBtnAvailable = document.getElementById('addToCartBtn');
if(cartBtnAvailable){
  cartBtnAvailable.addEventListener('click', function(){

//Capture radio button form selections in variables
    const rbs = document.querySelectorAll('input[name="glaze_flavor"]');
    const rbs2 = document.querySelectorAll('input[name="quantity"]');

    for (const rb of rbs) {
        if (rb.checked) {
            glazeSelectedValue = rb.value;
        }
    }

    for (const rb2 of rbs2) {
      if (rb2.checked) {
          quantitySelectedValue = rb2.value;
      }
  }
console.log("quantity " + quantitySelectedValue + " " + "glaze " + glazeSelectedValue);
  addItem();
  updatePage();
  });
};

//Based on which option is clicked (on the flavor detail page) change image + have visual indication of the selected option
document.body.addEventListener('change', function(e){
  let target = e.target;
  let message;
  switch (target.id) {
      case 'Vanilla Milk':
          document.getElementById("rollimage").src = "assets/images/originaldetail.png";
          message = 'Vanilla Milk';
          break;
      case 'Sugar Milk':
          document.getElementById("rollimage").src = "assets/images/walnut.png";
          message = 'Sugar Milk';
          break;
      case 'Double Chocolate':
          document.getElementById("rollimage").src = "assets/images/blackberry.png";
          message = 'Double Chocolate';
          break;
      case 'No Glaze':
          document.getElementById("rollimage").src = "assets/images/noglaze.jpeg";
          message = 'No Glaze';
          break;
  }
});


// function that removes a particular item (obj) from the shopping cart
function removeItem(obj) {
  // retrieve the stored value of the cart items so that we can modify it
  var cartItemsString = localStorage.getItem("cartItems")
  if (cartItemsString !== null) {
    var cartItems = JSON.parse(cartItemsString) // successfully loaded in the cart items
    
    // find the index of the input object in the list
    var ind = cartItems.findIndex(function (item) {
      return item.glaze === obj.glaze && item.quantity === obj.quantity
    })
    console.log("ind " + ind)
    if (ind !== -1) {
      // remove item from the list
      cartItems.splice(ind, 1)
      // update the stored value
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      // re-render the page to reflect changes
      updatePage()
    }
  }
}



// ad the currently selected product to the local storage data
function addItem() {
  // get stored value of cart items
  var cartItemsString = localStorage.getItem("cartItems")
  console.log(localStorage.getItem("cartItems"));
  // check if item exists in storage, if so, parse it
  if (cartItemsString === null) { // first time, we have to create the cartItems list
    var cartItems = []
  } else { // we've been here before, load the value
    var cartItems = JSON.parse(cartItemsString)
  }
  
  // create json object based on selected values
  var itemObject = {glaze: glazeSelectedValue, quantity: quantitySelectedValue}
  console.log(itemObject);
  // add this newly selected item to the cart
  cartItems.push(itemObject)
  // save the new value of the list
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}



// updates the value of the list element
function updatePage() {
  // get value of local storage
  var cartItemsString = localStorage.getItem("cartItems")
  // check if value exists in local storage
  if (cartItemsString !== null) {
    var cartItems = JSON.parse(cartItemsString) // converting stored string to object
    // upAdate the cart # element
    var counterNode = document.getElementById("cartCounter")
    if(counterNode){
      counterNode.innerText = cartItems.length
    }
    // for every item in our cart, create a new list item under cart-list
    var cartList = document.getElementById("cartDiv")
    console.log(cartList)
  if (cartList !== null){
    cartList.innerHTML = "";
  }
    if (cartItems.length === 0) {
      // if nothing is in the cart, let's show the placeholder text
      if(document.getElementById('testBtn')){
        document.getElementById('testBtn').style.visibility = "hidden";
      }
        // document.getElementById("placeholder-text").style.visibility = "visible";
    } else {
      // items are in the cart, hide the placeholder text
      // document.getElementById("placeholder-text").style.visibility = "hidden";
      // iterate through cart and for each item, add it to the list
      for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        // var cartItemsContainer = document.getElementsByClassName("cartItems");
                  var productContainerDiv = document.createElement("div");
                  productContainerDiv.className = "cartItem marginItem";

                  // Product Image
                  var productImg = document.createElement("img");
                  productImg.className = "cartImage";
                  // productImg.src = "assets/images/noglaze.jpeg";
                  switch (cartItem.glaze) {
                    case 'Vanilla Milk':
                        productImg.src = "assets/images/originaldetail.png";
                        break;
                    case 'Sugar Milk':
                        productImg.src = "assets/images/walnut.png";
                        break;
                    case 'Double Chocolate':
                        productImg.src = "assets/images/blackberry.png";
                        break;
                    case 'No Glaze':
                        productImg.src = "assets/images/noglaze.jpeg";
                        break;
                }

                  var itemDetailsDiv = document.createElement("div");
                  itemDetailsDiv.className = "cartItemDetails";

                  var itemTitleDiv = document.createElement("div");
                  itemTitleDiv.className = "itemTitle";
                  var title = document.createElement("p");
                  title.className = "cartItemName";
                  title.innerHTML = "Original";

                  var itemIconsDiv = document.createElement("div");
                  itemIconsDiv.className = "itemIcons";
                  var favoriteIcon = document.createElement("img");
                  favoriteIcon.src = "assets/icons/favorites.svg";
                  favoriteIcon.className = "iconlabels";
                  var deleteIcon = document.createElement("img");
                  deleteIcon.src = "assets/icons/delete.svg";
                  deleteIcon.className = "iconlabels";

                  var productPrice = document.createElement("h6");
                  productPrice.className = "itemPrice";
                  productPrice.innerHTML = "$1.99";

                  var dropdownsDiv = document.createElement("div");
                  dropdownsDiv.className = "cartItemDropdowns";
                  var quantityDropdownDiv = document.createElement("div");
                  quantityDropdownDiv.className = "dropdownSection firstDropdown";
                  var quantityTitleText = document.createElement("p");
                  quantityTitleText.className = "dropdownTitle";
                  quantityTitleText.innerHTML = "Quantity";
                  var quantityActualDropdownDiv = document.createElement("div");
                  quantityActualDropdownDiv.className = "dropdown";
                  var quantityDropdownText = document.createElement("p");
                  quantityDropdownText.className = "dropdownText";

                //This changes based on the selected quantity
                  quantityDropdownText.innerHTML = cartItem.quantity; 
                  var quantityDropdownArrow = document.createElement("img");
                  quantityDropdownArrow.className = "dropdownArrow";
                  quantityDropdownArrow.src = "assets/icons/arrow.svg";

                  var glazeDropdownDiv = document.createElement("div");
                  glazeDropdownDiv.className = "dropdownSection";
                  var glazeTitleText = document.createElement("p");
                  glazeTitleText.className = "dropdownTitle";
                  glazeTitleText.innerHTML= "Glaze";

                  var glazeActualDropdownDiv = document.createElement("div");
                  glazeActualDropdownDiv.className = "dropdown";
                  var glazeDropdownText = document.createElement("p");
                  glazeDropdownText.className = "dropdownText";

                //This changes based on the selected glaze
                  glazeDropdownText.innerHTML = cartItem.glaze;
                  var glazeDropdownArrow = document.createElement("img");
                  glazeDropdownArrow.className = "dropdownArrow";
                  glazeDropdownArrow.src = "assets/icons/arrow.svg";

                // Adding all elements inside their parents
                  glazeActualDropdownDiv.appendChild(glazeDropdownText);
                  glazeActualDropdownDiv.appendChild(glazeDropdownArrow);
                  glazeDropdownDiv.appendChild(glazeTitleText);
                  glazeDropdownDiv.appendChild(glazeActualDropdownDiv);

                  quantityActualDropdownDiv.appendChild(quantityDropdownText);
                  quantityActualDropdownDiv.appendChild(quantityDropdownArrow);
                  quantityDropdownDiv.appendChild(quantityTitleText);
                  quantityDropdownDiv.appendChild(quantityActualDropdownDiv);

                  dropdownsDiv.appendChild(quantityDropdownDiv);
                  dropdownsDiv.appendChild(glazeDropdownDiv);


                  itemTitleDiv.appendChild(title);
                  itemIconsDiv.appendChild(favoriteIcon);
                  itemIconsDiv.appendChild(deleteIcon);
                  itemTitleDiv.appendChild(itemIconsDiv);
                  itemDetailsDiv.appendChild(itemTitleDiv);


                  itemDetailsDiv.appendChild(productPrice);
                  itemDetailsDiv.appendChild(dropdownsDiv);

                  productContainerDiv.appendChild(productImg);
                  productContainerDiv.appendChild(itemDetailsDiv);

        
        // we have to get the cartItem eagerly, but return a function that executes lazily
        deleteIcon.onclick = (function (cartItem) {
          return function() {
            removeItem(cartItem)
          }
         }(cartItem))

          // Adding the product listing to the empty cartDiv
          var cartItemsDiv = document.getElementById("cartDiv");
          if(cartItemsDiv){ 
          cartItemsDiv.appendChild(productContainerDiv);
          }
        
      }
    }
  }
}

function addButton() {
  addItem()
  updatePage()
}

updatePage()


  
  


