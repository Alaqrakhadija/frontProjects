const baseUrl ='http://127.0.0.1:8000';
$(function() {
        $('#signup').click(function() {
        $('.line').animate({margin:'0 0 0 50%'})
    });
 $('#login').click(function() {
        $('.line').animate({margin:'0'})
    });

    $('#myForm').on( 'submit',function(event) {
    event.preventDefault();

    axios.post(`${baseUrl}/job-api/login/`, {
  username: $("#username").val(),
   password: $("#password").val()
}, {
  headers: {
    'Content-Type': 'application/json',
  }
})
  .then(response => {
    localStorage.setItem('token', response.data.token);
window.location.href = "company-list.html";
  })
  .catch(error => {
    $("#error").text("incorrect username or password");
    console.error(error);
  });



    });

});



