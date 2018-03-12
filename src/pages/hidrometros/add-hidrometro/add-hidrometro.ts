import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HidrometroService } from '../../../providers/hidrometro-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';


@Component({
  selector: 'add-hidrometro',
  templateUrl: 'add-hidrometro.html'
})
export class AddHidrometroPage {

    hidrometro: any = {
        id: -1,
        nome: '',
        mac:'',
        localidade: { 
            id: -1, 
            nome:'' , 
            logradouro: ''
        }
    };

	constructor(params: NavParams,public navCtrl: NavController, private hidrometroService: HidrometroService) {
        let hidrometro = params.get('hidrometro')

        if( hidrometro != null ){
            this.hidrometroService.getHidrometro(hidrometro.id).subscribe( hidrometro =>{
                this.hidrometro = hidrometro;
                console.log("hidrometro buscado", hidrometro)
            })
        }
	}

   
    fechar(){
        //fecha modal
        console.log("fechar")
        this.navCtrl.pop();
    }

    
    submit() {

        this.hidrometroService.addHidrometro( this.hidrometro ).subscribe( data => {
            console.log(data)
            //fecha modal
            this.navCtrl.pop();
        } , err =>{
            //fecha modal
            console.log(err)
            this.navCtrl.pop();
        })
        
    }

	ionViewDidLoad() {
    }
}