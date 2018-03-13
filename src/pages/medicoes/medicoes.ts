import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { MedicaoService } from '../../providers/medicao-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Component({
  selector: 'page-medicoes',
  templateUrl: 'medicoes.html'
})
export class MedicoesPage {

    public medicoes:any = [];

	constructor(public navCtrl: NavController, private params: NavParams, private medicaoService: MedicaoService, public modalCtrl: ModalController) {

    }
    
    doRefresh( refresher ){

    }

    presentAddModal() {
        // let profileModal = this.modalCtrl.create(AddHidrometroPage, { hidrometro: null });
        // profileModal.present();
    }

    editar(medicao){
        // let profileModal = this.modalCtrl.create(AddHidrometroPage, { hidrometro: hidrometro });
        // profileModal.present();
    }


	ionViewDidLoad() {
        let idHidrometro = this.params.get('idHidrometro')
        this.medicaoService.getMedicaoDoHidrometro(idHidrometro).subscribe( medicoesHidrometro => {
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