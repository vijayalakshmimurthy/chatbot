import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class  ChatbotService {
     /** variable declaration before service initialize */
  private headers: object;
  constructor(private http: HttpClient) {
    this.headers = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      })
  };
   }
  public get(url: any): Observable<any> {
    return this.http.get(url, this.headers).pipe();
  } 
   /** Call HTTP post method */
   public post(url: string, params: any): Observable<any> {
    return this.http.post<any>(url, JSON.stringify(params), this.headers)
        .pipe(timeout(30000));
}
}
