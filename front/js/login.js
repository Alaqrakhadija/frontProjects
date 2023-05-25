$(function() {
        $('#signup').click(function() {
        $('.line').animate({margin:'0 0 0 50%'})
    });
 $('#login').click(function() {
        $('.line').animate({margin:'0'})
    });

    $('#myForm').on( 'submit',function(event) {
    event.preventDefault();
        fetch('data/users.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
var username = $("#username").val();
var password = $("#password").val();
var ValidUsers = jsonData.filter(function(user){return user.username == username &&
user.password == password})
if(ValidUsers.length == 0){
localStorage.setItem('isLogged', false);

$("#error").text("incorrect username or password");
}
else{
localStorage.setItem('isLogged', true);
window.location.href = "home.html";
}
  })
  .catch(function(error) {
    console.error('Error:', error);
  });


    });

});



