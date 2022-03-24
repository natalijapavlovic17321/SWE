import {friziderNam} from "./friziderNam.js"
import {user} from "../user.js"
export class frizider{
    constructor(id,autor){
        this.kontFrizider=null;
        //this.namirnice=[];
        this.id=id;
        this.autor=autor;
        this.frizideri=[];
    }
    dodajFrizider(id,autor){
        this.id=id;
        this.autor=autor;
    }
    ukloniFrizider(){
        this.id=null;
        this.autor=null;
        this.frizideri=null;
        //this.kontFrizider=null;
    }
    dodajFriziderNam(frizideri){
        this.frizideri.push(frizideri);
        // ili po imenu/id-ju
    }
    ukloniFriziderNam(frizideri){
        this.frizideri.pop(frizideri);
        // ili po imenu/id-ju
    }
}