//creates the carosel for main pages images
let slideCount = 0;
slideShow();
function slideShow(){
let slides = document.getElementsByClassName("Slides");
for(let i =0 ; i < slides.length ; i++){
    slides[i].style.display = "none";
}
slideCount++;
if(slideCount > slides.length){slideCount =1}
slides[slideCount-1].style.display = "block";
setTimeout(slideShow,3000);//sets delay of pics rotating
}
// create the functions to handles the forms
document.addEventListener('DOMContentLoaded', bindButtons);
function bindButtons(){
document.getElementById('entrySubmit').addEventListener('click', function(event){
    event.preventDefault();
   let req = new XMLHttpRequest();
   let entries = {'name':null, 'favGame':null,'favType':null, 'email':null};
   entries.name = document.getElementById("name").value; //enters info
   entries.favGame = document.getElementById("favGame").value;
   entries.favType = document.getElementById("favType").value; //enters info
  
     
  req.open('POST', 'http://httpbin.org/post', true);
   //req.open('POST','http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php', true)
   req.setRequestHeader('Content-Type', 'application/json');
   req.addEventListener('load',function(){
     // let result = document.getElementById('entryResults');
      if(req.status >= 200 && req.status <400){  // check connection happened
       let response = JSON.parse(JSON.parse(req.responseText).data);
      // let enteredData = JSON.parse(response.data);                  
       //result.innerHTML = '<p>Field One: ' + enteredData.entryone + '</p>';
      // result.innerHTML = '<p>Field Two: ' + enteredData.entrytwo + '</p>';
      document.getElementById("oneResponse").textContent= response.name;   //returns info entered from server
      document.getElementById("twoResponse").textContent= response.favGame;
      document.getElementById("thirdResponse").textContent= response.favType;   //returns info entered from server
      //console.log(response.name);                       
      } else {
        console.log('Error in network request' + req.statusText);
      }});
      req.send(JSON.stringify(entries));
      document.getElementById("favForm").reset();
  // event.preventDefault();
  });

}
