import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { AuthService } from './auth-service';


@Injectable()
export class HidrometroService {

	private api_url: string = "http://192.168.15.223:8080/aquafluxus/hidrometros/";

	constructor(private http: Http, private auth: AuthService) { 
    }
    
    
	public getHidrometrosUsuario(){
       
        if( !this.auth.getUserInfo() ) {
            return  Observable.create(observer => {
                observer.next([]);
                observer.complete();
            })
        }

		var headers = new Headers();
		headers.append('Authorization', this.auth.getUserInfo().token);
        let options = {
			headers: headers
        };
        // api/usuario/idUsuario?ultimamedicao=true ou false
        let url = this.api_url + 'usuario/' + this.auth.getUserInfo().id +"?ultimaMedicao=false";
        return Observable.create(observer => {
            // At this point make a request to your backend to make a real check!
            this.http.get(url, options)
            .subscribe(
                (response: Response) => {
                    console.log(response.json())
                    observer.next(response.json());
                    observer.complete();
                }
            , (err:any) => {
                observer.next(false);
                observer.complete();
            })	
        })
	}


}