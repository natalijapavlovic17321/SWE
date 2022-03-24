
import { namirnice } from "./namirnice.js";
import { komentar } from "./komentar.js";
import { user } from "./user.js";
export class recept {
  constructor(
    naziv,
    tekst,
    slika,
    id,
    kal,
    osobe,
    vreme,
    autor,
    prosecnaOcena
  ) {
    this.kontRecept = document.getElementById("mainRecept");
    this.namirnice = [];
    this.naziv = naziv;
    this.tekst = tekst;
    this.slika = slika;
    this.id = id;
    this.kcalVrednost = kal;
    this.brojPorcija = osobe;
    this.vremePripreme = vreme;
    this.autor = autor;
    this.prosecnaOcena = prosecnaOcena;
    this.komentari = [];
    //this.privilegovani=odobrio;
  }
  dodajRecept(
    naziv,
    tekst,
    slika,
    id,
    vreme,
    kal,
    osobe,
    autor,
    prosecnaOcena
  ) {
    //this.komentari=[];
    //this.privilegovani=odobrio;
    this.naziv = naziv;
    this.tekst = tekst;
    this.slika = slika;
    this.id = id;
    this.kcalVrednost = kal;
    this.brojPorcija = osobe;
    this.vremePripreme = vreme;
    this.autor = autor;
    this.prosecnaOcena = prosecnaOcena;
  }
  crtajRecept() {
    const host = document.getElementById("bodyRecept");
    if (!host) throw new Error("Greska u hostu");

    this.crtajHTMLRecept(document.getElementById("mainRecept"));
    this.crtajSastojke(host);
    this.crtajKomentar(host);
  }
  crtajReceptBukmark(host) {
    console.log("ovde");
    var row1 = document.createElement("div");
    row1.classList.add("row");
    var row2 = document.createElement("div");
    row2.classList.add("row");
    console.log("ovde1");
    var naz = document.createElement("div");
    naz.classList.add("col-lg-6");
    naz.classList.add("col-sm-6");
    naz.classList.add("col-md-6");
    var ime = document.createElement("label");
    ime.classList.add("title-d");
    ime.innerHTML = this.naziv;
    naz.appendChild(ime);

    var dugmici = document.createElement("div");
    dugmici.classList.add("col-lg-6");
    dugmici.classList.add("col-sm-6");
    dugmici.classList.add("col-md-6");
    var vidi = document.createElement("div");
    vidi.classList.add("col-lg-4");
    vidi.classList.add("col-sm-4");
    vidi.classList.add("col-md-4");
    var pogled = document.createElement("button");
    pogled.classList.add("btn");
    pogled.classList.add("btn-a");
    pogled.innerHTML = "Pogledaj recept";
    vidi.appendChild(pogled);
    var p = document.createElement("p");
    vidi.appendChild(p);
    pogled.onclick = (ev) => {
      sessionStorage.setItem("idKliknutogRecepta", this.id);
      location.href = "recept.html";
    };

    row1.appendChild(naz);
    row2.appendChild(vidi);

    row1.appendChild(row2);
    host.appendChild(row1);
  }

