(function() { //IIFE

    function getCartArray() {
        var cartArray = localStorage['cartArray'];
        if (!cartArray) {
            cartArray = [];
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
        } else {
            cartArray = JSON.parse(cartArray);
        }
        return cartArray;
    }

    var cartArray = getCartArray();

    // Loop through items in local storage

    for (var i = 0; i < cartArray.length; i++) {
        var key = cartArray[i];
        var value = localStorage[key];
        addCartItems(value)
    }

    // Get item array

    function getItemArray() {
        if (!itemArray) {
            itemArray = []
        }
        return itemArray;
    }

    var itemArray = getItemArray();

    // Add cart items to DOM

    function addCartItems(value) {

        value = JSON.parse(value);
        // console.log(value)
        var item;
        for (item in value) {
            var desc = value[0].desc
            var price = value[1].price
            var quantity = value[2].qty
        }

        var cart = document.querySelector('.cart');
        var row = document.createElement('tr');
        var dataDesc = document.createElement('td');
        dataDesc.innerHTML = desc;
        var dataPrice = document.createElement('td');
        dataPrice.innerHTML = '$ ' + price;
        var dataQuantity = document.createElement('td');
        dataQuantity.innerHTML = quantity;
        var deleteData = document.createElement('td');
        var deleteButton = document.createElement('button')
        deleteButton.setAttribute('class', key);
        deleteData.appendChild(deleteButton).innerHTML = 'delete';
        var subTotal = document.createElement('td');
        subTotal.classList.add('subtotal');
        subTotal.innerHTML = '$ ' + (price * quantity).toFixed(2);
        row.appendChild(dataDesc);
        row.appendChild(dataPrice);
        row.appendChild(dataQuantity);
        row.appendChild(subTotal);
        row.appendChild(deleteData);
        cart.appendChild(row);
    }

    // Display total amount of items in the cart

    var itemTotal = cartArray.length;
    var total = document.querySelector('.item-total');
    total.innerHTML = itemTotal;

    // Add item to Cart

    var button = document.querySelectorAll('.add');
    for (var i = 0; i < button.length; i++) {

        button[i].addEventListener('click', function() {
            var cartArray = getCartArray();
            var currentDate = new Date();
            var key = 'item_' + currentDate.getTime();
            var itemArray = getItemArray();
            var description = this.parentElement.querySelector('.description').innerHTML;
            var price = this.parentElement.querySelector('.price').innerHTML;
            var quantity = this.parentElement.querySelector('.qty').value;
            itemArray.push({ 'desc': description });
            itemArray.push({ 'price': price });
            itemArray.push({ 'qty': quantity });
            itemArray = JSON.stringify(itemArray)
            localStorage.setItem(key, itemArray);
            cartArray.push(key);
            localStorage.setItem('cartArray', JSON.stringify(cartArray));
            // Update amount of items in cart
            itemTotal++;
            total.innerHTML = itemTotal;
            location.reload(); // Reload page

        });
    }

    var deleteButton = document.querySelector('table').querySelectorAll('button');

    for (var i = 0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', deleteItem)
    }

    // Delete items

    function deleteItem(e) {
        var key = e.target.className;
        var cartArray = getCartArray();
        if (cartArray) {
            for (var i = 0; i < cartArray.length; i++) {
                if (key == cartArray[i]) {
                    cartArray.splice(i, 1)
                }
            }
        }
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        location.reload();
    }

    // Cart total

    var subTotal = document.querySelectorAll('.subtotal');
    var sum = 0;
    for (var i = 0; i < subTotal.length; i++) {
        sum += parseInt(subTotal[i].innerHTML.slice(2));
    }
    sum = sum.toFixed(2);

    // Cart status

    if (cartArray.length > 0) {
        var cartContent = document.querySelector('.cart-contents').innerHTML = '<strong>Total:</strong> $' + sum;
    }

})();