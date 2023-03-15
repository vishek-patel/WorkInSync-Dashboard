
// maps code
import { fetchData } from './common-functions.mjs';
export const mapHighChart = () => {
    const getTooltip = (name, map_data) => {
        if (name === undefined) {
            return ``
        }
        // Filter data for the country
        const data = map_data.filter((item) => {
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
        // Hover HTML Code
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
            const topology = await fetchData('https://code.highcharts.com/mapdata/custom/world.topo.json');
            const map_data = await fetchData('https://map-fake-data.free.beeceptor.com/map-fake-data') // office , remote, flexibile data
            const hoverData = await fetchData('https://map-hover-data.free.beeceptor.com/map-hover-data') // latitude and longitude data
            const map_custom_data = []
            // Building custom data for map
            map_data.forEach((item) => {
                map_custom_data.push({
                    "code3": item.code3,
                    "value": item.value.reduce((a, b) => a + b, 0),
                    "name": item.name,
                    "code": item.code,
                })
            })
            
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
                // Color ranges for the map
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
                    //A mappoint series is a special form of scatter series where points are laid out on top of a map using lon and lat coordinates.
                    mappoint: {
                        // An array specifying which option maps to which key in the data point array. This makes it convenient to work with unstructured data arrays from different sources.
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
                    shared: true, // When the tooltip is shared, the entire plot area will capture mouse movement or touch events. 
                    useHTML: true, // We can use HTML tags in the tooltip.
                    // Style of the tooltip
                    borderWidth: 0,
                    backgroundColor: '#ffffff',
                    borderRadius: 12,
                    padding: 10,
                },

                series: [
                    {
                        data: map_custom_data,
                        joinBy: ['iso-a3', 'code3'],
                        name: '',
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                    },
                    {
                        name: '',
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
