import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { MedicaoService } from '../../../providers/medicao-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { Medicao } from '../../../models/medicao';
import { DatePicker } from '@ionic-native/date-picker';


@Component({
  selector: 'add-medicao',
  templateUrl: 'add-medicao.html'
})
export class AddMedicaoPage {

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

    public medicao:any = {};

	constructor(params: NavParams,public navCtrl: NavController, private medicaoService: MedicaoService, private datePicker: DatePicker) {
        this.hidrometro = params.get('hidrometro')
	}

   
    fechar(){
        //fecha modal
        console.log("fechar")
        this.navCtrl.pop();
    }

    showDatePicker(){
        
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
        );
    }

    showHourPicker(){
        
        this.datePicker.show({
            date: new Date(),
            mode: 'time',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(
            date => console.log('Got date: ', date),
            err => console.log('Error occurred while getting date: ', err)
        );
    }
    
    submit() {
        
    }

	ionViewDidLoad() {
    }
}