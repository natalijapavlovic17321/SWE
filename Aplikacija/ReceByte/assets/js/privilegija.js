import { user } from "./user.js";
export class privilegija {
  constructor() {
    this.kontPrivilegija = null;
    this.privilegija = [];
  }
  crtajUser() {
    const host = document.getElementById("mainPrivilegija");
    if (!host) throw new Error("Greska u hostu");
    this.privilegija.forEach((user) => {
      user.crtajPrivilegija(host);
    });
  }
  dodajUser(user) {
    this.privilegija.push(user);
  }

  odobriPrivilegiju(username2) {
    fetch("https://localhost:5001/Account/promoteMember/" + username2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({}),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno prihvacen zahtev");
        } else {
          alert("Greska");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }

  dodajNamirnice(n,v,k) {
    fetch("https://localhost:5001/Recepti/postNamirnice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        naziv: n,
        vrsta:v,
        kcalVrednost:k
      }),
    })
      .then((p) => {
        if (p.ok) {
          alert("Uspesno dodavanje");
        } else {
          alert("Greska kod dodavanja");
        }
      })
      .catch((p) => {
        alert("Greška sa konekcijom.");
      });
  }
}
