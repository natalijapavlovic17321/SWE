import {frizider} from "../frizider.js"
export class pUser{
    constructor(id,prijavljen,prijavio){
        this.kontPuser=null;
        this.id=id;
        this.prijavljen=prijavljen;
        this.prijavio=prijavio;
    }
    dodajPuser(id,prijavljen,prijavio){
        this.id=id;
        this.prijavljen=prijavljen;
        this.prijavio=prijavio;
    }
    ukloniPuser(){
        this.id=null;
        this.prijavljen=null;
        this.prijavio=null;
        //this.kontPuser=null;
    }
}