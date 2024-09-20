import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MySqlService {

  URL = environment.api


  constructor(private http: HttpClient) { }

  getCities():Observable<any>{
    return this.http.get<any>(`${this.URL}cities`);
  }
}
