var myId;
var items = [];

// Get click event of add to cart button
var cartBtnAvailable = document.getElementById('addToCartBtn');
if(cartBtnAvailable){
  cartBtnAvailable.addEventListener('click', function(){

//Capture radio button form selections in variables
    const rbs = document.querySelectorAll('input[name="glaze_flavor"]');
    const rbs2 = document.querySelectorAll('input[name="quantity"]');

    let glazeSelectedValue;
    let quantitySelectedValue;

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


// Add selected radio button values to local Storage. Only adding first letter of glaze selection 
    var item = [`${glazeSelectedValue[0]}${quantitySelectedValue}`];
    items.push(item);
    localStorage.setItem("cartItems", items);
    console.log(localStorage.getItem('cartItems'));


// Save Cart Items Counter to Local Storage
    currentCounterValue = parseInt(localStorage.getItem('cartItemNumber'));

    if (isNaN(currentCounterValue)){
        currentCounterValue = 0;
        localStorage.setItem("cartItemNumber", JSON.stringify(currentCounterValue));
    };

    var updatedCounter = currentCounterValue + 1;
    localStorage.setItem("cartItemNumber", JSON.stringify(updatedCounter));

    document.getElementById("cartCounter").innerHTML = JSON.parse(localStorage.getItem('cartItemNumber')); 
  });
};

// Update cart items counter on all pages that have the cart link
function updateCartOnAllPages(){

    if(document.getElementById("cartCounter")){
        document.getElementById("cartCounter").innerHTML = JSON.parse(localStorage.getItem('cartItemNumber'));
    }

    var cartCountLS = JSON.parse(JSON.stringify(localStorage.getItem('cartItemNumber')));

    if(document.getElementById("cartCounter2")){
        var cartCount2 = document.getElementById("cartCounter2");
        cartCount2.innerHTML = cartCountLS;
    }
    if(document.getElementById("cartCounter3")){
        var cartCount4 = document.getElementById("cartCounter3");
        cartCount3.innerHTML = cartCountLS;
    }
    if(document.getElementById("cartCounter4")){
        var cartCount4 = document.getElementById("cartCounter4");
        cartCount4.innerHTML = cartCountLS;
    }

// Add each selection detail to each product listing in the cart page
if (localStorage.getItem('cartItems')){
        let LSCartItems = localStorage.getItem('cartItems');
        LSCartItems = LSCartItems.split(",");
        LSCartItems.forEach(item => {
            addProductToCart(item);
        });
    }
};



//Based on which option is clicked (on the flavor detail page) change image + have visual indication of the selected option
document.body.addEventListener('change', function(e){
  let target = e.target;
  let message;
  switch (target.id) {
      case 'vanillaMilk':
          document.getElementById("rollimage").src = "assets/images/originaldetail.png";
          message = 'Vanilla Milk';
          break;
      case 'sugarMilk':
          document.getElementById("rollimage").src = "assets/images/walnut.png";
          message = 'Sugar Milk';
          break;
      case 'doubleChocolate':
          document.getElementById("rollimage").src = "assets/images/blackberry.png";
          message = 'Double Chocolate';
          break;
      case 'noGlaze':
          document.getElementById("rollimage").src = "assets/images/noglaze.jpeg";
          message = 'No Glaze';
          break;
  }
});


// update cart counter + product listing on cart page everytime a page is refreshed
window.onload = updateCartOnAllPages();


// Create a product listing div, insert item type and item quantity from local storage
function addProductToCart(item){
    let itemType = item[0];
    let itemQty = item.substring(1);

    const itemTypes = {V: "Vanilla-Milk", D: "Double-Chocolate", N: "No-Glaze", S: "Sugar-Milk"};

    var cartItemsContainer = document.getElementsByClassName("cartItems");
    var productContainerDiv = document.createElement("div");
    productContainerDiv.className = "cartItem marginItem";

    // Product Image
    var productImg = document.createElement("img");
    productImg.className = "cartImage";
    productImg.src = "assets/images/noglaze.jpeg";

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
    quantityDropdownText.innerHTML = itemQty;
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
    glazeDropdownText.innerHTML = itemTypes[itemType];
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


// Adding the product listing to the empty cartDiv
    var cartItemsDiv = document.getElementById("cartDiv");
    cartItemsDiv.appendChild(productContainerDiv);
    console.log("New product added!");

// delete a listing if the delete icon is clicked
    deleteIcon.addEventListener('click', function(){
        console.log('product was removed');
        productContainerDiv.remove();
        theSelection = item;
        console.log(theSelection + " this is the selection");
    });

}
























































