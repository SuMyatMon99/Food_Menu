var foodList=[];
$(document).ready(function(){
    $("#add").click(function(){
        var n=$("#name").val();
        var p=$("#price").val();
        var img = $("#image option:selected").val();
        var cat = $("#category option:selected").text();
        var t=$("#tarea").val();
        var f={name: n,
                price: p,
                image: img,
                category: cat,
                description: t
            } ; 
           
        setLocalStorage(f);

        window.location="foodList.html";      
    });

});
function setLocalStorage(data){
    if(localStorage.getItem('storefood')!=undefined){
        
        var d=JSON.parse(localStorage.getItem('storefood'));
        foodList=d;
    }
    var name=data.name;
    var price=data.price;
    var image=data.image;
    var category=data.category;
    var description=data.description;

    var food={name: name,
             price: price,
             image: image, 
             category: category, 
             description: description};
    foodList.push(food);
    localStorage.setItem('storefood', JSON.stringify(foodList));
}

var foodAdd=[];
function getLocalStorage(){
    var g=JSON.parse(localStorage.getItem('storefood'));
    foodAdd=g;
    foodAdd.forEach(function(value,key){
            $("#foodTable tbody").append('<tr><td>'+'<img src="'+value.image+'" width="100px" height="100px">'+'</td><td style="padding-top: 50px;">'
            +value.name+'</td><td style="padding-top: 50px;">'
            +value.price+'Ks'+'</td><td style="padding-top: 50px;">'
            +value.category+'</td><td style="padding-top: 50px;">'+value.description+'</td><td style="padding-top: 50px;">'
            +'<i class="fa fa-edit" style="font-size:18px;color:blue;" onclick="editFood('+key+', this)">&nbsp;&nbsp;</i><i class="fa fa-trash-o" style="font-size:18px;color:red" onclick="deleteFood('+key+', this)">'+'</td></tr>');
	});
}
var deleteArr=[];

function deleteFood(x){
    var dd=JSON.parse(localStorage.getItem('storefood'));
        for(var i=0; i<dd.length; i++){
            if(dd[x]!=dd[i]){
                deleteArr.push(dd[i]);
            }
        }
        localStorage.removeItem('storefood');
        localStorage.setItem('storefood', JSON.stringify(deleteArr));
        alert("deleted successfully!");
        window.location="foodList.html";
}

var editArr=[];
function editFood(y){
    
    var xx=JSON.parse(localStorage.getItem('storefood'));
    
    editArr=xx;

    if(editArr.length>0){
        editData(y);
    }

    function editData(z){
       
        window.location="addFood.html?id="+z+"&name="+editArr[z].name+"&price="+editArr[z].price+"&image="+editArr[z].image+"&category="+editArr[z].category+"&description="+editArr[z].description;
    }
}
var updateArr=[];

$(document).ready(function(){
    $("#update").click(function(){
        var name=$("#name").val();
        var price=$("#price").val();
        var image=$("#image").val();
        var category=$("#category").val();
        var description=$("#tarea").val();
        var frm=$("#frm").val();

        var x=JSON.parse(localStorage.getItem('storefood'));
        updateArr=x;

        for(var i=0; i<updateArr.length; i++){
            if(frm==i){
                updateArr[i].name=name;
                updateArr[i].price=price;
                updateArr[i].image=image;
                updateArr[i].category=category;
                updateArr[i].description=description;
                localStorage.setItem('storefood', JSON.stringify(updateArr));
                alert("updated");
                window.location="foodList.html";
            }
        }
        
    });
});

var juiceArr=[];
function addJuice(){
    var x=JSON.parse(localStorage.getItem('storefood'));
    juiceArr=x;

    if(juiceArr.length>0){
        addjuiceItem();
    }
}

function addjuiceItem(){
    juiceArr.forEach(function(value, key){
        //alert(value.category);
        if(value.category=="Juice"){
            $("#orderedContainer").append(
                '<div class="card mb-3" style="max-width: 600px;">'
                +'<div class="row no-gutters">'
                +'<div class="col-md-4">'
                +'<img src="'+value.image+'"width="185px" height="185px">'
                +'</div>'
                +'<div class="col-md-8">'
                +'<div class="card-body" style="color: rgba(246, 75, 8, 0.876);">'
                +'<span class="float-right font-weight-bold float-top text-rgba(246, 75, 8, 0.876)">'
                +'$'+value.price+'</span>'
                +'<h5 class="card-title font-weight-bold">'+value.category+'</h5>'+'<br>'
                +'<p class="card-text">'+value.description+'</p>'
                +value.name
                +'<button onclick="orderJuice('+key+', this)" class="btn btn-danger float-right float-bottom mb-4">+ORDER</button>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
            );
        }
    });
}
var qty=1;
var p=0;
    
