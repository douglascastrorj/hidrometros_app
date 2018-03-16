import { DateTime } from "ionic-angular";
import * as moment from 'moment';

export class Medicao {

    public valor: number;
    public data: number;

    constructor(valor: number, data: number){
        this.valor = valor;
        this.data = data;
    }

    getData(){
        return moment(this.data).format("DD/MM/YYYY");
    }

    getHora(){
        return moment(this.data).format("HH:mm");
    }




}