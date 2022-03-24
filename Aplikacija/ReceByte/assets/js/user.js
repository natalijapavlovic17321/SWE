import { friziderNam } from "./nekorisceno/friziderNam.js"
import { namirnice } from "./namirnice.js";
import { recept } from "./recept.js";

export class user {
    constructor(id, username, ime, prezime, email, opis, privilegija, frizider) {
        this.kontUser = null;
        //this.recepti=[]; svi njegovi
        this.id = id;
        this.frizider = frizider;
        this.ime = ime;
        this.prezime = prezime;
        this.username = username;
        this.email = email;
        this.opis = opis;
        this.privilegija = privilegija;
        this.friziderNam = [];
    }
    crtajUser() {
        const host = document.getElementById('bodyUser')
        if (!host)
            throw new Error("Greska u hostu");

        this.crtajUserHTML(document.getElementById("mainUser"));
        this.crtajFrizider(document.getElementById("friziderUser"));
    }
    crtajUserHTML(host) {
        document.getElementById("usernameUser").innerHTML = this.username;
        document.getElementById("imeUser").innerHTML = this.ime + " " +this.prezime;
        // document.getElementById("prezimeUser").innerHTML = this.prezime;
        document.getElementById("emailUser").innerHTML = this.email;
        document.getElementById("opisUser").innerHTML = this.opis;

    }
    crtajFrizider(host) {
        this.friziderNam.forEach(namirnica => {
            namirnica.crtajNamirnicuUser(host);

        })
    }

