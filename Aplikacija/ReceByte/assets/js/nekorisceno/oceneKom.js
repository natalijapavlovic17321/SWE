import {komentar} from "../komentar.js"
import {user} from "../user.js"
import {recept} from "../recept.js"
export class oceneKom{
    constructor(id,user,komentar, ocena){
        this.kontOceneKom=null;
        this.id=id;
        this.user=user;
        this.komentar=komentar;
        this.ocena=ocena;
    }
    dodajOceneKom(id,user,komentar, ocena){
        this.id=id;
        this.user=user;
        this.komentar=komentar;
        this.ocena=ocena;
    }
    ukloniOceneKom(){
        this.id=null;
        this.user=null;
        this.komentar=null;
        this.ocena=null;
        //this.kontOceneKom=null;
    }
}