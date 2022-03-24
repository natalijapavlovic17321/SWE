import { recept } from "./recept.js";
export class recepti {
  constructor() {
    this.kontRecepti = null;
    this.recepti = [];
  }
  crtajsveRecepte() {
    this.kontRecepti = null;

    const host = document.getElementById("mainRecepti");
    if (!host) throw new Error("Greska u hostu");
    this.kontRecepti = document.getElementById("receptiRecepti");
    this.kontRecepti.innerHTML = "";
    host.appendChild(this.kontRecepti);
    this.kontRecepti.classList.add("receptiRecepti");
    this.crtajJedanRecept(this.kontRecepti);
  }
  crtajJedanRecept(host) {
    const kontejner = document.createElement("div");
    kontejner.classList.add("container");
    const row = document.createElement("div");
    row.classList.add("row");
    kontejner.appendChild(row);
    host.appendChild(kontejner);

    const loadMoreDiv = document.createElement("div");
    loadMoreDiv.classList.add("flexDIV");
    host.appendChild(loadMoreDiv);

    let currentItems = 6;
    const load = document.createElement("button");
    load.id = "loadmore";
    load.classList.add("btn");
    load.classList.add("btn-b");
    load.style.margin = 20;

    load.innerHTML = "Load More...";

    var ix = 0;

    var ostatak = Math.floor(this.recepti.length % 6);
    var kolicnik = Math.floor(this.recepti.length / 6);
    if (this.recepti.length < 6) {
      this.recepti.forEach((element) => {
        element.crtajReceptUListi(row);
        load.style.display = "none";
      });
    } else {
      for (let i = 0; i < 6; i++) {
        this.recepti[i].crtajReceptUListi(row);
      }
      if (this.recepti.length > 6) {
        loadMoreDiv.appendChild(load);

        load.addEventListener("click", (e) => {
          ix++;
          if (ix < kolicnik) {
            for (let i = 6 * ix; i < 6 * ix + 6; i++) {
              this.recepti[i].crtajReceptUListi(row);
            }
          }
          if (ix == kolicnik && ostatak != 0) {
            for (let i = 6 * ix; i < 6 * ix + ostatak; i++) {
              this.recepti[i].crtajReceptUListi(row);
              load.style.display = "none";
            }
          }
        });
      }
    }
  }
  crtajBukmarkovane() {
    document.getElementById("bookmarkovaniLbl").style.visibility = "visible";

    var host = document.getElementById("iscrtajUserRecepte");
    this.recepti.forEach((recept) => {
      recept.crtajReceptBukmark(host);
    });
  }
  crtajsveRecepteUser() {
    const host = document.getElementById("iscrtajUserRecepte");
    if (!host) throw new Error("Greska u hostu");
    this.kontRecepti = document.getElementById("iscrtajUserRecepte");
    this.kontRecepti.innerHTML = "";
    host.appendChild(this.kontRecepti);

    this.kontRecepti.classList.add("iscrtajUserRecepte");
    this.crtajJedanRecept(this.kontRecepti);
  }
  osveziPrikaz() {
    this.crtajsveRecepte();
  }
  dodajRecept(recept) {
    this.recepti.push(recept);
  }
  ukloniRecept(recept) {
    this.recepti.pop(recept);
  }

  ucitajSveRecepte() {
    fetch("https://localhost:5001/Recepti/PreuzmiRecepte").then((p) => {
      p.json().then((data) => {
        data.forEach((element) => {
          var p1 = new recept();
          p1.autor = element.autor;
          p1.brojPorcija = element.brojPorcija;
          p1.id = element.id;
          p1.kcalVrednost = element.kcalVrednost;
          p1.komentari = null;
          p1.namirnice = element.namirnicee;
          p1.naziv = element.naziv;
          p1.prosecnaOcena = element.prosecnaOcena;
          p1.slika = element.imgPath;
          p1.tekst = element.tekst;
          p1.vremePripreme = element.vremePripreme;
          this.dodajRecept(p1);
        });
        this.crtajsveRecepte();
      });
    });
  }
  ucitajBookmarkovaneRecepte() {
    fetch("https://localhost:5001/Recepti/Bookmark", {
      method: "GET",
      headers: {
        //"Content-Type": "application/json",
        accept: "text/plain",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    }).then((p) => {
      p.json().then((data) => {
        data.forEach((element) => {
          var p1 = new recept();
          p1.brojPorcija = element.brojPorcija;
          p1.id = element.id;
          p1.kcalVrednost = element.kcalVrednost;
          p1.komentari = null;
          p1.naziv = element.naziv;
          p1.prosecnaOcena = element.prosecnaOcena;
          p1.slika = element.imgPath;
          p1.tekst = element.tekst;
          p1.vremePripreme = element.vremePripreme;
          this.dodajRecept(p1);
        });
        this.crtajBukmarkovane();
      });
    });
  }
}
