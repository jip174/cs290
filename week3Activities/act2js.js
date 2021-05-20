out1();

function out1(){
   document.getElementById("output1").textContent = "I am out1";
}

console.log(out2());

var out2 = function(){
    document.getElementById("output2").textContent = "I am out2";
}
