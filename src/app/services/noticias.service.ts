import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadLines, Article } from '../interfaces/Interfaces';
import { Observable } from 'rxjs';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinesPageNumber = 0;
  currentPage: number = 0;
  currentCategory = '';

  constructor(private http: HttpClient) { }

  private execQuery<T>(query: string) {
    query = `${apiUrl}${query}`;
    return this.http.get<T>(query, { headers });
  }

  public getTopHeadlines() {
    this.headLinesPageNumber++;
    return this.execQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&page=${this.headLinesPageNumber}`);
  }

  public getTopHeadLinesByCategory(category: string) {

    if (category === this.currentCategory) {
      this.currentPage++;
    } else {
      this.currentPage = 1;
      this.currentCategory = category;
    }

    return this.execQuery<RespuestaTopHeadLines>(`/top-headlines?country=us&category=${category}&page=${this.currentPage}`);
  }
}
