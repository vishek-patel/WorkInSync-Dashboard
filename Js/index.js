// Definations
const div = document.querySelector(".total-users")
const btn = document.querySelector(".real-time-report")
const fill = document.querySelector(".fill")
const countryDiv = document.querySelector(".countries")
const user_count = document.querySelector('.user-count');
const user_dataPercent = document.querySelector('.data-percent');
const user_sessions = document.querySelector('.main-sessions');
const user_sessions_percent = document.querySelector('.session-percent');
const user_session_duration = document.querySelector('.session-duration');
const user_session_duration_percent = document.querySelector('.session-duration-percent');
// Images
const duration_arrow = document.querySelector('.duration-arrow');
const session_arrow = document.querySelector('.sessions-arrow');
const user_arrow = document.querySelector('.user-arrow');
// filter button
const M12 = document.querySelector('.sm-btn-1');
const D30 = document.querySelector('.sm-btn-2');
const D7 = document.querySelector('.sm-btn-3');
const H24 = document.querySelector('.sm-btn-4');
const obj = {};
const json = "";
const getData = async () => {
    const res = await fetch("https://2dd982c6-48ee-49d4-83e5-ab759a365c0c.mock.pstmn.io/countries")
    const data = await res.json()
    // alert(data.countries[0].country)
    div.innerText = `${data.totalUsers}k`;
}
const getCountries = async () => {
    const res = await fetch("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/activeusers-by-country")
    const data = await res.json()
    // alert(data.countries[0].country)
    const countryArray = data.countries;
    const countryArrayLength = 7;
    for (let i = 0; i < countryArrayLength; i++) {
        const country = countryArray[i].country;
        const percent = countryArray[i].percent;
        const el = `<div class="country-values">
        <div class="country-img">
            <img src="assets/${country}.png" alt="">
            <div class="country-name-and-users">
            <div class="country-name">${country}</div>
            <div class="progess-percentage">
              <span class="progress-bar"><span class="fill" style="width:${percent}px"></span></span>
              <span class="percent">${percent}%</span>
            </div>
            </div>
        </div>
      </div>`
        countryDiv.innerHTML += (el);
    }
}
btn.addEventListener("click", () => {
    //   getData();
    // getCountries();
})
// getData();
getCountries();
const filterButton = document.getElementById('filterButton')
filterButton.addEventListener('click', function () {
    filterButton.style.color = "white";
    filterButton.style.backgroundColor = "#0937B2";
}
);
// Fetching data from API
const fetchData = async (url) => {
    try {
        const res = await fetch(url)
        const data = await res.json();
        return data;
    } catch (err) {
        throw err;
    }
}
const secToMin = (sec) => {
    const min = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${min}m ${seconds}s`;
}
const filterUserData = async (url) => {
    const data = await fetchData(url);
    user_count.innerHTML = data?.users[0]?.active_user?.totalUser + "k";
    user_dataPercent.innerHTML = data?.users[0]?.active_user?.percent + "%";
    user_session_duration.innerHTML = secToMin(data?.users[2]?.sessionDuration?.duration);
    user_sessions.innerHTML = data?.users[1]?.active_session?.totalSession + "k";
    user_sessions_percent.innerHTML = data?.users[1]?.active_session?.percent + "%";
    // Incriment or Decriment
    if (data?.users[0]?.sessionDuration?.incriment) {
        user_arrow.src = "/assets/upArrow.svg";
        user_session_duration_percent.style.color = "#38af49";

    }
    else {
        user_arrow.src = "/assets/downArrow.svg";
        user_session_duration_percent.style.color = "#B00020";
    }
    if (data?.users[2]?.active_user?.incriment) {
        duration_arrow.src = "/assets/upArrow.svg";
        user_dataPercent.style.color = "#38af49";
    }
    else {
        duration_arrow.src = "/assets/downArrow.svg";
        user_dataPercent.style.color = "#B00020";
    }
    if (data?.users[1]?.active_session?.incriment) {
        session_arrow.src = "/assets/upArrow.svg";
        user_sessions_percent.style.color = "#38af49";
    }
    else {
        session_arrow.src = "/assets/downArrow.svg";
        user_sessions_percent.style.color = "#B00020";
    }
}
const updateUserData = async () => {
    try {
        filterUserData("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/user-status")
    } catch (err) {
        console.log(err);
    }
}
const updateColor = (selector) => {
    selector.style.backgroundColor = "#0937B2";
    selector.style.color = "white";
}
const filterData = async () => {
    try {
        M12.addEventListener('click', async () => {
            updateColor(M12);
            D30.style.backgroundColor = "white";
            D30.style.color = "#181F33";
            D7.style.backgroundColor = "white";
            D7.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            D30.style.opacity = "0.6";
            D7.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/user-status-12M")
        })
        D30.addEventListener('click', async () => {
            updateColor(D30)
            M12.style.backgroundColor = "white";
            M12.style.color = "#181F33";
            D7.style.backgroundColor = "white";
            D7.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            M12.style.opacity = "0.6";
            D7.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/user-status-30D")
        })
        D7.addEventListener('click', async () => {
            updateColor(D7)
            M12.style.backgroundColor = "white";
            M12.style.color = "#181F33";
            D30.style.backgroundColor = "white";
            D30.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            M12.style.opacity = "0.6";
            D30.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/user-status-7D")
        })
        H24.addEventListener('click', async () => {
            updateColor(H24)
            M12.style.backgroundColor = "white";
            M12.style.color = "#181F33";
            D30.style.backgroundColor = "white";
            D30.style.color = "#181F33";
            D7.style.backgroundColor = "white";
            D7.style.color = "#181F33";
            M12.style.opacity = "0.6";
            D30.style.opacity = "0.6";
            D7.style.opacity = "0.6";
            filterUserData("https://36adcc00-71a5-4192-877d-a2771c69f073.mock.pstmn.io/user-status-24H")
        })
    } catch (err) {
        console.log(err);
    }
}
updateUserData()
filterData()
updateUserData()
// Pie charts code
Highcharts.chart("pie-chart-container", {
    chart: {
        type: "pie",
        backgroundColor: "transparent",
        // width: 500,
        // height: 500,
    },
    series: [
        {
            type: "pie",
            backgroundColor: "transparent",
            // name: "Total",
            data: [
                {
                    name: "Organic",
                    y: 719,
                    color: "#0937B2", // 2020 color
                },
                {
                    name: "Social",
                    y: 586,
                    color: "#D9D9D9", // 2021 color
                },
                {
                    name: "Referral",
                    y: 647,
                    color: "#3C68D0", // 2022 color
                },
                {
                    name: "Direct",
                    y: 147,
                    color: "#9EACCE", // 2022 color
                },
            ],
            center: [75, 65],
            size: 200,
            innerSize: "80%",
            showInLegend: false,
            dataLabels: {
                enabled: false,
            },
        },
    ],
});


//stacked chart code

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
        // plotBorderWidth: 20,
        // plotBorderColor: '#606063',
        // height: 300,
        // width: 450,
        margin: [0, 0, 0, 0],
        // padding:[50,50,50,50]

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
        data: [3, 5, 1, 13, 7, 9],
        color: "#99BAF7",


    }, {
        name: '',
        data: [14, 8, 8, 12, 10, 14],
        color: "#3C68D0"
    }, {
        name: '',
        data: [10, 2, 6, 3, 10, 15],
        color: "#0937B2"
    }]
});


// maps code


const baseMapPath = "https://code.highcharts.com/mapdata/";

let showDataLabels = false,
    mapCount = 0,
    mapOptions = "";
$.each(Highcharts.mapDataIndex, (mapGroup, maps) => {
    if (mapGroup !== "version") {
        mapOptions += `<option class="option-header">${mapGroup}</option>`;
        $.each(maps, (desc, path) => {
            mapOptions += `<option value="${path}">${desc}</option>`;
            mapCount += 1;
        });
    }
});
const searchText = `Search ${mapCount} maps`;
mapOptions = `<option value="custom/world.js">${searchText}</option>${mapOptions}`;
$("#mapDropdown").append(mapOptions).combobox();
$("#mapDropdown").on("change", async function () {
    const $selectedItem = $("option:selected", this),
        mapDesc = $selectedItem.text(),
        mapKey = this.value.slice(0, -3),
        svgPath = baseMapPath + mapKey + ".svg",
        geojsonPath = baseMapPath + mapKey + ".geo.json",
        topojsonPath = baseMapPath + mapKey + ".topo.json",
        javascriptPath = baseMapPath + this.value,
        isHeader = $selectedItem.hasClass("option-header");

    if (isHeader) {
        return false;
    }
    // Load the map
    let filesize = "";
    const mapData = await fetch(topojsonPath)
        .then((response) => {
            const size = response.headers.get("content-length");
            if (size) {
                filesize = Math.round(size / 1024) + " kB";
            }

            return response.json();
        })
        .catch((e) => console.log("Error", e));

    // Update info box download links
    $("#download").html(
        "<small>" +
        filesize +
        "</small> <br><br>" +
        '<a class="button" target="_blank" href="https://jsfiddle.net/gh/get/jquery/1.11.0/' +
        "highcharts/highcharts/tree/master/samples/mapdata/" +
        mapKey +
        '">' +
        "View clean demo</a>" +
        '<div class="or-view-as">... or view as ' +
        '<a target="_blank" href="' +
        svgPath +
        '">SVG</a>, ' +
        '<a target="_blank" href="' +
        geojsonPath +
        '">GeoJSON</a>, ' +
        '<a target="_blank" href="' +
        topojsonPath +
        '">TopoJSON</a>, ' +
        '<a target="_blank" href="' +
        javascriptPath +
        '">JavaScript</a>.</div>'
    );

    // Generate non-random data for the map
    const data = mapData.objects.default.geometries.map((g, value) => ({
        key: g.properties["hc-key"],
        value,
    }));

    // Show arrows the first time a real map is shown
    if (mapDesc !== searchText) {
        $(".selector .prev-next").show();
        $("#side-box").show();
    }

    // Is there a layer above this?
    const match = mapKey.match(
        /^(countries\/[a-z]{2}\/[a-z]{2})-[a-z0-9]+-all$/
    );
    let parent;
    if (/^countries\/[a-z]{2}\/[a-z]{2}-all$/.test(mapKey)) {
        // country
        parent = {
            desc: "World",
            key: "custom/world",
        };
    } else if (match) {
        // admin1
        parent = {
            desc: $('option[value="' + match[1] + '-all.js"]').text(),
            key: match[1] + "-all",
        };
    }
    $("#up").html("");
    if (parent) {
        $("#up").append(
            $('<a><i class="fa fa-angle-up"></i> ' + parent.desc + "</a>")
                .attr({
                    title: parent.key,
                })
                .on("click", function () {
                    $("#mapDropdown")
                        .val(parent.key + ".js")
                        .trigger("change");
                })
        );
    }

    // Data labels formatter. Use shorthand codes for world and US
    const formatter = function () {
        return mapKey === "custom/world" || mapKey === "countries/us/us-all"
            ? this.point.properties && this.point.properties["hc-a2"]
            : this.point.name;
    };

    // On point click, look for a detailed map to drill into
    const onPointClick = function () {
        const key = this.key;
        $("#mapDropdown option").each(function () {
            if (this.value === `countries/${key.substr(0, 2)}/${key}-all.js`) {
                $("#mapDropdown").val(this.value).trigger("change");
            }
        });
    };

    const fitToGeometry =
        mapKey === "custom/world"
            ? {
                type: "MultiPoint",
                coordinates: [
                    // Alaska west
                    [-164, 54],
                    // Greenland north
                    [-35, 84],
                    // New Zealand east
                    [179, -38],
                    // Chile south
                    [-68, -55],
                ],
            }
            : undefined;

    // Instantiate chart
    Highcharts.mapChart("maps-container", {
        chart: {
            map: mapData,
        },

        title: {
            text: null,
        },

        accessibility: {
            series: {
                descriptionFormat:
                    "{series.name}, map with {series.points.length} areas.",
                pointDescriptionEnabledThreshold: 50,
            },
        },

        mapNavigation: {
            enabled: true,
            buttonOptions: {
                alignTo: "spacingBox",
                x: 10,
            },
        },

        mapView: {
            fitToGeometry,
        },

        colorAxis: {
            min: 0,
            stops: [
                [0, "#EFEFFF"],
                [0.5, Highcharts.getOptions().colors[0]],
                [
                    1,
                    Highcharts.color(Highcharts.getOptions().colors[0])
                        .brighten(-0.5)
                        .get(),
                ],
            ],
        },

        legend: {
            layout: "vertical",
            align: "left",
            verticalAlign: "bottom",
        },

        series: [
            {
                data,
                joinBy: ["hc-key", "key"],
                name: `
        Users right now \n
        Office : 900 \n
        Remote: 35 \n
        Flexible: 50
        
        `,
                states: {
                    hover: {
                        color: "#E0E0E0",
                        width: "250px",
                    },
                },
                dataLabels: {
                    enabled: showDataLabels,
                    formatter,
                    style: {
                        fontWeight: 100,
                        fontSize: "14px",
                        textOutline: "none",
                    },
                },
                point: {
                    events: {
                        click: onPointClick,
                    },
                },
            },
            {
                type: "mapline",
                name: "Lines",
                accessibility: {
                    enabled: false,
                },
                data: Highcharts.geojson(mapData, "mapline"),
                nullColor: "#333333",
                showInLegend: false,
                enableMouseTracking: false,
            },
        ],
    });

    showDataLabels = $("#chkDataLabels").prop("checked");
});

// Toggle data labels - Note: Reloads map with new random data
$("#chkDataLabels").on("change", function () {
    showDataLabels = $("#chkDataLabels").prop("checked");
    $("#mapDropdown").trigger("change");
});

// Switch to previous map on button click
$("#btn-prev-map").on("click", function () {
    $("#mapDropdown option:selected")
        .prev("option")
        .prop("selected", true)
        .trigger("change");
});

// Switch to next map on button click
$("#btn-next-map").on("click", function () {
    $("#mapDropdown option:selected")
        .next("option")
        .prop("selected", true)
        .trigger("change");
});

// Trigger change event to load map on startup
if (location.hash) {
    $("#mapDropdown").val(location.hash.substr(1) + ".js");
}
$("#mapDropdown").trigger("change");


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
        data: [
            299, 438, 841,
            1169, 1703, 2422, 3692,

        ],
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
        data: [

            3502, 2422, 1703, 1169, 841, 538, 299


        ],
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
        data: [
            299, 538, 841,
            1169, 1703, 2422, 3502,

        ],
        color: "#E4F5E9",
        lineColor: '#38AF49'
    },]
});