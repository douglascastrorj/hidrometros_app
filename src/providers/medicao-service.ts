import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import moment from 'moment';

import {Http, Response, Headers, RequestOptions} from "@angular/http";
import { AuthService } from './auth-service';


@Injectable()
export class MedicaoService {

	private api_url: string = "http://192.168.15.223:8080/aquafluxus/medicao/";

	constructor(private http: Http, private auth: AuthService) { 
    }
    
    private createOptions() {
        var headers = new Headers();
		headers.append('Authorization', this.auth.getUserInfo().token);
        let options = {
			headers: headers
        };
        return options
    }
    
    

    public getMedicaoDoHidrometro( id ){
        let url = this.api_url + 'hidrometro/' + id;
        let options = this.createOptions();
        return Observable.create(observer => {
            // At this point make a request to your backend to make a real check!
            this.http.get(url, options)
            .subscribe(
                (response: Response) => {
                    // console.log(response.json())
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