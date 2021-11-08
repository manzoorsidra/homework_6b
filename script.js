let glazeSelectedValue;
let quantitySelectedValue;

// Get click event of add to cart button
var cartBtnAvailable = document.getElementById('addToCartBtn');
if(cartBtnAvailable){
  cartBtnAvailable.addEventListener('click', function(){

//Capture radio button form selections into variables (if radio button is checked add value of that button to a variable)
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

// Add that item and update the page once add to cart button is clicked
  addItem();
  updatePage();
  });
};


// Used to remove an product from the cart page
function removeItem(obj) {
  var cartItemsString = localStorage.getItem("cartItems")
  if (cartItemsString !== null) {
    var cartItems = JSON.parse(cartItemsString)
    
    var ind = cartItems.findIndex(function (item) {
      return item.glaze === obj.glaze && item.quantity === obj.quantity
    })
    if (ind !== -1) {
      cartItems.splice(ind, 1)
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      updatePage()
    }
  }
}


// Add the product with it's specific selections to local storage
function addItem() {
  var cartItemsString = localStorage.getItem("cartItems")
  if (cartItemsString === null) { 
    var cartItems = []
  } else { 
    var cartItems = JSON.parse(cartItemsString)
  }
  
// Create a json object that has glaze and quantity keys with values from the radio button selections
  var itemObject = {glaze: glazeSelectedValue, quantity: quantitySelectedValue}
  cartItems.push(itemObject)
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}


// Update the page to reflect the products added to local storage
function updatePage() {
  var cartItemsString = localStorage.getItem("cartItems")
  if (cartItemsString !== null) {
    var cartItems = JSON.parse(cartItemsString)
    var counterNode = document.getElementById("cartCounter")
    if(counterNode){
      counterNode.innerText = cartItems.length
    }
    var cartList = document.getElementById("cartDiv")
    if (cartList !== null){
        cartList.innerHTML = "";
    }
    if (cartItems.length === 0) {
    // If there are no items in the cart, hide the checkout button
      if(document.getElementById('testBtn')){
        document.getElementById('testBtn').style.visibility = "hidden";
      }
    } else {
      // Otherwise, go over all the items and add them to the cart page
      for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];
        var productContainerDiv = document.createElement("div");
        productContainerDiv.className = "cartItem marginItem";

        // Product Image changes based on glaze selection
        var productImg = document.createElement("img");
        productImg.className = "cartImage";
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

    //Quantity value changes based on the radio button selection for quantity
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

    //Glaze type changes based on the radio button selection for glaze
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

        
        // Run the removeItem function (that deletes the product listing) once the delete icon is clicked
        deleteIcon.onclick = (function (cartItem) {
          return function() {
            removeItem(cartItem)
          }
         }(cartItem))

        // Add the product listing to the empty cartDiv
          var cartItemsDiv = document.getElementById("cartDiv");
          if(cartItemsDiv){ 
          cartItemsDiv.appendChild(productContainerDiv);
          }
        
      }
    }
  }
}

// Add an item to local storage and update the page once the "add to cart button" is clicked
function addButton() {
  addItem()
  updatePage()
}

// Update the page after everytime the script file is run
updatePage()


  
  


