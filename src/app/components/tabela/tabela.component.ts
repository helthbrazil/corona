import { Component, OnInit } from '@angular/core';
import { DadosService } from 'src/app/shared/services/dados.service';
import { Estado } from 'src/app/shared/models/estado';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  mostrarLoading = true;

  constructor(private dadosService: DadosService) { }

  displayedColumns: string[] = ['estado', 'casos', 'mortes', 'recuperados'];
  dataSource: Array<Estado>;

  ngOnInit(): void {
    this.dadosService.buscarDadosBrasil().subscribe(res => {
      this.dataSource = new Array<Estado>();
      const dados = res['data'];
      dados.forEach(data => {
        const estado = new Estado();
        estado['deaths'] = data['deaths'];
        estado['datetime'] = data['datetime'];
        estado['cases'] = data['cases'];
        estado['uf'] = data['uf'];
        estado['refuses'] = data['refuses'];
        const estadoNome = estado['uf'].toUpperCase();
        estado['flag'] = `https://devarthurribeiro.github.io/covid19-brazil-api/static/flags/${estadoNome}.png`;
        this.dataSource.push(estado);
      });
      this.mostrarLoading = false;
    });
  }

  getTotal(field: string) {
    return this.dataSource.map(t => t[field]).reduce((acc, value) => acc + value, 0);
  }

}
