import { namirnice } from "./namirnice.js";
import { recept } from "./recept.js";
import { recepti } from "./recepti.js";
import { user } from "./user.js";
var SviRecepti = new recepti();
if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
{
    document.getElementById("PretraziPoFrizideru").className="hide";
}
else{
var us = new user();
us.preuzmiNamirniceKorisnika();     
var nam =us.friziderNam;
}
document.getElementById("sortingOptionID").options[0].selected = true; 
document.getElementById("ImezaPretragu").value = ""; 
document.getElementById("kcalZaPretragu").options[0].selected = true; 
document.getElementById("brojPorcijaZaPretragu").options[0].selected = true; 
document.getElementById("vremePripremeZaPretragu").options[0].selected = true; 
SviRecepti.ucitajSveRecepte();
var rec = SviRecepti.recepti;
export function sortirajPoNazivu() {
  var tr = SviRecepti.recepti;
  tr.sort((a, b) => (a.naziv > b.naziv ? 1 : -1));
  SviRecepti.osveziPrikaz();
}
export function sortirajPoOceni() {
  var tr = SviRecepti.recepti;
  tr.sort((a, b) => (a.prosecnaOcena < b.prosecnaOcena ? 1 : -1));
  SviRecepti.osveziPrikaz();
}
export function sortirajPoKcal() {
  var tr = SviRecepti.recepti;
  tr.sort((a, b) => (a.kcalVrednost < b.kcalVrednost ? 1 : -1));
  SviRecepti.osveziPrikaz();
}
export function pretrazi() {
  var ime = document.getElementById("ImezaPretragu").value;
  var kcall = document.getElementById("kcalZaPretragu").value;
  var bPorcija = document.getElementById("brojPorcijaZaPretragu").value;
  var vremePrip = document.getElementById("vremePripremeZaPretragu").value;

console.log(rec);

  var pretazeniRecepti = rec;
  var pre = [];
  if (ime != "") {
    rec.forEach((el) => {
      var pom = el.naziv.toLowerCase();
      if (pom.includes(ime.toLowerCase())) {
        pre.push(el);
      }
    });
    rec = pre;
    pre = [];
  }
  if (kcall != "Sve") {
    rec.forEach((el) => {
      if (el.kcalVrednost <= kcall) {
        pre.push(el);
      }
    });
    rec = pre;
    pre = [];
  }
  if (bPorcija != "Sve") {
    rec.forEach((el) => {
      if (el.brojPorcija == bPorcija) {
        pre.push(el);
      }
    });
    rec = pre;
    pre = [];
  }
  if (vremePrip != "Sve") {
    rec.forEach((el) => {
      if (el.vremePripreme <= vremePrip) {
        pre.push(el);
      }
    });
    rec = pre;
    pre = [];
  }
  pre = rec;
  rec = pretazeniRecepti;
  SviRecepti.recepti = pre;
  SviRecepti.osveziPrikaz();
}

export function pretraziPoFrizideru() {
  var statickiNamirnice = [];

  nam.forEach((el)=>{
    statickiNamirnice.push(el.naziv);
  });

  var pre = [];
  var i = 0; 
  var j = 0; 

  rec.forEach((el) => {
    statickiNamirnice.forEach((statEL) => {
      el.namirnice.forEach((o) => {
        if (o.naziv == statEL) {
          i++; 
        }
        if (i == el.namirnice.length && j == 0) {
          pre.push(el); 
          j++; 
        } 
      });
    });
    i = 0; 
    j = 0; 
  });
  SviRecepti.recepti = pre;
  SviRecepti.osveziPrikaz(); 
  rec = pre;

}