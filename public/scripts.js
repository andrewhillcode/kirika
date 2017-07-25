var canvas = document.getElementById('chart');

var colour1 = '#3fb8ff';
var colour2 = '#ff3f40';

new Chart(canvas, {
  type: 'line',
  data: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
        {
            label: 'A',
            yAxisID: 'A',
            fill: false,
            borderColor: colour1,
            strokeColor: colour1,
            pointColor: colour1,
            pointStrokeColor: colour1,
            pointHighlightFill: colour1,
            pointHighlightStroke: colour1,
            backgroundColor: colour1,
            data: [7.22, 7.29, 7.43, 7.53, 7.59, 7.64, 7.68, 7.73, 7.74, 7.78, 7.82, 8.34 ]
        }, {
            label: 'B',
            yAxisID: 'B',
            fill: false,
            borderColor: colour2,
            strokeColor: colour2,
            pointColor: colour2,
            pointStrokeColor: colour2,
            pointHighlightFill: colour2,
            pointHighlightStroke: colour2,
            backgroundColor: colour2,
            data: [7.22, 7.29, 7.43, 7.53, 7.59, 7.64, 7.68, 7.73, 7.74, 7.78, 7.82, 8.34 ]
        }]
    },
    options: {
        scales: {
            xAxes: [
                {}, 
                {
                    gridLines: {
                        color: "#262a2c"
                    }
                }
            ],
            yAxes: [
                {
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    gridLines: {
                        display:false,
                        color: "#262a2c"
                    }   
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'left',
                    gridLines: {
                      color: "#262a2c"
                    },
                    ticks: {
                      max: 10,
                      min: 1
                    }
                }
            ]
        }
    }
});
