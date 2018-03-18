import { DateTime } from "ionic-angular";
import * as moment from 'moment';

export class Medicao {

    public valor: number;
    public medicao: number;
    public insercao: number;
    public hidrometro:any = {
        id: 0
    }

    constructor(valor: number, data: number, hidrometroId: number){
        this.valor = valor;
        this.medicao = data;
        this.insercao = moment().valueOf();
        this.hidrometro.id = hidrometroId;
    }

    getData(){
        return moment(this.medicao).format("DD/MM/YYYY");
    }

    getHora(){
        return moment(this.medicao).format("HH:mm");
    }




}