    dodajNamirnicu(friziderNam1) {
        this.friziderNam.push(friziderNam1);
    }
    dodajUser(id, username, ime, prezime, email, opis, privilegija, frizider) {
        this.id = id;
        this.frizider = frizider;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.username = username;
        this.opis = opis;
        this.privilegija = privilegija;
    }
    ukloniUser() {
        this.id = null;
        this.username = null;
        this.frizider = null;
        this.ime = null;
        this.prezime = null;
        this.opis = null;
        this.email = null;
        this.privilegija = null;
        this.friziderNam = null;
        //this.kontUser=null;
    }
    osveziPrikazFrizidera(idNam,uslov){
        document.getElementById("Voce").innerHTML = "";
        document.getElementById("Povrce").innerHTML = "";
        document.getElementById("Meso/Riba:").innerHTML = "";
        document.getElementById("Zitarice").innerHTML = "";
        document.getElementById("Mlecni proizvodi").innerHTML = "";
        document.getElementById("Ostalo").innerHTML = "";
        this.friziderNam=[];
        this.preuzmiNamirnice();
    }
    crtajPrivilegija(host) {
        var row1 = document.createElement("div");
        row1.classList.add("row");


        var naz = document.createElement("div");
        naz.classList.add("col-lg-6");
        naz.classList.add("col-sm-6");
        naz.classList.add("col-md-6");
        var ime = document.createElement("label");
        ime.classList.add("title-d");
        ime.innerHTML = this.username;
        naz.appendChild(ime);


        var dugmici = document.createElement("div");
        dugmici.classList.add("col-lg-6");
        dugmici.classList.add("col-sm-6");
        dugmici.classList.add("col-md-6");

        var pogled = document.createElement("button");
        pogled.classList.add("btn");
        pogled.classList.add("btn-a");
        pogled.innerHTML = "Daj privilegiju";
        dugmici.appendChild(pogled);

        row1.appendChild(naz);
        row1.appendChild(dugmici);
        host.appendChild(row1);


    }
    preuzmiNamirnice() {
        fetch("https://localhost:5001/User/getNamirniceFromFrizider", {
            method: "GET",
            headers: {
                //"Content-Type": "application/json",
                "accept": "text/plain",
                "Authorization": "Bearer " + sessionStorage.getItem("token") 
            },
        }).then(p => {
            p.json().then(data => {
                data.forEach(element => {
                    var p1 = new namirnice();
                    p1.id = element.id;
                    p1.naziv = element.naziv;
                    p1.vrsta=element.vrsta;
                    p1.kcalVrednost = element.kcalVrednost;
                    this.dodajNamirnicu(p1);
                });
                this.crtajFrizider(document.getElementById("friziderUser"));
            });
        });
    }
    ubaciNamirnicu(namirnica) {
        fetch("https://localhost:5001/User/postNamirniceInFrizider/" + namirnica, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
            })
        }).then(p => {
            if (p.ok) {
                alert("Uspesno dodavanje namirnice")
            }
            else {
                alert("Greska kod dodavanja");
            }
        }).catch(p => {
            alert("Greška sa konekcijom.");
        });
    }
    register(username, email, prezime, ime, opis, password, confirmPassword) {
        fetch("https://localhost:5001/Account/Register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: username,
                email: email,
                password: password,
                confirmPassword: confirmPassword,
                name: ime,
                lastName: prezime,
                description: opis
            })
        }).then(p => p.json())
        .then(p => {
            if (p.succeeded == true) {
                alert("Sada se prijavite sa unetim podacima")
            }
            else
            {
                var err =[];
                for(let i =0 ; i < p.errors.length; i++)
                {
                    err.push(p.errors[i].description);
                }
                alert(err);
            }
    
        }).catch(p => {
            alert("Greska");
        });
    }
    login(usern, pass) {
        fetch("https://localhost:5001/Account/Login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userName: usern,
                password: pass
            })
        }).then(response => response.json())
            .then(data => {
                if(data.title=="Unauthorized")
                alert("Lose korisnicko ime ili sifra.");
                else  {
                sessionStorage.setItem("username", usern);
                sessionStorage.setItem("token", data.token);
                location.href = "user.html";
                  }
            }).catch(error => console.error('Greska sa prijavljivanjem', error));
        //           //axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.token;
        //             http.defaults.headers.common.Authorization='Bearer ' + response.token;
    }
    zahtevajPrivilegiju() {
        fetch("https://localhost:5001/Account/zahtevajPrivilegiju", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
            })
        }).then(p => {
            if (p.ok) {
                alert("Uspesno poslat zahtev");
            }
            else {
                alert("Greska");
            }
        }).catch(p => {
            alert("Greška sa konekcijom.");
        });
    }
    odobriPrivilegiju(username2) {
        fetch("https://localhost:5001/Account/odobriPrivilegiju/" + username2, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
            })
        }).then(p => {
            if (p.ok) {
                alert("Uspesno prihvacen zahtev");
            }
            else {
                alert("Greska");
            }
        }).catch(p => {
            alert("Greška sa konekcijom.");
        });
    }
    odobriRecept(recept) {
        fetch("https://localhost:5001/Account/odobriRecept/" + recept, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
            })
        }).then(p => {
            if (p.ok) {
                alert("Uspesno prihvacen recept");
            }
            else {
                alert("Greska");
            }
        }).catch(p => {
            alert("Greška sa konekcijom.");
        });
    }
    preuzmiBookmark() {
        var book = [];
        fetch("https://localhost:5001/Account/getBookmark", {
            method: "GET",
            headers: {
                //"Content-Type": "application/json",
                "accept": "text/plain",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
        }).then(p => {
            p.json().then(data => {
                data.forEach(element => {
                    var p1 = new recept(element.naziv, element.tekst, element.imgPath, element.id, element.kcalVrednost, element.brojPorcija, element.autor, element.prosecnaOcena);
                    this.book.push(p1);
                });
            });
        });
        return book;
    }
    getInfo(){
        fetch("https://localhost:5001/Account/UserInformation", {
            method: "GET",
            headers: {
                //"Content-Type": "application/json",
                "accept": "text/plain",
                "Authorization": "Bearer " + sessionStorage.getItem("token") 
            },
        }).then(p => {
            p.json().then(data => {
                this.username=data.userName;
                this.email=data.email;
                this.ime=data.name;
                this.prezime=data.lastName;
                this.opis=data.description;
                this.privilegija=data.role[0];
                this.crtajUserHTML(document.getElementById("mainUser"));
            });
        });
    }
    //uslov je 0 za ndisplay a 1 za pristup stranici
    getRolePrivilegovani(uslov){
        fetch("https://localhost:5001/Account/UserInformation", {
            method: "GET",
            headers: {
                //"Content-Type": "application/json",
                "accept": "text/plain",
                "Authorization": "Bearer " + sessionStorage.getItem("token") 
            },
        }).then(p => {
            p.json().then(data => {
              this.privilegija=data.role[0];
              if(data.role[0]=="Prijavljeni" )
                {
                    if(uslov===1)
                    {
                    alert("Niste privilegovani korisnik. Ova opcija vam je onemogucena! Za privilegiju posaljite adminu mejl na admin@recebyte.com");
                    location.href="user.html"
                    }
                    else
                    {
                       document.getElementById("validacijaPriv").style.display = "none";
                    }
                }
            });
        });
    }
    getRoleAdmin(uslov){
        fetch("https://localhost:5001/Account/UserInformation", {
            method: "GET",
            headers: {
                //"Content-Type": "application/json",
                "accept": "text/plain",
                "Authorization": "Bearer " + sessionStorage.getItem("token") 
            },
        }).then(p => {
            p.json().then(data => {
              this.privilegija=data.role[0];
              if(data.role[0]=="Prijavljeni" || data.role[0]=="Privilegovani" )
                {
                    if(uslov===1)
                    {
                    alert("Niste admin. Ova opcija vam je onemogucena!");
                    location.href="user.html"
                    }
                    else{
                       document.getElementById("dodavanjeAdmin").style.display = "none";
                    }
                }
            });
        });
    }
    preuzmiNamirniceKorisnika(){
            fetch("https://localhost:5001/User/getNamirniceFromFrizider", {
                method: "GET",
                headers: {
                    //"Content-Type": "application/json",
                    "accept": "text/plain",
                    "Authorization": "Bearer " + sessionStorage.getItem("token") 
                },
            }).then(p => {
                p.json().then(data => {
                    data.forEach(element => {
                        var p1 = new namirnice();
                        p1.id = element.id;
                        p1.naziv = element.naziv;
                        p1.vrsta=element.vrsta;
                        p1.kcalVrednost = element.kcalVrednost;
                        this.dodajNamirnicu(p1);
                    });
                });
            });
        }
}