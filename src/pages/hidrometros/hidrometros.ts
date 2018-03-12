import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HidrometroService } from '../../providers/hidrometro-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { AddHidrometroPage } from './add-hidrometro/add-hidrometro'

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
            refresher.complete();
            // arr.map(person => ({ value: person.id, text: person.name }));
            // this.hidrometros.map( hidrometro.ultimaMediacao => moment(data).format('DD/MM/YYYY HH:mm'))
        })
    }

    presentAddModal() {
        let profileModal = this.modalCtrl.create(AddHidrometroPage, { hidrometroId: -1 });
        profileModal.present();
    }



	ionViewDidLoad() {
        this.doRefresh(null);
    }
}