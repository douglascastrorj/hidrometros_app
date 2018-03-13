import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HidrometroService } from '../../providers/hidrometro-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { AddHidrometroPage } from './add-hidrometro/add-hidrometro'
import { MedicoesPage } from '../medicoes/medicoes'

@Component({
  selector: 'page-hidrometros',
  templateUrl: 'hidrometros.html'
})
export class HidrometrosPage {

    public hidrometros:any = [];

	constructor(public navCtrl: NavController, private hidrometroService: HidrometroService, public modalCtrl: ModalController) {

    }
    
    doRefresh( refresher ){

        this.hidrometroService.getHidrometrosUsuario().subscribe( hidrometros => {
            this.hidrometros = hidrometros.map( hidrometro => (
                {
                    nome:hidrometro.nome,
                    id: hidrometro.id, 
                    ultimaMedicao: moment(hidrometro.ultimaMedicao).format('DD/MM/YYYY HH:mm') !=  "Invalid date"? moment(hidrometro.ultimaMedicao).format('DD/MM/YYYY HH:mm'): "Não há medições" ,
                    localidade: hidrometro.localidade
                }) 
            );

            if(refresher != null){
                refresher.complete();
            }
        })
    }

    showMedicoes( hidrometro ){
        this.navCtrl.push(MedicoesPage, {idHidrometro: hidrometro.id});
    }

    presentAddModal() {
        let profileModal = this.modalCtrl.create(AddHidrometroPage, { hidrometro: null });
        profileModal.present();
    }

    editar(hidrometro){
        let profileModal = this.modalCtrl.create(AddHidrometroPage, { hidrometro: hidrometro });
        profileModal.present();
    }


	ionViewDidLoad() {
        this.hidrometroService.getHidrometrosUsuario().subscribe( hidrometros => {
            this.hidrometros = hidrometros.map( hidrometro => (
                {
                    nome:hidrometro.nome,
                    id: hidrometro.id, 
                    ultimaMedicao: moment(hidrometro.ultimaMedicao).format('DD/MM/YYYY HH:mm') !=  "Invalid date"? moment(hidrometro.ultimaMedicao).format('DD/MM/YYYY HH:mm'): "Não há medições" ,
                    localidade: hidrometro.localidade
                }) 
            );
        })
    }
}