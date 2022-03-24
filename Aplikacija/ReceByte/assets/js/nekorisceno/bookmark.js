import {recept} from "./recept.js"
import {user} from "./user.js"
export class bookmark{
    constructor(id,user,recept){
        this.kontBookmark=null;
        this.id=id;
        this.user=user;
        this.recept=recept;
    }
    dodajBookmark(id,user,recept){
        this.id=id;
        this.user=user;
        this.recept=recept;
    }
    ukloniBookmark(){
        this.id=null;
        this.user=null;
        this.recept=null;
        //this.kontBookmark=null;
    }
}