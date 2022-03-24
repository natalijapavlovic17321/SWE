import {user} from "../user.js"
import {recept} from "../recept.js"
export class oceneRec{
    constructor(id,user,recept, ocena){
        this.kontOceneRec=null;
        this.id=id;
        this.user=user;
        this.recept=recept;
        this.ocena=ocena;
    }
    dodajOceneKom(id,user,recept, ocena){
        this.id=id;
        this.user=user;
        this.recept=recept;
        this.ocena=ocena;
    }
    ukloniOceneKom(){
        this.id=null;
        this.user=null;
        this.recept=null;
        this.ocena=null;
        //this.kontOceneRec=null;
    }
}