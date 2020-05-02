import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  public getTopHeadlines(): Observable<Articles[]> {
    return this.http.get(`http://newsapi.org/v2/top-headlines?country=us&apiKey=921de10cad8d43fba390452e683ef5e1`);
  }
}