  crtajReceptValidacija(host) {
    var row1 = document.createElement("div");
    row1.classList.add("row");
    var row2 = document.createElement("div");
    row2.classList.add("row");

    var naz = document.createElement("div");
    naz.classList.add("col-lg-6");
    naz.classList.add("col-sm-6");
    naz.classList.add("col-md-6");
    var ime = document.createElement("label");
    ime.classList.add("title-d");
    ime.classList.add("fix");
    ime.innerHTML = this.naziv;
    naz.appendChild(ime);

    var dugmici = document.createElement("div");
    dugmici.classList.add("col-lg-6");
    dugmici.classList.add("col-sm-6");
    dugmici.classList.add("col-md-6");
    var vidi = document.createElement("div");
    vidi.classList.add("col-lg-4");
    vidi.classList.add("col-sm-4");
    vidi.classList.add("col-md-4");
    var pogled = document.createElement("button");
    pogled.classList.add("btn");
    pogled.classList.add("btn-a");
    pogled.innerHTML = "Pogledaj";
    vidi.appendChild(pogled);
    pogled.onclick = (ev) => {
      sessionStorage.setItem("idKliknutogRecepta", this.id);
      location.href = "recept.html";
    };

    var odobri = document.createElement("div");
    odobri.classList.add("col-lg-4");
    odobri.classList.add("col-sm-4");
    odobri.classList.add("col-md-4");
    var da = document.createElement("button");
    da.classList.add("btn");
    da.classList.add("btn-a");
    da.innerHTML = "Odobri";
    odobri.appendChild(da);
    da.onclick = (ev) => {
      this.odobriRecept();
    };

    var obrisi = document.createElement("div");
    obrisi.classList.add("col-lg-4");
    obrisi.classList.add("col-sm-4");
    obrisi.classList.add("col-md-4");
    var ne = document.createElement("button");
    ne.classList.add("btn");
    ne.classList.add("btn-a");
    ne.innerHTML = "Obriši";
    obrisi.appendChild(ne);
    ne.onclick = (ev) => {
      this.ObrisiRecept();
    };

    row1.appendChild(naz);
    row2.appendChild(vidi);
    row2.appendChild(odobri);
    row2.appendChild(obrisi);
    row1.appendChild(row2);
    host.appendChild(row1);
  }
  crtajHTMLRecept(host) {
    document.getElementById("nazivRecept").innerHTML = this.naziv;
    document.getElementById("tekstRecept").innerHTML = this.tekst;
    document.getElementById("slikaRecept").src ="https://localhost:5001/Recepti/getImage/" + this.slika;
    document.getElementById("kalorijskaRecept").innerHTML = this.kcalVrednost;
    document.getElementById("brPorcijaRecept").innerHTML = this.brojPorcija;
    document.getElementById("vremeRecept").innerHTML = this.vremePripreme + "min";
    document.getElementById("autorRecept").innerHTML = this.autor;
    document.getElementById("ocenaRecept").innerHTML = this.prosecnaOcena;
  }
  crtajSastojke(host) {
    var pom = document.getElementById("sastojciRecept");
    this.namirnice.forEach((namirnica) => {
      namirnica.crtajNamirnicu(pom);
    });
  }

  crtajKomentar(host) {
    var pom = document.getElementById("komentariRecept");
    this.komentari.forEach((komentar) => {
      komentar.crtajKomentar(pom);
    });
  }

  crtajReceptUListi(host) {
    if (!host) throw new Error("Greska u hostu");
    const pom = document.createElement("div");
    pom.classList.add("col-md-4");
    pom.classList.add("card-box-a");
    pom.classList.add("receptiRazmak");
    const pom1 = document.createElement("div");
    pom1.classList.add("card-overlay");
    pom1.classList.add("card-overlay-a-content");
    pom1.id="id";
    pom.appendChild(pom1);

    const nazivRecepta = document.createElement("h2");
    var header = document.createElement("div");
    header.classList.add("card-header-a");
    pom1.appendChild(header);
    nazivRecepta.classList.add("card-title-a");
    nazivRecepta.classList.add("naziv");

    nazivRecepta.innerHTML = this.naziv;
    header.appendChild(nazivRecepta);
    pom.value = this.id;

    host.appendChild(pom);

    var img = document.createElement("img");
    img.classList.add(".card-overlay-a-content");
    if (this.slika == null) {
      img.src = "assets/img/no_image.jpg";
    } else {
      console.log("ulazi");
      img.src = "https://localhost:5001/Recepti/getImage/" + this.slika;
    }
    img.classList.add("img-a");
    img.classList.add("img-fluid");
    img.classList.add("img-thumbnail");
    img.classList.add("img-box-a");
    img.classList.add("slikaRecepti");
    pom.appendChild(img);

    pom.onclick = (ev) => {
        sessionStorage.setItem("idKliknutogRecepta", pom.value);
        location.href = "recept.html";
      };
  }
  OpenInNewTabWinBrowser(url) {
    var win = window.open(url, "_blank");
    win.focus();
  }

