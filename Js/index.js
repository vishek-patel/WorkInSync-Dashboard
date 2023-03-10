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
    const res = await fetch("https://d858c184-0058-4be6-8826-d26b9bd5e0b0.mock.pstmn.io/activeusers-by-country")
    const data = await res.json()
    // alert(data.countries[0].country)
    const countryArray = data.countries;
    const countryArrayLength = 6;
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
    if (data?.users[0]?.active_user?.incriment) {
        duration_arrow.src = "/assets/upArrow.svg";
    }
    else {
        duration_arrow.src = "/assets/downArrow.svg";
    }
}
const updateUserData = async () => {
    try {
        filterUserData("https://d858c184-0058-4be6-8826-d26b9bd5e0b0.mock.pstmn.io/user-status")
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
            filterUserData("https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-12M")
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
            filterUserData("https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-30D")
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
            filterUserData("https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-7D")
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
            filterUserData("https://fbcbb164-f2bf-4e83-8dee-a5f9e8089072.mock.pstmn.io/user-status-24H")
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
        backgroundColor: '',
        style: {
            fontFamily: 'Roboto'
        },
        spacingBottom: 0,
        spacingTop: 0,
        spacingLeft:0,
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
        data: [3, 5, 1, 13,7,9],
        color:"#99BAF7",


    }, {
        name: '',
        data: [14, 8, 8, 12,10,14],
        color:"#3C68D0"
    }, {
        name: '',
        data: [10, 2, 6, 3,10,15],
        color:"#0937B2"
    }]
});
