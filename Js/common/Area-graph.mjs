
// API Fetching for area graph

import { fetchData } from "./common-functions.mjs";

export const AreaGraphDraw = async () => {
    try {

        //! Daily 50 requests
        const { data_up, data_down, data_up_up } = await fetchData('https://container-area-graph-up.free.beeceptor.com/my/api/container-area-graph-up');

        //Data-area-graph
        Highcharts.chart('container-area-graph-up', {
            chart: {
                type: 'area',
                backgroundColor: 'white',
                height: 100,
                width: 150,
                margin: [0, 0, 0, 0],
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,

                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
            },
            yAxis: {
                gridLineColor: 'transparent',

                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '',
                data: data_up,
                color: "#E4F5E9",
                lineColor: '#38AF49'
            },]
        });


        //Data-area-graph-down-arrow
        Highcharts.chart('container-area-graph-down', {
            chart: {
                type: 'area',
                backgroundColor: 'white',
                height: 100,
                width: 150,
                margin: [0, 0, 0, 0],
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,

                labels: {
                    formatter: function () {
                        return this.value;
                    }
                },
            },
            yAxis: {
                gridLineColor: 'transparent',

                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '',
                data: data_down,
                color: "#FAE1EA",
                lineColor: '#B00020'
            },]
        });

        //Data-area-graph-up-up

        Highcharts.chart('container-area-graph-up-up', {
            chart: {
                type: 'area',
                backgroundColor: 'white',
                height: 100,
                width: 150,
                margin: [0, 0, 0, 0],
            },
            title: {
                text: ''
            },
            xAxis: {
                allowDecimals: false,

                labels: {
                    formatter: function () {
                        return this.value; // clean, unformatted number for year
                    }
                },
            },
            yAxis: {
                gridLineColor: 'transparent',

                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value / 1000 + 'k';
                    }
                }
            },
            tooltip: {
                pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
            },
            plotOptions: {
                area: {
                    pointStart: 1940,
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: '',
                data: data_up_up,
                color: "#E4F5E9",
                lineColor: '#38AF49'
            },]
        });
    } catch (error) {
        console.log(error);
    }

}
