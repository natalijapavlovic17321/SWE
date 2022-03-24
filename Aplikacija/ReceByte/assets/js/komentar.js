import {recept} from "./recept.js"
import {user} from "./user.js"
export class komentar{
    constructor(id,tekst,autor,recept,ocena){
        this.kontKomentar=document.getElementById("komentariRecept");
        this.id=id;
        this.autor=autor;
        this.recept=recept;
        this.tekst=tekst;
        this.ocena=ocena;
    }
    crtajKomentar(host){
        if(!host)
       throw new Error("Greska u hostu");

       
      var glavniDiv = document.createElement("div");
glavniDiv.classList.add("round");
host.appendChild(glavniDiv);

      
       var et = document.createElement("label");
       et.innerHTML="@"
       et.classList.add("autor");
         var nazivAutora = document.createElement("label");
         nazivAutora.classList.add("comment-author");
         nazivAutora.classList.add("autor");
         nazivAutora.innerHTML=this.autor;
         glavniDiv.appendChild(et);
         glavniDiv.appendChild(nazivAutora);
  
         const sadrzajKomentara = document.createElement("div");
         sadrzajKomentara.classList.add("comment-description");
         sadrzajKomentara.classList.add("komentar");
         sadrzajKomentara.innerHTML=this.tekst;
          glavniDiv.appendChild(sadrzajKomentara);

            var tab=document.createElement("label");
          tab.innerHTML="   ";
          var brojLajkova = document.createElement("label");
          brojLajkova.classList.add("like");
          brojLajkova.innerHTML=this.ocena;
          glavniDiv.appendChild(tab);
          glavniDiv.appendChild(brojLajkova);
          glavniDiv.appendChild(tab);
          const like = document.createElement("button");
          if(sessionStorage.getItem("token")==null || sessionStorage.getItem("token")=="")
          {
          like.className="hide";
          }
          else like.className="like";
          like.innerHTML="  &#128077;";
          glavniDiv.appendChild(like);
          like.onclick=(ev)=>{
              this.posaljiOcenuKomentara(like,brojLajkova);
          }
          
          const p = document.createElement("p");
          glavniDiv.appendChild(p);
  
      }
    noviKomentar(){
        this.tekst=document.getElementById("inputUsernameRecept").value;
        this.autor=document.getElementById("inputKomentarRecept").value;
    }
    dodajKomentar(id,tekst,autor,recept,ocena){
        this.id=id;
        this.autor=autor;
        this.recept=recept;
        this.tekst=tekst;
        this.ocena=ocena;
    }
    ukloniKomentar(){
        this.id=null;
        this.autor=null;
        this.recept=null;
        this.tekst=null;
        this.ocena=null;
        //this.kontFrizider=null;
    }
    posaljiOcenuKomentara(like,brojLajkova){
        fetch("https://localhost:5001/Recepti/PostOcenaKomentara/" + this.id, {
                method: "POST",
                headers: {
                   "Content-Type": "application/json",
                   "Authorization": "Bearer " + sessionStorage.getItem("token")
                },
                body: JSON.stringify({
                 
                })
            }).then(p => {
                if (p.ok) {
                    brojLajkova.innerHTML=this.ocena+1;
                    like.className="hide";
                }
                else {
                    alert("Vec ste ocenili ovaj recept!");
                }
            }).catch(p => {
                alert("Greška sa konekcijom.");
            });
    }
}