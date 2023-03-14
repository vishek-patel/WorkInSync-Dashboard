
// maps code

export const mapHighChart = async () => {
    const getTooltip = (name, val) => {
        if (name === undefined) {
            return ``
        }
        const data = val.filter((item) => {
            if (item.name === 'USA' && name === 'United States of America') {
                return true
            }
            if (item.name === 'United Kingdom' && name === 'UK') {
                return true
            }
            if (item.name === 'Soudi Arabia' && name === 'Saudi Arabia') {
                return true
            }
            return item.name === name
        });
        if (data.length === 0) {
            return ``
        }
        return `
        <div class="map-hover-container">
            <h2 class="map-hover-h2">Users right now</h2>
            <ul class="map-ul">
                <li class="list-grp-hover list-grp-1">Office : ${data[0].value[0]}</li>
                <li class="list-grp-hover list-grp-2">Remote: ${data[0].value[1]}</li>
                <li class="list-grp-hover list-grp-3">Flexible: ${data[0].value[2]}</li>
            </ul>
        
        </div>

    `
    }

    try {
        const topology = await fetch(
            'https://code.highcharts.com/mapdata/custom/world.topo.json'
        ).then(response => response.json());
        //Our map URL : https://map-api-data.free.beeceptor.com/map-api-data
        // https://my-map-data.free.beeceptor.com/fake-map-data
        Highcharts.getJSON('https://my-fake-api-data.free.beeceptor.com/my-api-fake', function (data) {
            const myData = []
            data.forEach((item) => {
                myData.push({
                    "code3": item.code3,
                    "value": item.value.reduce((a, b) => a + b, 0),
                    "name": item.name,
                    "code": item.code,
                })
            })

            // Initialize the chart
            Highcharts.mapChart('map-container', {
                chart: {
                    map: topology,
                    width: document.querySelector("#map-container").clientWidth,
                    height: document.querySelector("#map-container").clientHeight,
                    margin: [0, 0, 0, 0]
                },

                title: {
                    text: ''
                },
                //The mapNavigation option handles buttons for navigation in addition to mousewheel and doubleclick handlers for map zooming.
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
                tooltip: {
                    formatter: function () {
                        return getTooltip(this.point?.name, data);
                    },
                    shared: true,
                    useHTML: true,
                    borderWidth: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                },

                series: [{
                    data: myData,
                    joinBy: ['iso-a3', 'code3'],
                    name: '',
                    states: {
                        hover: {
                            enabled: false
                        }
                    },
                }]
            });
        });
    } catch (err) {
        console.log(err);
        alert("Something went wrong");
    }
}
