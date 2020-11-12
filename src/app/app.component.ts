import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  chart;
  label: string = '#no of votes';
  type: string;
  @ViewChild('chartimage') chartcanvas: ElementRef;
  setGraph(graphType: string) {
    this.type = graphType;
    this.drawGraph();
  }

  drawGraph() {
    if (this.chart) this.chart.destroy();
    this.chart = new Chart('myChart', {
      type: this.type,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: this.label,
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
  ngOnInit(): void {}
  downloadImage() {
    var image = this.chartcanvas.nativeElement
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream'); // here is the most important part because if you dont replace you will get a DOM 18 exception.

    var link = document.getElementById('link');
    link.setAttribute('download', `${this.label}(${this.type}).png`);
    link.setAttribute('href', image);
    link.click();
  }
}
