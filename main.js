let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mode = 'Create';
let temp;


//get total
function getTotal() { 
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040';
    }
    else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//create new product

let dataProducts;
if (localStorage.product != null) {
    dataProducts = JSON.parse(localStorage.product);
}
else {
    dataProducts = [];
}


submit.onclick = function () { 
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }

    if (title.value != '' && price.value != ''  && category.value != '' &&newProduct.count<100) {
            if (mode == 'Create') {
        if (newProduct.count > 1) {
            for (let i = 0; i < newProduct.count; i++) {
                dataProducts.push(newProduct);
            }
        } else {
            dataProducts.push(newProduct);
                }
                clearInputs();
    }
    else {
        dataProducts[temp] = newProduct;
        mode = 'Create';
        count.style.display = 'block';
        submit.innerHTML = 'Create';

    }

    }


    
    localStorage.setItem('product', JSON.stringify(dataProducts));
    
    showData();
}


//clear inputs
function clearInputs() { 
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//read products

function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataProducts.length; i++) {
        table += 
        `<tr>
        <td>${i+1}</td>
        <td>${dataProducts[i].title}</td>
        <td>${dataProducts[i].price}</td>
        <td>${dataProducts[i].taxes}</td>
        <td>${dataProducts[i].ads}</td>
        <td>${dataProducts[i].discount}</td>
        <td>${dataProducts[i].total}</td>
        <td>${dataProducts[i].category}</td>
        <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
        <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');

    if(dataProducts.length > 0) {
        btnDelete.innerHTML =
            `<button onclick="deleteAll()">Delete All(${dataProducts.length})</button>`;
    }
    else {
        btnDelete.innerHTML = '';
    }
}
showData();


function deleteProduct(index) {
    dataProducts.splice(index, 1);
    localStorage.product=JSON.stringify(dataProducts);
    showData();
}

function deleteAll() {
    localStorage.clear();
    dataProducts.splice(0);
    showData();
}

function updateProduct(index) { 
    title.value = dataProducts[index].title;
    price.value = dataProducts[index].price;
    taxes.value = dataProducts[index].taxes;
    ads.value = dataProducts[index].ads;
    discount.value = dataProducts[index].discount;
    getTotal();
    count.style.display = 'none';
    category.value = dataProducts[index].category;
    submit.innerHTML = 'Update';
    mode = 'Update';
    temp = index;
    scroll({
        top: 0,
        behavior:'smooth' 
    })
}

let searchMode = 'title';

function getSearchMode(id) { 
    let search= document.getElementById('search');
    if(id=='searchTitle') {
        searchMode = 'title';
        
    }
    else {
        searchMode = 'category';
        
    }
    search.placeholder = 'Search by ' + searchMode;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataProducts.length; i++) {
        if (searchMode == 'title') {
        
            if (dataProducts[i].title.includes(value.toLowerCase())) {
                table += 
                    `<tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
            }
        }
        else {
            if (dataProducts[i].category.includes(value.toLowerCase())) {
                table +=
                    `<tr>
                <td>${i}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].total}</td>
                <td>${dataProducts[i].category}</td>
                <td><button id="update" onclick="updateProduct(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteProduct(${i})">Delete</button></td>
                </tr>`;
            }
        
        }
    }
    document.getElementById('tbody').innerHTML = table;
    
}