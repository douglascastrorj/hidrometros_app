import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HidrometroService } from '../../providers/hidrometro-service';


@Component({
  selector: 'page-hidrometros',
  templateUrl: 'hidrometros.html'
})
export class HidrometrosPage {

    public hidrometros:any = [];

	constructor(public navCtrl: NavController, private hidrometroService: HidrometroService) {

	}


	ionViewDidLoad() {

        this.hidrometroService.getHidrometrosUsuario().subscribe( hidrometros => {
            this.hidrometros = hidrometros;
        })
    }
}