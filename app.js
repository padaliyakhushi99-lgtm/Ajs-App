var app = angular.module("groceryApp", []);

app.controller("mainCtrl", function($scope) {

$scope.page = "login";

$scope.loginTitle = "Welcome Back!";
$scope.loginSub = "Enter Your Login Information";
$scope.loginBtn = "Sign In";

$scope.regTitle = "Create Account";
$scope.regSub = "Enter Your Details";
$scope.regBtn = "Sign Up";

$scope.emailText = "Email Address";
$scope.passText = "Password";

$scope.noAccount = "Don’t have an account?";
$scope.haveAccount = "Already have an account?";
$scope.signupText = "sign up";
$scope.signinText = "sign in";


// LOGIN
$scope.login = function(form){

if(form.$valid){
window.location.href = "dashboard.html";
}
else{
alert("Please enter valid email and password");
}

};


// REGISTER
$scope.register = function(form){

if(form.$valid){
alert("Registration Successful");
window.location.href = "dashboard.html";
}
else{
alert("Please fill all fields correctly");
}

};


// LOGOUT
$scope.logout = function(){
$scope.page = "login";
};


// GROCERY LIST
$scope.groceries = [

{name:"Rice",price:60,qty:1},
{name:"Wheat Atta",price:45,qty:1},
{name:"Toor Dal",price:110,qty:1},
{name:"Chana Dal",price:95,qty:1},
{name:"Cooking Oil",price:140,qty:1},
{name:"Sugar",price:40,qty:1},
{name:"Salt",price:20,qty:1},
{name:"Chips",price:25,qty:1}

];


$scope.sortBy = "name";

$scope.genders = ["Male","Female","Other"];


// CART
$scope.cart = [];


// LOAD CART
$scope.loadCart = function(){

var data = localStorage.getItem("cart");

if(data){
$scope.cart = JSON.parse(data);
}

};


// INCREASE QTY
$scope.increaseQty = function(item){
item.qty++;
};


// DECREASE QTY
$scope.decreaseQty = function(item){

if(item.qty > 1){
item.qty--;
}

};


// ADD TO CART
$scope.addToCart = function(item){

let found = false;

for(let i=0;i<$scope.cart.length;i++){

if($scope.cart[i].name === item.name){

$scope.cart[i].qty += item.qty;
found = true;

}

}

if(!found){

$scope.cart.push({
name:item.name,
price:item.price,
qty:item.qty
});

}

};


// REMOVE ITEM
$scope.removeItem = function(item){

var index = $scope.cart.indexOf(item);
$scope.cart.splice(index,1);

};


// TOTAL PRICE
$scope.getTotal = function(){

let total = 0;

for(let i=0;i<$scope.cart.length;i++){
total += $scope.cart[i].price * $scope.cart[i].qty;
}

return total;

};


// GO TO CART
$scope.goToCart = function(){

window.scrollTo({
top: document.body.scrollHeight,
behavior:"smooth"
});

};


// CONFIRM ORDER
$scope.confirmOrder = function(){

if($scope.cart.length === 0){

alert("Cart is empty");
return;

}

localStorage.setItem("cart", JSON.stringify($scope.cart));
localStorage.setItem("total", $scope.getTotal());

window.location.href="confirm.html";

};


// FINAL ORDER
$scope.finalOrder = function(){

localStorage.setItem("cart", JSON.stringify($scope.cart));

window.location.href="bill.html";

};


// PLACE ORDER
$scope.placeOrder = function(){

if($scope.cart.length === 0){
alert("Cart is empty");
return;
}

alert("✅ Order Successfully Placed!\nTotal Bill : ₹ " + $scope.getTotal());

$scope.cart = [];

window.location.href = "login.html";

};

});   // controller end


// CUSTOM FILTER
app.filter('capitalize', function(){

return function(input){

if(!input) return '';

return input.charAt(0).toUpperCase() + input.slice(1);

};

});