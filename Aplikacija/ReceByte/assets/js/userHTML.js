import { namirnice } from "./namirnice.js";
import { friziderNam } from "./nekorisceno/friziderNam.js";
import { recepti } from "./recepti.js";
import { user } from "./user.js";
if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
    alert("Niste prijavljeni! Prijavite se!");
    location.href="prijaviSe.html";
}
else{
var us=new user();
us.getRoleAdmin(0);
us.getRolePrivilegovani(0);
us.getInfo();
us.preuzmiNamirnice();

var odjaviSeBtn = document.getElementById("btnOdjaviSe");
odjaviSeBtn.addEventListener("click",odjaviSe);

function odjaviSe()
{
  sessionStorage.clear();
  location.href ="prijaviSe.html"
}
var dugme=document.getElementById('unesiNamirnicu');
var dugme2=document.getElementById('prikaziBukmarkovane');
var prostor=document.getElementById('iscrtajUserRecepte');
dugme.addEventListener('click',dodajNamirnicu);
dugme2.addEventListener('click',prikaziBukmarkovane);
var pomocna=new recepti();
function prikaziBukmarkovane(){
  pomocna.recepti.splice(0, pomocna.recepti.length);
  prostor.innerHTML="";
  pomocna.ucitajBookmarkovaneRecepte();
  location.href='#iscrtajUserRecepte';pomocna.recepti.forEach
  pomocna.crtajBukmarkovane();
}
function dodajNamirnicu(){
  var i =0;
  var poruka=document.getElementById('porukaZaUnos');
  poruka.innerHTML="";
 var nam=document.getElementById('unesiNamirnicuInput').value;
 if(!document.getElementById('unesiNamirnicuInput').value)
     poruka.innerHTML="Unesite namirnicu";
 else {
    us.friziderNam.forEach((el) => {
     if(el.naziv.toLowerCase() == nam.toLowerCase())
     {
       alert("Vec imate namirnicu u frizideru!");
       i++;
       
     }
   })
  }
  if(i ==0)
  {

    getNamirnicu(nam.toLowerCase());
  }
 

}
function getNamirnicu(naziv)
{
    fetch("https://localhost:5001/Recepti/proveriPostojanje/"+naziv, {
      method: "GET",
      headers: {
        //"Content-Type": "application/json",
        "accept": "text/plain",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      },
    }).then((p) => {
      if (p.ok) {
        p.json().then((data) => {
          us.ubaciNamirnicu(naziv);
          var n=new namirnice();
          n.id=data.id;
          n.naziv=data.naziv;
          n.vrsta=data.vrsta;
          n.kcalVrednost=data.kcalVrednost;
          us.dodajNamirnicu(n);
          n.crtajNamirnicuUser(document.getElementById("friziderUser"));
        });
      }
      else{
        var poruka=document.getElementById('porukaZaUnos');
        poruka.innerHTML="Namirnica se ne nalazi u bazi podataka";
      }
    });
}
function getVrsteNamirnica(sveNam) {
  fetch("https://localhost:5001/Recepti/getSveVrsteNamirnica", {
    method: "GET",
    headers: {
      //"Content-Type": "application/json",
      "accept": "text/plain",
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    },
  }).then((p) => {
    if (p.ok) {
      p.json().then((data) => {
        data.forEach((element) => {
          console.log(element);
          sveNam.push(element);
        });
      });
    }
  });
}
}