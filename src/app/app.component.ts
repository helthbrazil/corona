import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { DadosService } from './shared/services/dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') public drawer: MatSidenav;
  title = 'corona';
  dataAtualizacao = '';

  constructor(private dadosService: DadosService){

  }
  ngOnInit(): void {
    this.dadosService.buscarDadosBrasil().subscribe(res => {
      this.dataAtualizacao = res['data'][0]['datetime'];
    });
  }

  toogleMenu() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}
