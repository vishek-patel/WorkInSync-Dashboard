import { fetchData } from "./common-functions.mjs";

export const stack_chart = async () => {
    const { data1, data2, data3 } = await fetchData("https://stack-chart.free.beeceptor.com/my/api/stack-chart")
    console.log(data1, data2, data3);
    Highcharts.chart('container', {
        chart: {
            type: 'column',
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Roboto'
            },
            spacingBottom: 0,
            spacingTop: 0,
            spacingLeft: 0,
            spacingRight: 0,
            plotBorderWidth: 0,
            plotShadow: false,
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            margin: [0, 0, 0, 0],

        },
        title: {
            text: '',
            align: 'left'
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },


        }
        ,
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointPadding: 0.3,
                groupPadding: 0.1,
                dataLabels: {
                    enabled: false
                }
            },
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            },
        },
        series: [{
            name: '',
            data: data1 || [3, 5, 1, 13, 7, 9],
            color: "#99BAF7",


        }, {
            name: '',
            data: data2 || [14, 8, 8, 12, 10, 14],
            color: "#3C68D0"
        }, {
            name: '',
            data: data3 || [10, 2, 6, 3, 10, 15],
            color: "#0937B2"
        }]
    });
}