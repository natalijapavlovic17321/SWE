import {recept} from "../recept.js"
import {user} from "../user.js"
export class pRecepti{
    constructor(id,user){
        this.kontPrecepti=null;
        this.id=id;
        this.user=user;
    }
    dodajPrecept(id,user){
        this.id=id;
        this.user=user;
    }
    ukloniPrecept(){
        this.id=null;
        this.user=null;
        //this.kontPrecepti=null;
    }
}