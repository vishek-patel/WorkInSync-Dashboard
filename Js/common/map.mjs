
// maps code

export const mapHighChart = async () => {
    try {

        const topology = await fetch(
            'https://code.highcharts.com/mapdata/custom/world.topo.json'
        ).then(response => response.json());
        //https://map-graph.free.beeceptor.com/map-area
        Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/world-population.json', function (data) {
            console.log(topology)
            Highcharts.mapChart('map-container', {
                chart: {
                    borderWidth: 0,
                    map: topology
                },


                legend: {
                    enabled: false
                },

                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        verticalAlign: 'bottom'
                    }
                },

                mapView: {
                    fitToGeometry: {
                        type: 'MultiPoint',
                        coordinates: [
                            // Alaska west
                            [-164, 54],
                            // Greenland north
                            [-35, 84],
                            // New Zealand east
                            [179, -38],
                            // Chile south
                            [-68, -55]
                        ]
                    }
                },

                series: [{
                    name: 'Countries',
                    color: '#E0E0E0',
                    enableMouseTracking: true
                }, {
                    type: 'mapbubble',
                    name: '<b> Users right now </b>',
                    joinBy: ['iso-a3', 'code3', 'name'],
                    data: data,
                    minSize: 4,
                    maxSize: '12%',
                    tooltip: {
                        pointFormat: ' - Offices : {point.z} <br /> - Remote: 150 <br /> - Flexible: 50',
                        valueDecimals: 0,
                    },
                    color: "#fff",
                    states: {
                        hover: {
                            color: '#E0E0E0',
                            width: "100px",
                            height: 150
                        }
                    },
                    marker: {
                        fillColor: '#041F80',
                        lineWidth: 1,
                        lineColor: '#041F80'
                    },
                    dataLabels: {
                        enabled: false,
                        format: '{point.code3}'
                    },

                }]
            });
        });
    } catch (err) {
        console.log(err);
        alert("Something went wrong");
    }
}
