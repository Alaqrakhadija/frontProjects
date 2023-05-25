
function loadDate() {
isLogged = JSON.parse(localStorage.getItem('isLogged'));
if(!isLogged){
window.location.href = "login.html";
}
fetch('data/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
  var containers='';
   for (let i = 0; i < jsonData.length; i++) {
   containers+= `<div class="place-container">
     <a href="place.html?place=${jsonData[i].id}">
     <img src="image/${jsonData[i].img}" alt="${jsonData[i].name}"></a>
    <p>${jsonData[i].name}, ${jsonData[i].country}</p>
    <p>${jsonData[i].description}</p>
    </div>`;

    }

   document.getElementsByClassName("flex-container")[0].innerHTML = containers;
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

function loadPlaceData(){
isLogged = JSON.parse(localStorage.getItem('isLogged'));
if(!isLogged){
 window.location.href = "login.html";
}
const urlParams = new URLSearchParams(window.location.search);


fetch('data/data.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    var placeId=urlParams.get('place');
    var validPlaces = jsonData.filter(function(user){
       return user.id == placeId
    })
    if(validPlaces.length == 0){
      window.location.href = "home.html";
    }

    container= `<div class="image">
     <img src="image/${validPlaces[0].img}"
     alt="${validPlaces[0].name}" height="200px;"></div>
     <div class="info">
        <h2>${validPlaces[0].name},</h2>
        <h4>${validPlaces[0].country}.</h4>
        <p>
            ${validPlaces[0].description}
        </p>
     </div>>`;
    document.getElementsByClassName("container")[0].innerHTML = container;
  })
  .catch(function(error) {
    console.error('Error:', error);
  });
}

function logOut(){
  localStorage.setItem('isLogged', false);
  window.location.href = "login.html";
}

