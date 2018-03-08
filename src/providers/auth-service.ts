import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response, Headers} from "@angular/http";

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;
  private serverApi: string = "http://localhost:8080/aquafluxus/usuarios/login";

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

    this.testeServer();


    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(access);
        observer.complete();
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