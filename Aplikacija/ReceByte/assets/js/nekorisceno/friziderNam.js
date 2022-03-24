import {namirnice} from "../namirnice.js"
import {user} from "../user.js"
export class friziderNam{
    constructor(id,autor,namirnice){
        this.kontFriziderNam=null;
        //this.namirnice=[];
        this.id=id;
        this.autor=autor;
        this.namirnice=namirnice;
    }
    dodajFriziderNam(id,autor,namirnice){
        this.id=id;
        this.autor=autor;
        this.namirnice=namirnice;
    }
    ukloniFriziderNam(){
        this.id=null;
        this.autor=null;
        this.namirnice=null;
        //this.kontFriziderNam=null;
    }
}