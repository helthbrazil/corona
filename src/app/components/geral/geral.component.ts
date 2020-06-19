import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DadosService } from 'src/app/shared/services/dados.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pais } from 'src/app/shared/models/pais';
import { Estado } from 'src/app/shared/models/estado';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css']
})
export class GeralComponent implements OnInit {

  mostrarLoading = false;
  dados: Array<Pais>;
  registros: Array<Estado>;

  chart = new Chart({

    chart: {
      type: 'pie',
      options3d: {
        enabled: false,
        alpha: 10,
        beta: 10
      }
    },
    exporting: {
      enabled: false
    },
    title: {
      text: 'Proporção de mortes por estado'
    },
    tooltip: {
      pointFormat: '<br>{point.percentage:.1f} %<br>{point.name}: {point.y}'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '%'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        depth: 35,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },

    credits: {
      enabled: false
    }
  });
  constructor(private dadosService: DadosService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.mostrarLoading = true;

    setTimeout(() => {
      this.dadosService.buscarDadosBrasil().subscribe(res => {

        this.registros = new Array<Estado>();
        const registros = res['data'];
        const dados = new Array<any>();

        registros.forEach(registro => {
          const estado = new Estado();
          estado['cases'] = registro['cases'];
          estado['datetime'] = registro['datetime'];
          estado['deaths'] = registro['deaths'];
          estado['refuses'] = registro['refuses'];
          estado['state'] = registro['state'];
          estado['suspects'] = registro['suspects'];
          estado['uf'] = registro['uf'];
          estado['uid'] = registro['uid'];
          dados.push({ name: estado['uf'], y: estado['deaths'] });
        });

        this.chart.addSeries({
          name: 'Mortes',
          data: dados,
          type: undefined
        }, true, true);

        this.registros.forEach(pais => {
          this.chart.addSeries({
            name: pais['state'], data: [pais['deaths']],
            type: 'column'
          }, true, true);

        });

        console.log(this.registros);
        this.mostrarLoading = false;
      }, err => {
        console.error(err);
        this.mostrarLoading = false;
      });
    }, 300);
  }

  formatarValor(valorString: string) {
    const aux = valorString.split(',').join('');
    return parseInt(aux);
  }

}
