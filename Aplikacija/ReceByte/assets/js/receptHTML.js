import { recept } from "./recept.js";
var rec=new recept();
var id = sessionStorage.getItem("idKliknutogRecepta");
rec.preuzmiRecept(id);
if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
    document.getElementById("sakriKomentare").style.display = "none";
    document.getElementById("stars").style.display = "none";
    document.getElementById("bookmarkuj").style.display = "none";
    var elements = document.getElementsByClassName("like");

    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
}
 else{
var d=document.getElementById('OstaviKomentar');
d.addEventListener("click",OstaviKomentar);
var d2=document.getElementById('bookmarkuj');
d2.addEventListener("click",bookmarkuj);
var z5=document.getElementById('star-5');
z5.addEventListener("change", promeni);
var z4=document.getElementById('star-4');
z4.addEventListener("change", promeni);
var z3=document.getElementById('star-3');
z3.addEventListener("change", promeni);
var z2=document.getElementById('star-2');
z2.addEventListener("change", promeni);
var z1=document.getElementById('star-1');
z1.addEventListener("change", promeni);
function OstaviKomentar(){
    var kom = document.getElementById("textMessage").value;
    rec.posaljiKomentar(kom);
}
function bookmarkuj(){
    rec.posaljiBookmark();
}
function promeni(){
    var rbs = document.querySelectorAll('input[name="star"]:checked');
    var ocena=rbs[0].value;
    rec.posaljiOcenuRecepta(ocena);
}
}
