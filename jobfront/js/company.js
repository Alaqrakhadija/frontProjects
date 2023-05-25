const baseUrl ='http://127.0.0.1:8000';
const urlParams = new URLSearchParams(window.location.search);
const companyId=urlParams.get('company');

const token = localStorage.getItem('token');
if(token == null){
 window.location.href = "login.html";
}

function loadCompanyList()  {
axios.get(`${baseUrl}/job-api/company/`, {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    }
    })
  .then(response => {
    var companiesContainers='';
    for (let company of response.data) {
    let bio = company.bio;

if (bio.length > 20) {
  bio = bio.substring(0, 80) + '... ';
}
      companiesContainers+=
        `<div class="company-container">
           <div class="info">
             <h3>${company.username}</h3>
             <p id="bio">${bio}<a href='company.html?company=${company.id}' id="more">Read more</a></p>
           </div>
           <div class="contact">

             <span >${company.address}</span>
             <span >${company.email}</span>
             <span >${company.phone_number}</span>

           </div>
        </div>`
}
document.getElementsByClassName("main")[0].innerHTML = companiesContainers;
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

}

function loadCompanyData()  {


axios.get(`${baseUrl}/job-api/company/${companyId}`, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    }
})
  .then(response => {
    const company= response.data;
    companyContainer = `<h2 >Company:${company.username}</h2>

         <h4 style="margin-left:15px;">About us:</h4>
        <p style="margin-left:20px;">
            ${company.bio}
        </p>
         <h4 style="margin-left:15px;">Location:</h4>
             <span style="display:inline-block;margin-left:20px;">${company.address}.</span>
         <h4 style="margin-left:15px;">Contact info:</h4>
         <div style="margin-left:20px;">
             <li >${company.email}</li>
             <li >${company.phone_number}</li>
         </div>`
    var positions='';
    for (let position of company.positions){
      positions+=`<li><a href="position.html?company=${company.id}&position=${position.id}">${position.title}</a></li>`
    }
    document.getElementsByClassName("positions-container")[0].innerHTML = positions;
    document.getElementsByClassName("company-about")[0].innerHTML = companyContainer;
  })
  .catch(error => {
    window.location.href = "company-list.html";
  });


}
function filterPositions(byTitle,event){
      event.preventDefault();

if(byTitle){
positionUrl =`${baseUrl}/job-api/company/${companyId}/positions?search=${document.getElementById("search").value}`
}
else{
positionUrl =`${baseUrl}/job-api/company/${companyId}/positions?final_apply_date=${document.getElementById("filter").value}`
}
axios.get(positionUrl, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    }
})
  .then(response => {
  var positions='';
  for (let position of response.data){
  positions+=`<li><a href="position.html?position=${position.id}">${position.title}</a></li>`
  }
    document.getElementsByClassName("positions-container")[0].innerHTML = positions;
  })
  .catch(error => {
    // Handle errors
    console.error(error);
  });

}
function getPosition(){
const positionId=urlParams.get('position');
axios.get(`${baseUrl}/job-api/company/${companyId}/positions/${positionId}`, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${token}`,
    }
})
  .then(response => {
  const position = response.data;
  var positionContainer= `<h2 >Position:${position.title}</h2>

         <h4 style="margin-left:15px;">Description:</h4>
        <p style="margin-left:20px;">
            ${position.description}
        </p>
         <h4 style="margin-left:15px;">Link to Apply:</h4>
             <a  href="${position.apply_link}" style="display:inline-block;margin-left:20px;">${position.apply_link}</a>
         <h4 style="margin-left:15px;">Last Date to Apply:</h4>
         <span style="display:inline-block;margin-left:20px;" href="">${position.final_apply_date}.</span>`

    document.getElementsByClassName("position")[0].innerHTML = positionContainer;
  })
  .catch(error => {
  console.log(error);
//    window.location.href = "company-list.html";
  });

}
function logOut(){
  localStorage.clear('token');
  window.location.href = "login.html";
}

