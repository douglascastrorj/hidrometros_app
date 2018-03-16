import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MedicaoService } from '../../providers/medicao-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import {AddMedicaoPage} from './add-medicao/add-medicao'

@Component({
  selector: 'page-medicoes',
  templateUrl: 'medicoes.html'
})
export class MedicoesPage {

    public medicoes:any = [];
    public hidrometro:any = {};

	constructor(public navCtrl: NavController, private params: NavParams, private medicaoService: MedicaoService, public modalCtrl: ModalController) {

    }
    
    doRefresh( refresher ){

    }

    presentAddModal(  ) {
        let profileModal = this.modalCtrl.create(AddMedicaoPage, { hidrometro: this.hidrometro });
        profileModal.present();
    }


	ionViewDidLoad() {
        this.hidrometro = this.params.get('hidrometro')
        this.medicaoService.getMedicaoDoHidrometro(this.hidrometro.id).subscribe( medicoesHidrometro => {
            this.medicoes = medicoesHidrometro.map( med => (
                {
                    valor:med.valor,
                    id: med.id, 
                    dataMedicao: moment(med.medicao).format('DD/MM/YYYY'),
                    horaMedicao: moment(med.medicao).format('HH:mm'),
                }) 
            );
        })
    }
}