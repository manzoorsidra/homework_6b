//Capture selected values of radio group and add to "items" array
var myId;
var items = [];

// Get click event of add to cart button
var cartBtnAvailable = document.getElementById('addToCartBtn');
if(cartBtnAvailable){
  cartBtnAvailable.addEventListener('click', function(){

//------------For 6B - Capturing radio button form selections-----------------------
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


//   adding selected radio value to local Storage. Need to do for loop and += to add all values 
    var item = [glazeSelectedValue, quantitySelectedValue];
    localStorage.setItem("cartItems", item);
    console.log(localStorage.getItem('cartItems'));
    // console.log(cartItems);
    // items.push(item);
    // console.log("Glaze Selected Value = " + item[0]);
    // console.log("Quantity Selected Value = " + item[1]);
//------------For 6B - Capturing radio button form selections-----------------------


// Local Storage Cart Items Counter
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

// Update cart items counter on all pages with the cart link
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
  console.log(message);
});















// update cart counter everytime a page is refreshed
window.onload = updateCartOnAllPages();

// ////Need to format everything here + use this create element on "add to cart" + window.onload
var cartItemsContainer = document.getElementsByClassName("cartItems");


    var productContainerDiv = document.createElement("div");

    productContainerDiv.className = "cartItem marginItem";
    // Product Image
    var productImg = document.createElement("img");
    productImg.className = "cartImage";
    ///////// add src based on localStorage selected src
    productImg.src = "assets/images/noglaze.jpeg";
    //////////////////////////////////////////////////////


    // Item Details Div
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
    // //////////////Change this based on items[1]
    quantityDropdownText.innerHTML = "3";
    // ///////////////////////////////////////////
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
    // /////////////////Change this based on items[0]
    glazeDropdownText.innerHTML = "Vanilla-Milk";
    ///////////////////////////////////////////
    var glazeDropdownArrow = document.createElement("img");
    glazeDropdownArrow.className = "dropdownArrow";
    glazeDropdownArrow.src = "assets/icons/arrow.svg";


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



var checkoutButton = document.getElementById('testBtn');
if(checkoutButton){
    checkoutButton.addEventListener("click", function(){
        var cartItemsDiv = document.getElementById("cartDiv");
        cartItemsDiv.appendChild(productContainerDiv);
        console.log("New product added!");
    });

}




















































