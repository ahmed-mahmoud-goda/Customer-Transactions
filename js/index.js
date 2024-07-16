import Transactions from "./tansactions.js"


let transaction = new Transactions;


document.getElementById("btn").addEventListener("click",function(){
    document.querySelector("html").classList.toggle("dark")
})
document.getElementById("filterName").addEventListener("input",function(){
    transaction.getData();
})
document.getElementById("filterMore").addEventListener("input",function(){
    transaction.getData();
})
document.getElementById("filterLess").addEventListener("input",function(){
    transaction.getData();
})
transaction.getData();