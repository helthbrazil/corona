import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private readonly urlDadosGerais = `https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats`;
  private readonly urlDadosPaises = `https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search`;
  private readonly urlDadosBrasil = `https://covid19-brazil-api.now.sh/api/report/v1`;

  constructor(private http: HttpClient) { }

  buscarDadosGerais(): Observable<any> {
    return this.http.get(this.urlDadosGerais);
  }

  buscarDadosBrasil(): Observable<any>{
    return this.http.get(this.urlDadosBrasil);
  }

  buscarDadosPaise(): Observable<any> {
    return this.http.get(this.urlDadosPaises);
  }
}
