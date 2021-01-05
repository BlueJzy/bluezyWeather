// Select elemt
const weatherFrm = document.querySelector('form'); // select the form
const myval = document.querySelector("#loc"); // select the inpyut
const para = document.querySelectorAll("p");

weatherFrm.addEventListener("submit", (e) => {
    para[0].innerHTML = "Loading...";
    para[1].innerHTML = "";
    
    e.preventDefault();
    const location = myval.value
    fetch("http://localhost:3000/myweather?address="+location).then( (res) => {
    res.json().then( (data) => {
        if(data.error) {
            console.log(data.error);
            para[0].innerHTML = data.error;
        }else {
            
            console.log(data.Location);
            console.log(data.Description);
            console.log(data.windSpeed);
            para[1].innerHTML = `Current weather for ${data.Location}: It seems to be kind a bit ${data.Description} and the winspeed is: ${data.windSpeed}`;
        }
    });
});
});