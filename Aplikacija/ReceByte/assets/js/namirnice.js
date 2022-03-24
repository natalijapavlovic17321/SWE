import { user } from "./user.js";

export class namirnice{
    constructor(id,naziv,kal,vrsta){
        this.kontNamirnice=document.getElementById("sastojciRecept");;
        this.id=id;
        this.naziv=naziv;
        this.kcalVrednost=kal;
        this.vrsta=vrsta;
    }
    crtajNamirnicu(host){
        const sastojak =document.createElement("div");
        sastojak.innerHTML=this.naziv;
        host.appendChild(sastojak);
    }
    crtajNamirnicuUser(host){

        var pom=this.vrsta;
        var nam=document.getElementById(pom);
        const s=document.createElement("div");
        s.innerHTML=this.naziv;
        nam.appendChild(s);
        var labela = document.createElement("label");
         labela.innerHTML=" - " + this.kcalVrednost + " kcal/100g";
         labela.className="labelaZaKcal";
         s.appendChild(labela);
        const dugme = document.createElement("button");
          dugme.innerHTML="X";
          dugme.style="btn";
          dugme.style="color: red"; 
          s.appendChild(dugme);
          s.onclick=(ev)=>{
              var us=new user();
              this.obrisiNamirnicu(this.naziv);
              s.remove();
          }
    }
    dodajNamirnicu(id,naziv,kal,vrsta){
        this.id=id;
        this.naziv=naziv;
        this.kcalVrednost=kal;
        this.vrsta=vrsta;
    }
    dodajNamirnicu(id,naziv,kal){
        this.id=id;
        this.naziv=naziv;
        this.kcalVrednost=kal;
        this.vrsta=vrsta;
    }
    ukoniNamirnicu(){
        this.id=null;
        this.naziv=null;
        this.kcalVrednost=null;
        this.vrsta=null;
    }
    obrisiNamirnicu(namirnica) {
        fetch("https://localhost:5001/User/deleteNamirniceFromFrizider/" + namirnica, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        }).then(p => {
            if (p.ok) {
                alert("Uspesno brisanje namirnice");
            }
            else {
                alert("Greska.");
            }
        }).catch(p => {
            alert("Greška prilikom brisanja.");
        });
    }
}