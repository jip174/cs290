document.addEventListener('DOMContentLoaded', bindButtons);
      const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
      const apiKey = 'fa7d80c48643dfadde2cced1b1be6ca1';

      function bindButtons(){
        document.getElementById('citySubmit').addEventListener('click', function(event){
          event.preventDefault();
         let req = new XMLHttpRequest();
         let weatherZip = document.getElementById("zip").value;  //get user input for zip
         let userCity = document.getElementById("weather").value;  // get user input for city
         let cityWeather = weatherZip == '' ? userCity : weatherZip;  // set variable to user input to search
        /* if(userCity === ''){
           cityWeather = "zip=" + weatherZip;
         }else{
           cityWeather = "q=" + userCity;
         }*/
        // var userCity = {"weather":null};
        // userCity.weather = document.getElementById('weather').value;
        req.open('GET', baseUrl + 'q=' + cityWeather + ',US' + '&appid=' + apiKey + '&units=imperial', true); // links to website to search
       
         //req.setRequestHeader('Content-Type', 'application/json');
          req.addEventListener('load',function(){
            let result = document.getElementById('weatherResults');
            if(req.status >= 200 && req.status <400){   // checks to make sure contacted to server
              let response = JSON.parse(req.responseText);
              
                if (response.main == null) {
                    result.textContent = 'Invalid Request';
                }
                else {                    
                    result.innerHTML = '<p>City: ' + response.name + ', ' + response.sys.country + '</p>';  //prints out info from server
                    result.innerHTML += '<p>Temperature: ' + response.main.temp + '</p>';
                    result.innerHTML += '<p>Humidity: ' + response.main.humidity + '%</p>';
                    result.innerHTML += '<p>Pressure: ' + response.main.pressure + '</p>';
                    }
            } else {
              console.log('Error in network request' + req.statusText);
            }});
            req.send(JSON.stringify(userCity));
         //event.preventDefault();
        });
      

        // code modified from
       //http://eecs.oregonstate.edu/ecampus-video/CS290/core-content/ajax-forms/async-requests.html

        document.getElementById('entrySubmit').addEventListener('click', function(event){
          event.preventDefault();
         let req = new XMLHttpRequest();
         let entries = {'entryone':null, 'entrytwo':null};
         entries.entryone = document.getElementById("entryone").value; //enters info
         entries.entrytwo = document.getElementById("entrytwo").value;
           
         req.open('POST', 'http://httpbin.org/post', true);
         req.setRequestHeader('Content-Type', 'application/json');
         req.addEventListener('load',function(){
           // let result = document.getElementById('entryResults');
            if(req.status >= 200 && req.status <400){  // check connection happened
             let response = JSON.parse(JSON.parse(req.responseText).data);
            // let enteredData = JSON.parse(response.data);                  
             //result.innerHTML = '<p>Field One: ' + enteredData.entryone + '</p>';
            // result.innerHTML = '<p>Field Two: ' + enteredData.entrytwo + '</p>';
            document.getElementById("oneResponse").textContent= response.entryone;   //returns info entered from server
            document.getElementById("twoResponse").textContent= response.entrytwo;              
            } else {
              console.log('Error in network request' + req.statusText);
            }});
            req.send(JSON.stringify(entries));
         //event.preventDefault();
        });
      
    }
    // req.open('POST', 'http://httpbin.org/post');