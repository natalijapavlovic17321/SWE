import {recept} from "../recept.js"
import {user} from "../user.js"
export class pKomentari{
    constructor(id,user,komentar){
        this.kontPkomentari=null;
        this.id=id;
        this.user=user;
        this.komentar=komentar;
    }
    dodajPkomentar(id,user,komentar){
        this.id=id;
        this.user=user;
        this.komentar=komentar;
    }
    ukloniPkomentar(){
        this.id=null;
        this.user=null;
        this.komentar=null;
        //this.kontPkomentari=null;
    }
}