  dodajRecept(naziv, tekst, slika, id, vreme, kal, osobe, autor) {
    this.naziv = naziv;
    this.tekst = tekst;
    this.slika = slika;
    this.id = id;
    this.vremePripreme = vreme;
    this.kcalVrednost = kal;
    this.brojPorcija = osobe;
    this.autor = autor;
    this.prosecnaOcena = prosecnaOcena;
  }
  ukloniRecept() {
    this.naziv = null;
    this.tekst = null;
    this.slika = null;
    this.id = null;
    this.vremePripreme = null;
    this.kcalVrednost = null;
    this.brojPorcija = null;
    this.autor = null;
    this.namirnice = null;
    this.prosecnaOcena = null;
    //this.kontRecept=null;
  }
  dodajNamirnicu(namirnica) {
    this.namirnice.push(namirnica);
  }
  ukloniNamirnicu(namirnica) {
    this.namirnice.pop(namirnica);
  }
  preuzmiRecept(idd) {
    fetch("https://localhost:5001/Recepti/getRecept/" + idd).then((p) => {
      p.json().then((data) => {
        this.id = data.id;
        this.prosecnaOcena = data.prosecnaOcena;
        this.autor = data.autor;
        this.vremePripreme = data.vremePripreme;
        this.naziv = data.naziv;
        this.tekst = data.tekst;
        this.slika = data.imgPath;
        this.kcalVrednost = data.kcalVrednost;
        this.brojPorcija = data.brojPorcija;
        this.id = data.id;
        data.namirnicee.forEach((nam) => {
          var N = new namirnice(nam.id, nam.naziv, nam.kcalVrednost, nam.vrsta);
          this.namirnice.push(N);
        });
        data.komentarii.forEach((kom) => {
          var K = new komentar(
            kom.id,
            kom.tekst,
            kom.userName,
            kom.recept,
            kom.ocenaKomentara
          );
          this.komentari.push(K);
        });
        this.crtajRecept();
      });
    });
  }
  posaljiBookmark() {
    fetch("https://localhost:5001/Recepti/PostBookmark/" + this.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno bookmarkovanje");
        } else {
          alert("Greska kod bookmarkovanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
  posaljiOcenuRecepta(ocena) {
    fetch("https://localhost:5001/Recepti/PostOcena/" + this.id + "/" + ocena, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    }).then((p) => {
      p.json().then((data) => {
        if (data < 6) {
          document.getElementById("ocenaRecept").innerHTML = data;
        }
      });
    });
  }
  posaljiOcenuKomentara(kom) {
    fetch("https://localhost:5001/Recepti/PostOcenaKomentara/" + kom.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    })
      .then((p) => {
        if (p.ok) {
        } else {
          alert("Greska kod ocenjivanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
  posaljiKomentar(kom) {
    fetch("https://localhost:5001/Recepti/postaviKom/" + this.id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        tekst: kom
      }),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno komentarisanje");
          document.getElementById("textMessage").value = "";
        } else {
          alert("Greska kod komentarisanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
  odobriRecept() {
    fetch("https://localhost:5001/Recepti/OdobravanjeRecepta/" + this.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno ste odobrili recept");
          location.href = "validacija.html";
        } else {
          alert("Greska kod odobravanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
  ObrisiRecept() {
    fetch("https://localhost:5001/Recepti/DeleteRecept/" + this.id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno brisanje");
          location.href = "validacija.html";
        } else {
          alert("Greska kod brisanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
  posaljiRecept() {
    var listaPosalji = [];
    this.namirnice.forEach((element) => {
      listaPosalji.push(element.naziv);
    });
    fetch("https://localhost:5001/Recepti/UnosRecepta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        naziv: this.naziv,
        tekst: this.tekst,
        imgPath: sessionStorage.getItem("image"),
        kcalVrednost: this.kcalVrednost,
        brojPorcija: this.brojPorcija,
        vremePripreme: this.vremePripreme,
        prosecnaOcena: 0,
        namirnice: this.namirnice,
      }),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno dodavanje recepta");
          location.href="user.html";
        } else {
          alert("Greska kod dodavanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
}
