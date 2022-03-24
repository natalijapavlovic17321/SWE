if (
  sessionStorage.getItem("token") == null ||
  sessionStorage.getItem("token") == ""
) {
  alert("Niste prijavljeni! Prijavite se!");
  location.href = "prijaviSe.html";
}
if(sessionStorage.getItem("image") ==null ||sessionStorage.getItem("image") =="")
{

  sessionStorage.setItem("image","assets/img/no_image.jpg");
} 
