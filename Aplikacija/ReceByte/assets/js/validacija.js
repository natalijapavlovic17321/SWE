import { recepti } from "./recepti.js";
import { recept } from "./recept.js";
export class validacija {
  constructor() {
    this.kontVal = null;
    this.receptiVal = [];
  }
  crtajRecepte() {
    this.kontRecepti =null;

    const host = document.getElementById("mainValidacija");
    if (!host) throw new Error("Greska u hostu");
    this.receptiVal.forEach((recept) => {
      recept.crtajReceptValidacija(host);
    });

  }
  dodajRecept(recept){
    this.receptiVal.push(recept);
}
  preuzmi(){
      fetch("https://localhost:5001/Recepti/NeverifikovaniRecepti", {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
          "accept": "text/plain",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
        },
      }).then((p) => {
        p.json().then((data) => {
          data.forEach((element) => {
            var p1 = new recept();
            p1.autor = element.autor;
            p1.brojPorcija = element.brojPorcija;
            p1.id = element.id;
            p1.kcalVrednost = element.kcalVrednost;
            p1.komentari=null;
            p1.naziv = element.naziv;
            p1.slika = element.imgPath;
            p1.tekst = element.tekst;
            p1.vremePripreme = element.vremePripreme;
            this.dodajRecept(p1);
          });
          this.crtajRecepte();
        });
      });
  }
}