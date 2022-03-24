import { namirnice } from "../namirnice";
import { recepti } from "../recepti";
import { recNamirnice } from "../recNamirnice";
import {oceneKom} from "../oceneKom";
import {oceneRec} from "../oceneRec";
var namirniceRecepti=[];
var nam=[];  //sve namirnice
var kom=[];
var oceneKomentara=[];
var oceneRecepta=[];
var komentari=[];
var rPrikaz=new recepti();  // svi recepti
//ovo ima i u js recepti
rPrikaz.ucitajSveRecepte();
fetch("https://localhost:5001/Recepti/getNamirnice").then(p=>{
    p.json().then(data=>{
       data.forEach(element => {
           var p1 = new namirnice(element.Naziv,element.ID,element.KcalVrednost,element.Vrsta);
           nam.push(p1);
       });
    });
});
