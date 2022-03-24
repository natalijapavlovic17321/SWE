import { user } from "./user.js";
import { validacija } from "./validacija.js";
if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
    alert("Niste prijavljeni! Prijavite se!");
    location.href="prijaviSe.html";
}
else{
    var us=new user();
    us.getRolePrivilegovani(1);
    var val= new validacija();
    val.preuzmi();
}
