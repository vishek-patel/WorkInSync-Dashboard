
// maps code
import { fetchData } from './common-functions.mjs';
export const mapHighChart = async () => {
    const getTooltip = (name, val) => {
        console.log(name, val);
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
    async function initMap() {
        try {
            const topology = await fetch(
                'https://code.highcharts.com/mapdata/custom/world.topo.json'
            ).then(response => response.json());
            const map_data = await fetchData('https://map-fake-data.free.beeceptor.com/map-fake-data')
            const hoverData = await fetchData('https://map-hover-data.free.beeceptor.com/map-hover-data')
            const myData = []
            map_data.forEach((item) => {
                myData.push({
                    "code3": item.code3,
                    "value": item.value.reduce((a, b) => a + b, 0),
                    "name": item.name,
                    "code": item.code,
                })
            })
            console.log(myData);
            Highcharts.mapChart('map-container', {

                chart: {
                    map: topology,
                    margin: 1
                },

                title: {
                    text: '',
                },

                subtitle: {
                    text: '',
                },
                colorAxis: {
                    min: 1,
                    max: 1000,
                },
                mapNavigation: {
                    enabled: true,
                    buttonOptions: {
                        alignTo: 'spacingBox',
                        verticalAlign: 'bottom'
                    }
                },

                mapView: {
                    padding: [0, 0, 0, 0]
                },

                plotOptions: {
                    mappoint: {
                        keys: ['id', 'lat', 'lon', 'name', 'y'],
                        marker: {
                            lineWidth: 1,
                            lineColor: '#000',
                            symbol: 'mapmarker',
                            radius: 8
                        },
                        dataLabels: {
                            enabled: false
                        }
                    }
                },
                // Hover Effect
                tooltip: {
                    headerFormat: '',
                    formatter: function () {
                        return getTooltip(this.point?.name, map_data);
                    },
                    shared: true,
                    useHTML: true,
                    borderWidth: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 10,
                },

                series: [
                    {
                        data: myData,
                        joinBy: ['iso-a3', 'code3'],
                        name: '',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                    },
                    {
                        name: 'Coastal',
                        color: '#FF9D00',
                        data: hoverData,
                        type: 'mappoint'
                    }]
            });
        } catch (error) {
            console.log(error)
        }
    }
    initMap()
}
