let title =  document. getElementById('title');
let price =  document. getElementById('price');
let taxes =  document. getElementById('taxes');
let ads =  document. getElementById('ads');
let discount =  document. getElementById('discount');
let total =  document. getElementById('total');
let count =  document. getElementById('count');
let category =  document. getElementById('category');
let submit =  document. getElementById('submit');
let mood = 'create';
let tmp;
//get total


function getTotal(){
if(price.value !=''){
    let result=(+price.value+  +taxes.value+ +ads.value)- +discount.value
    total.innerHTML=result;
    total.style.background="#040";
}else{
    total.innerHTML='';
    
    total.style.background="#a00d20";

}
}
//creat product
let datapro;
if(localStorage.product != null){
    datapro = JSON.parse   (localStorage.product) 
}else{
    datapro=[];
}


submit .onclick = function(){
    let newProw ={
        title:title.value. toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()  ,
    }
if(mood==='create'){

    if(newProw.count>1){
        for(let i=0 ;i<newProw.count; i++){
            datapro.push(newProw );

        }
    }else{
        datapro.push(newProw );
    }
}else{
    datapro  [  tmp  ] = newProw;
    mood = 'create';
    submit.innerHTML ='create';
    count.style.display ='block'
}
    // save localstorge
localStorage.setItem('product',JSON.stringify( datapro) )
 clearData()
showData()

}
//clear.input

function clearData(){
title.value= '';
price.value='';
taxes.value='';
ads.value='';
discount.value='';
total.innerHTML='';
count.value='';
category.value='';



}
//read
function showData(){
    getTotal();
let table='';
for(let i=0; i < datapro.length; i++){
    table +=
    `
    <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
<td>${datapro[i].category}</td>
<td><button onclick="updataData(${i})"    id="updete">updete</button></td>
<td><button  onclick="deleteData(${i})"   id="delet">delet</button></td>

</tr>
    `
}
document.getElementById('tbody').innerHTML =table;
let btnDelet =document.getElementById('deletAll');
if(datapro.length > 0){
btnDelet.innerHTML=`
<button  onclick="deletAll()">delet All (${datapro.length})</button>
`
}else{
    btnDelet.innerHTML ='';
}
} 
showData()
//count
//delete
function deletData(i){
datapro.splice(i,1);
localStorage.product = JSON.stringify(datapro);
showData()
}
function deletAll(){
    localStorage.clear()
    datapro.splice(0)
    showData()

}
//count

//updet
function updataData(i){
    title.value = datapro[i].title;
    price.value = datapro[i].price;
     taxes.value = datapro[i].taxes;
     ads.value = datapro[i].ads;
     category.value = datapro[i].category;
     getTotal()
     count.style.display ='non';
     discount.value = datapro[i].discount;
     submit.innerHTML ='updata';
     mood ='updata';
     tmp =i;
     scroll({
        top:0,
        behavior : 'smooth',
     })
showData()
}
//search
let searchMood ='title';
function getsearchMood (id){
    let search= document.getElementById('search');
if(id=='searchTitle'){
searchMood ='title';
search.placeholder ='Search By Title'
}
else{
    searchMood ='category';
    search.placeholder ='Search By Category'

}
search.focus()
search.value='';
showData()
}
function searchData(value){
    let table='';
if(searchMood=='title'){
    for(let i=0 ;i<datapro.length;i++){
        if(datapro[i].title.includes(value.toLowerCase() )){
            table +=
            `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updataData(${i})"    id="updete">updete</button></td>
        <td><button  onclick="deleteData(${i})"   id="delet">delet</button></td>
        
        </tr>
            `  
           ; 
        } 
    }

}else{
    for(let i=0 ;i<datapro.length;i++){
        if(datapro[i].category.includes(value.toLowerCase())){
            table +=
            `
            <tr>
            <td>${i}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updataData(${i})"    id="updete">updete</button></td>
        <td><button  onclick="deleteData(${i})"   id="delet">delet</button></td>
        
        </tr>
            `  
           ; 
        } 
    }

}
document.getElementById('tbody').innerHTML =table;

}




