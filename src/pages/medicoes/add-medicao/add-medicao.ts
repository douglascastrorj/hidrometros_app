import { Component, ViewChild } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { MedicaoService } from '../../../providers/medicao-service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { Medicao } from '../../../models/medicao';
import { DatePicker } from '@ionic-native/date-picker';
import { AlertController } from 'ionic-angular';


@Component({
	selector: 'add-medicao',
	templateUrl: 'add-medicao.html'
})
export class AddMedicaoPage {

	hidrometro: any = {
		id: null,
		nome: '',
		mac: '',
		localidade: {
			id: -1,
			nome: '',
			logradouro: ''
		}
	};

	public medicao: any = {};

	constructor(params: NavParams, public navCtrl: NavController, private medicaoService: MedicaoService, private datePicker: DatePicker, private alertCtrl: AlertController) {
		this.hidrometro = params.get('hidrometro')
	}


	fechar() {
		//fecha modal
		console.log("fechar")
		this.navCtrl.pop();
	}

	showDatePicker() {

		this.datePicker.show({
			date: new Date(),
			mode: 'date',
			androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
		}).then(
			date => {
				//console.log('Got date: ', date)
				this.medicao.data = moment(date).format('DD/MM/YYYY');
			},
			err => console.log('Error occurred while getting date: ', err)
		);
	}

	showHourPicker() {

		this.datePicker.show({
			date: new Date(),
			mode: 'time',
			androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
		}).then(
			date => {
				//console.log('Got date: ', date)
				this.medicao.hora = moment(date).format('HH:mm')
			},
			err => console.log('Error occurred while getting date: ', err)
		);
	}

	presentAlert() {
		let alert = this.alertCtrl.create({
			title: 'Falha ao inserir medição',
			subTitle: 'Servidor indisponível no momento, tente novamente mais tarde.',
			buttons: [{
				text: 'Ok',
				handler: () => {
					this.fechar();
				}
			}]
		});
		alert.present();
	}

	submit() {

		let data = moment(this.medicao.data + this.medicao.hora, "DD/MM/YYYYHH:mm").valueOf()
		let med = new Medicao(this.medicao.valor, data, this.hidrometro.id);

		this.medicaoService.addMedicao(med).subscribe(
			data => {
				console.log("foi");
				this.navCtrl.pop();
			},
			err => {
				console.log(err);
				this.presentAlert()
			});
	}

	ionViewDidLoad() {
	}
}