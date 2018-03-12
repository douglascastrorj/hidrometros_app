import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { HomePage } from '../home/home';
// import * as moment from 'moment';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loading: Loading;
	registerCredentials = { email: '', password: '' };

	constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { 

		// console.log(moment().format('DD / MM / YYYY'))
	}

	public createAccount() {
		this.nav.push('RegisterPage');
	}

	public forgotPassword(){
		
	}

	public login() {
		this.showLoading()
		this.auth.login(this.registerCredentials).subscribe(allowed => {
			if (allowed) {        
				this.nav.setRoot(HomePage);
			} else {
				this.showError("Por favor verifique se usuário e senha foram digitados corretamente");
			}
		},
		error => {
			this.showError(error);
		});
	}

	showLoading() {
		this.loading = this.loadingCtrl.create({
			content: 'Esepere porfavor...',
			dismissOnPageChange: true
		});
		this.loading.present();
	}

	showError(text) {
		this.loading.dismiss();

		let alert = this.alertCtrl.create({
			title: 'Falha ao conectar',
			subTitle: text,
			buttons: ['OK']
		});
		alert.present();
	}
}