


/*const DATACELLS = [
    {header1: [1,1], header2: [2,1], header3: [3,1], header4: [4,1]},
    {header1: [1,2], header2: [2,2], header3: [3,2], header4: [4,2]},
    {header1: [1,3], header2: [2,3], header3: [3,3], header4: [4,3]},
    {header1: [1,4], header2: [2,4], header3: [3,4], header4: [4,4]}    
  ]; hard codes array tthat started*/
   
/* used the example from the book http://eloquentjavascript.net/15_event.html
function buildTable(data) {
let table = document.createElement("table");
let fields = Object.keys(data[0]);
let headRow = document.createElement('tr');
table.style.width = '100%';
table.setAttribute('border', '1');  
fields.forEach(function(field){
let headCell = document.createElement("th");
headCell.textContent = field;
headRow.appendChild(headCell);
});
table.appendChild(headRow);

data.forEach(function(object){
let row= document.createElement("tr");
fields.forEach(function(field){
let cell = document.createElement("td");
cell.textContent = object[field];
if(typeof object[field] == "number"){
cell.style.textAlign = "right";
}
row.appendChild(cell);
});
table.appendChild(row);
});
return table;
}*/

//let p = document.querySelector("p"); 

var theTable = function(){

    var col = 1;
    var row = 1;
  //https://stackoverflow.com/questions/14643617/create-table-using-javascript helped to make table 
function tableMaker(createButton){ //create the table
    let body = document.body;
    let table = document.createElement("table");
    let tableBody = document.createElement("tbody");
    table.style.width = '100%';
    table.setAttribute('border', '1');

    for(let i = 0; i <4 ; i++){ // loop through to create the needed rows/columns for headers and data
        let tr = document.createElement('tr');
        for(let j = 0 ; j < 4 ; j++){
            if(i === 0 ){
                var th = document.createElement('th'); // creates header element
                th.appendChild(document.createTextNode("Header" + (j+1))); // label headers
                tr.appendChild(th);
            } else {
                let td= document.createElement("td"); //creates data elements
                let label = (j +1) + "," + i;
                td.appendChild(document.createTextNode(label));
                td.setAttribute('id', label);
                if( j===0 && i === 1){
                    td.style.border = "3px solid black"; // adds a border
                }
                tr.appendChild(td); // adds data to row
            }
        }
        tableBody.appendChild(tr); // adds row to tablebody
    }
    table.appendChild(tableBody); //adds tablebody to table
    body.appendChild(table);      //adds table to the document
    if(createButton){
        createButton();
    }
}

function dirButtons(createButton){
    let body = document.body;
    let arrows = ["up", "left", "right", "down", "Mark Cell"]; // creates buttons to move around table
    for(let i = 0 ; i < arrows.length; i++){
        var button = document.createElement("button");
        button.appendChild(document.createTextNode(arrows[i])); // adds text to the buttons
        body.appendChild(button);
        //let direction = arrows[i];
        button.addEventListener("click", function(e){  //changes cells according to what is selected
            if(e.target.innerText !== "Mark Cell"){    //if marked cell is innertext then changes background color
                handleArrow(e.target.innerText);
               //unmarked();
            }
             else {
                marked();
            }
        });
    }
}
 function unmarked(){
    let cell = document.getElementById(row + "," + col);
    cell.style["background-color"] = "white";
 }
function marked(){ // adds color when marked cell is clicked
    let cell = document.getElementById(row + "," + col);
    if( cell.style["background-color"] = "white"){
        cell.style["background-color"] = "yellow";
    }else if(cell.style["background-color"] = "yellow"){
        cell.style["background-color"] = "blue";
        }
    }



function handleArrow(direction){
    let currentCell = row + "," + col;
    let newCell = document.getElementById(currentCell);
    newCell.style.border = " 1px solid black"; // adds border 
    
    if(direction == "up") { // moves current cell based on button chosen and direction
        if (col !== 1){
           col--;
        } 
          //  document.body.removeEventListener("keydown", handleArrow);
    } else if (direction == "left") {
            if(row !== 1){
                row--;
            }
     } else if (direction == "right") {
            if(row !== 4){
                row++;
            }
      
    } else if ( direction == "down"){
       if(col !== 3){
           col++;
       }
    }
    currentCell = row + "," + col;
    newCell = document.getElementById(currentCell);
    newCell.style.border = "3px solid black"; // marks current cell
 }
 tableMaker(dirButtons);
};
//document.body.addEventListener("keydown", handleArrow());

//dirButtons();
//document.querySelector("#datacells").appendChild(buildTable(DATACELLS));
theTable();