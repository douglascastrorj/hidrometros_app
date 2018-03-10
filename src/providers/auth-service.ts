import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Http, Response, Headers} from "@angular/http";

export class User {
	id: number;
	nome: string;
	email: string;
	perfil: string;
	tipo:any;
	token: string;

	constructor(id:number, nome: string, email: string, perfil: string, tipo: any, token: string) {
		this.nome = nome;
		this.email = email;
		this.id = id;
		this.perfil = perfil;
		this.tipo = tipo;
		this.token = token;
	}
}

@Injectable()
export class AuthService {

	currentUser: User;
	private serverApi: string = "http://192.168.15.223:8080/aquafluxus/usuarios/login";

	constructor(private http: Http) { 
	}

	public testeServer(){

		// let body = {
		// 	login: "cliente@gmail.com",
		// 	password: "123"
		// }
		let body = new URLSearchParams();
		body.set('login', "cliente@gmail.com");
		body.set('password', "123");

		var headers = new Headers();

		headers.append('Content-Type', 'application/x-www-form-urlencoded');
			let options = {
			headers: headers
		};

		// this.http.get("https://swapi.co/api/planets/1" )
		// 		.subscribe((response: Response) => {
		// 			console.log("testando get", response.json().name);
		// 		})	

		this.http.post(this.serverApi, body.toString(), options)
		.subscribe((response: Response) => {
			console.log(response.json())

			var token = response.headers.get("authorization")
			console.log(token)
		})	
	}

	public login(credentials) {

		if (credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {

			//criando request
			let body = new URLSearchParams();
			body.set('login', credentials.email);
			body.set('password', credentials.password);

			var headers = new Headers();
			headers.append('Content-Type', 'application/x-www-form-urlencoded');
				let options = {
				headers: headers
			};

			return Observable.create(observer => {
				// At this point make a request to your backend to make a real check!
				
				this.http.post(this.serverApi, body.toString(), options)
				.subscribe(
					(response: Response) => {
						console.log("Response recebido:",response.json())

						var token = response.headers.get("authorization")
						console.log("token ",token)

						let user = response.json();
						this.currentUser = new User(user.id, user.nome, user.email, user.perfil, user.tipo, token);

						observer.next(true);
						observer.complete();
						
					}, 
					(err :any) => {
						console.log("deu ruim", err)
						observer.next(false);
						observer.complete();
					}
				)
				// this.currentUser = new User('Simon', 'saimon@devdactic.com');
				
				
			});
		}
	}

	public register(credentials) {
		if (credentials.email === null || credentials.password === null) {
			return Observable.throw("Please insert credentials");
		} else {
		// At this point store the credentials to your backend!
			return Observable.create(observer => {
				observer.next(true);
				observer.complete();
			});
		}
	}

	public getUserInfo() : User {
		return this.currentUser;
	}

	public logout() {
		return Observable.create(observer => {
			this.currentUser = null;
			observer.next(true);
			observer.complete();
		});
	}
}