import { privilegija } from "./privilegija.js";
import { user } from "./user.js";
if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
    alert("Niste prijavljeni! Prijavite se!");
    location.href="prijaviSe.html";
}
else{
var us=new user();
us.getRoleAdmin(1);
var priv = new privilegija();

document.getElementById("userNameToGivePerm").value = "";
document.getElementById("nazivNamirnice").value = "";
document.getElementById("KcalNamirnice").value = "";

var dugmePrivilegija = document.getElementById("dodajPrivilegiju");
var dugmeNamirnica = document.getElementById("dodajNamirnicu");

dugmePrivilegija.addEventListener("click", dodajPrivilegiju);
dugmeNamirnica.addEventListener("click", dodajNamirnice);

function dodajPrivilegiju() {
  var inp = document.getElementById("userNameToGivePerm").value;
  priv.odobriPrivilegiju(inp);
}

function dodajNamirnice() {
  var jedan = document.getElementById("nazivNamirnice").value;
  var dva = document.getElementById("VrstaNamirnice").value;
  var tri = document.getElementById("KcalNamirnice").value;
  priv.dodajNamirnice(jedan, dva, tri);
 
  document.getElementById("nazivNamirnice").value='';
  document.getElementById("VrstaNamirnice").value='';
  document.getElementById("KcalNamirnice").value='';
}
}
