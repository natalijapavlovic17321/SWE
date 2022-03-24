import {recept} from "./recept.js"
import {namirnice} from "./namirnice.js"
export class recNamirnice{
    constructor(id,recept,namirnice){
        this.kontRecnamirnice=null;
        this.id=id;
        this.recept=recept;
        this.namirnice=namirnice;
    }
    dodajRecNamirnicu(id,recept,namirnice){
        this.id=id;
        this.recept=recept;
        this.namirnice=namirnice;
    }
    ukoniRecNamirnicu(){
        this.id=null;
        this.recept=null;
        this.namirnice=null;
        //this.kontRecnamirnice=null;
    }
}