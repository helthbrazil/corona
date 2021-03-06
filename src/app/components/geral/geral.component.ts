import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DadosService } from 'src/app/shared/services/dados.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Pais } from 'src/app/shared/models/pais';
import { Estado } from 'src/app/shared/models/estado';
import * as moment from 'moment';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.component.html',
  styleUrls: ['./geral.component.css']
})
export class GeralComponent implements OnInit {

  dataInicial = '20200317';
  mostrarLoading = false;
  dados: Array<Pais>;
  registros: Array<Estado>;

  chartCrescimento = new Chart({

    chart: {
      type: 'line',
      zoomType: "x",
      animation: true
    },
    exporting: {
      enabled: false
    },
    legend: {
      itemMarginBottom: 5,
      shadow: false
    },
    title: {
      text: 'Curva de mortes'
    },
    tooltip: {
      pointFormat: '{point.y}'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '%'
      }
    },
    xAxis: {
      categories: this.formatarCategoria(this.getDates(this.dataInicial))
    },
    yAxis: {
      title: {
        text: 'Mortes'
      }
    },
    credits: {
      enabled: false
    }
  });

  chartDiario = new Chart({

    chart: {
      type: 'line',
      zoomType: "x",
      animation: true
    },
    exporting: {
      enabled: false
    },
    legend: {
      itemMarginBottom: 5,
      shadow: false
    },
    title: {
      text: 'Mortes diarias Brasil'
    },
    tooltip: {
      pointFormat: '{point.y}'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '%'
      }
    },
    xAxis: {
      categories: this.formatarCategoria(this.getDates(this.dataInicial))
    },
    yAxis: {
      title: {
        text: 'Mortes'
      }
    },
    credits: {
      enabled: false
    }
  });

  chartCrescimentoBrasil = new Chart({

    chart: {
      type: 'line',
      zoomType: "x",
      animation: true
    },
    exporting: {
      enabled: false
    },
    legend: {
      itemMarginBottom: 5,
      shadow: false
    },
    title: {
      text: 'Curva de mortes Brasil'
    },
    tooltip: {
      pointFormat: '{point.y}'
    },
    accessibility: {
      point: {
        valueDescriptionFormat: '%'
      }
    },
    xAxis: {
      categories: this.formatarCategoria(this.getDates(this.dataInicial))
    },
    yAxis: {
      title: {
        text: 'Mortes'
      }
    },
    credits: {
      enabled: false
    }
  });

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
    const dias = this.getDates(this.dataInicial);
    const arrayObservable = new Array<Observable<any>>();

    dias.forEach(dia => {
      arrayObservable.push(this.dadosService.buscarDadosPorData(dia));
    });

    forkJoin(arrayObservable).subscribe(res => {

      this.popularDadosGerais(res);

      const dados = new Array<any>();
      res.forEach(item => {
        dados.push(item['data']);
      });

      const estados = new Array<any>();
      dados[0].forEach(element => {
        if (!estados.some(item => item['name'] === element['uf'])) {
          estados.push({ name: element['uf'], data: [] });
        }
      });

      estados.forEach(objEstado => {
        dados.forEach(dado => {
          const dadosEstado = dado.filter(item => item['uf'] === objEstado['name']);
          if (dadosEstado.length > 0) {
            objEstado['data'].push(dadosEstado[0]['deaths']);
          } else {
            objEstado['data'].push(objEstado['data'][objEstado['data'].length - 1]);
          }
          // console.log(dadosEstado);
        });
      });

      // console.log(estados);

      for (let i = 0; i < estados.length; i++) {
        const uf = estados[i]['name'];
        let visivel = false;
        if (uf === 'MG') {
          visivel = true;
        }
        if (i === estados.length - 1) {
          this.chartCrescimento.addSeries({
            name: estados[i]['name'],
            data: estados[i]['data'],
            visible: visivel,
            type: "line"
          }, true, false);
        } else {
          this.chartCrescimento.addSeries({
            name: estados[i]['name'],
            data: estados[i]['data'],
            visible: visivel,
            type: "line"
          }, false, false);
        }
      }
    });

    this.mostrarLoading = true;

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
  }

  popularDadosGerais(res: any) {
    debugger
    const dados = new Array<any>();
    res.forEach(item => {
      dados.push(item['data']);
    });

    // console.log(dados);
    const mortes = new Array<any>();
    const mortesDiaria = new Array();
    let anterior = 0;

    dados.forEach(item => {
      let sum = 0;
      item.forEach(estado => {
        sum += estado['deaths'];
      });
      if (sum !== 0) {
        mortes.push(sum);
      } else {
        mortes.push(anterior);
      }
      anterior = mortes[mortes.length - 1];
    });

    let somaAnterior = 0;
    for (let index = 0; index < dados.length; index++) {
      const item = dados[index];
      if (item.length == 0) {
        mortesDiaria.push(0);
      } else {
        let sum = 0;
        item.forEach(estado => {
          sum += estado['deaths'];
        });

        if (index === 0) {
          mortesDiaria.push(sum);
        } else {
          let somaDiaria = (sum - somaAnterior);
          if (somaDiaria > 0) {
            mortesDiaria.push(sum - somaAnterior);
          } else {
            mortesDiaria.push(0);
          }
        }
        somaAnterior = sum;
      }
    }

    // VALIDAÇÃO
    const sum = mortesDiaria.filter((valor: number) => valor > 0)
      .reduce((sum: number, b: number) => sum + b, 0);

    this.chartDiario.addSeries({
      type: "line",
      name: 'Brasil',
      data: mortesDiaria
    }, true, true);

    this.chartCrescimentoBrasil.addSeries({
      type: "line",
      name: 'Brasil',
      data: mortes
    }, true, true);

  }

  getDates(startDate, stopDate?) {
    var dateArray = [];
    var currentDate = moment(startDate);
    if (!stopDate) {
      stopDate = moment(stopDate);
    }
    while (currentDate <= stopDate) {
      dateArray.push(moment(currentDate).format('YYYYMMDD'))
      currentDate = moment(currentDate).add(1, 'days');
    }
    return dateArray;
  }

  formatarCategoria(dateArray: Array<string>) {
    const dates = new Array<string>();
    dateArray.forEach((item: string) => {
      const data = `${item.substring(6, 8)}/${item.substring(4, 6)}/${item.substring(0, 4)}`;
      dates.push(data);
    });

    return dates;
  }

  formatarValor(valorString: string) {
    const aux = valorString.split(',').join('');
    return parseInt(aux);
  }

}