function orderJuice(juice){
    p+=parseInt(juiceArr[juice].price);
    $("#orderTable tbody").append(
        '<tr><td>'+juiceArr[juice].name
        +'</td><td>'+juiceArr[juice].category
        +'</td><td>'+juiceArr[juice].description
        +'</td><td>'+qty+
        '</td><td>'+juiceArr[juice].price+'Ks'
        +'</td><td style="text-align: center;">'+'<i class="fa fa-trash-o" style="font-size:18px; color:red" onclick="deleteJuice('+juice+', this)"></i>'+'</td></tr>');
        //totalQty+=total;
        //alert(totalQty);
        $("#total").text("Total Amount:"+p+"Ks");
}

function deleteJuice(juice, i){
    var t=parseInt(p);
    t-=parseInt(juiceArr[juice].price);
           
    $(i).parent().parent().remove();
    $("#total").text("Total Amount:"+t+"Ks");
    p=parseInt(t);
}


var pizzaArr=[];
function addPizza(){
    var y=JSON.parse(localStorage.getItem('storefood'));
    pizzaArr=y;

    if(pizzaArr.length>0){
        addpizzaItem();
    }
}

function addpizzaItem(){
    pizzaArr.forEach(function(value, key){
        //alert(value.category);
        if(value.category=="Pizza"){
            $("#orderedContainer").append(
                '<div class="card mb-3" style="max-width: 600px;">'
                +'<div class="row no-gutters">'
                +'<div class="col-md-4">'
                +'<img src="'+value.image+'"width="185px" height=185px">'
                +'</div>'
                +'<div class="col-md-8">'
                +'<div class="card-body" style="color: rgba(246, 75, 8, 0.876);">'
                +'<span class="float-right font-weight-bold float-top text-rgba(246, 75, 8, 0.876)">'
                +'$'+value.price+'</span>'
                +'<h5 class="card-title font-weight-bold">'+value.category+'</h5>'+'<br>'
                +'<p class="card-text">'+value.description+'</p>'
                +value.name
                +'<button onclick="orderPizza('+key+', this)" class="btn btn-danger text-white float-right float-bottom mb-4">+ORDER</button>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
            );
        }
    });
}

function orderPizza(pizza){
    p+=parseInt(pizzaArr[pizza].price);
     $("#orderTable tbody").append(
     '<tr><td>'+pizzaArr[pizza].name
     +'</td><td>'+pizzaArr[pizza].category
     +'</td><td>'+pizzaArr[pizza].description
     +'</td><td>'+qty+
     '</td><td>'+pizzaArr[pizza].price+'Ks'
     +'</td><td style="text-align: center;">'+'<i class="fa fa-trash-o" style="font-size:18px; color:red" onclick="deletePizza('+pizza+', this)"></i>'+'</td></tr>');
     $("#total").text("Total Amount:"+p+"Ks");
 }
 function deletePizza(pizza, i){
     var t=parseInt(p);
     t-=parseInt(pizzaArr[pizza].price);
        
     $(i).parent().parent().remove();
     $("#total").text("Total Amount:"+t+"Ks");
     p=parseInt(t);
}


var coffeeArr=[];
function addCoffee(){
    var z=JSON.parse(localStorage.getItem('storefood'));
    coffeeArr=z;

    if(coffeeArr.length>0){
        addcoffeeItem();
    }
}

function addcoffeeItem(){
    coffeeArr.forEach(function(value, key){
        //alert(value.category);
        if(value.category=="Coffee & Tea"){
            $("#orderedContainer").append(
                '<div class="card mb-3" style="max-width: 600px;">'
                +'<div class="row no-gutters">'
                +'<div class="col-md-4">'
                +'<img src="'+value.image+'"width="185px" height="185px">'
                +'</div>'
                +'<div class="col-md-8">'
                +'<div class="card-body" style="color: rgba(246, 75, 8, 0.876);">'
                +'<span class="float-right font-weight-bold float-top text-rgba(246, 75, 8, 0.876)">'
                +'$'+value.price+'</span>'
                +'<h5 class="card-title font-weight-bold">'+value.category+'</h5>'+'<br>'
                +'<p class="card-text">'+value.description+'</p>'
                +value.name
                +'<button onclick="orderCoffee('+key+', this)" class="btn btn-danger text-white float-right float-bottom mb-4">+ORDER</button>'
                +'</div>'
                +'</div>'
                +'</div>'
                +'</div>'
            );
            
        }
    });
}
function orderCoffee(coffee){
    p+=parseInt(coffeeArr[coffee].price);
    $("#orderTable tbody").append(
        '<tr><td>'+coffeeArr[coffee].name
        +'</td><td>'+coffeeArr[coffee].category
        +'</td><td>'+coffeeArr[coffee].description
        +'</td><td>'+qty+
        '</td><td>'+coffeeArr[coffee].price+'Ks'
        +'</td><td style="text-align: center;">'+'<i class="fa fa-trash-o" style="font-size:18px; color:red" onclick="deleteCoffee('+coffee+', this)"></i>'+'</td></tr>');
        $("#total").text("Total Amount:"+p+"Ks");
}

function deleteCoffee(coffee, i){
    var t=parseInt(p);
    t-=parseInt(coffeeArr[coffee].price);
           
    $(i).parent().parent().remove();
    $("#total").text("Total Amount:"+t+"Ks");
    p=parseInt(t);
}
