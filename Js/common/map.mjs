
// maps code

export const mapHighChart = async () => {
    try {
        const topology = await fetch(
            'https://code.highcharts.com/mapdata/custom/world.topo.json'
        ).then(response => response.json());

        Highcharts.getJSON('https://map-api-data.free.beeceptor.com/map-api-data', function (data) {

            // Prevent logarithmic errors in color calulcation
            data.forEach(function (p) {
                p.value = (p.value < 1 ? 1 : p.value);
            });

            // Initialize the chart
            Highcharts.mapChart('map-container', {
                chart: {
                    map: topology,
                    width: document.querySelector("#map-container").clientWidth,
                    height: document.querySelector("#map-container").clientHeight,
                    margin: [0, 0, 0, 0]
                },

                title: {
                    text: 'Zoom in on country by double click'
                },

                mapNavigation: {
                    enabled: true,
                    enableDoubleClickZoomTo: true,
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

                colorAxis: {
                    min: 1,
                    max: 1000,
                    type: 'logarithmic'
                },

                series: [{
                    data: data,
                    joinBy: ['iso-a3', 'code3'],
                    name: 'Population density',
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        pointFormat: ' - Offices : {point.value} <br /> - Remote: 150 <br /> - Flexible: 50',
                    }
                }]
            });
        });
    } catch (err) {
        console.log(err);
        alert("Something went wrong");
    }
}
