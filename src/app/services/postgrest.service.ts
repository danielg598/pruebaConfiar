import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { postgrest } from '../interfaces/postgrest';

@Injectable({
  providedIn: 'root'
})
export class PostgrestService {

  URL = environment.api


  constructor(private http: HttpClient) { }

  getActors():Observable<any>{
    return this.http.get<any>(`${this.URL}actors`);
  }

  putActors(id:any, actor:postgrest):Observable<any>{
    return this.http.put<any>(`${this.URL}actors/update/${id}`,actor);
  }

  deleteActors(id:any):Observable<any>{
    return this.http.delete<any>(`${this.URL}actors/${id}`);
  }
}
