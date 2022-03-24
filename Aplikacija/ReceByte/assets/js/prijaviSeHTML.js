if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
var d=document.getElementById('signUp');
d.addEventListener("click",hideSignUp);
var d2=document.getElementById('logIn');
d2.addEventListener("click",hideLogIn);

function hideSignUp() {
    document.getElementById("signUp").style.visibility = "hidden";
    document.getElementById("signupSpecifikacije").style.visibility = "visible";
  }
  function hideLogIn() {
    document.getElementById("logIn").style.visibility = "hidden";
    document.getElementById("loginSpecifikacije").style.visibility = "visible";
  }
}
else{
  alert("Vec ste prijavljeni");
  location.href="user.html";
}