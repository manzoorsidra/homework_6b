//Capture selected values of radio group and add to "items" array
var myId;
var items = [];

// Get click event of add to cart button
var cartBtnAvailable = document.getElementById('addToCartBtn');
if(cartBtnAvailable){
  cartBtnAvailable.addEventListener('click', function(){

//------------For 6B - Capturing radio button form selections-----------------------
//     const rbs = document.querySelectorAll('input[name="glaze_flavor"]');
//     const rbs2 = document.querySelectorAll('input[name="quantity"]');

//     let selectedValue1;
//     let selectedValue2;

//     for (const rb of rbs) {
//         if (rb.checked) {
//             selectedValue1 = rb.value;
//         }
//     }

//     for (const rb2 of rbs2) {
//       if (rb2.checked) {
//           selectedValue2 = rb2.value;
//       }
//   }
//     var item = [selectedValue1, selectedValue2];
//     items.push(item);
//     console.log(items);
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
          message = 'vanillaMilk';
          break;
      case 'sugarMilk':
          document.getElementById("rollimage").src = "assets/images/walnut.png";
          message = 'sugarMilk';
          break;
      case 'doubleChocolate':
          document.getElementById("rollimage").src = "assets/images/blackberry.png";
          message = 'doubleChocolate';
          break;
      case 'noGlaze':
          document.getElementById("rollimage").src = "assets/images/noglaze.jpeg";
          message = 'noGlaze';
          break;
  }
  console.log(message);
});

// update cart counter everytime a page is refreshed
window.onload = updateCartOnAllPages();




















































