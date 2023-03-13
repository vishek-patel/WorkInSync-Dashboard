// Definations
const div = document.querySelector(".total-users")
const btn = document.querySelector(".real-time-report")
const countryDiv = document.querySelector(".countries")

const filterButton = document.getElementById('filterButton')
// filter button
const M12 = document.querySelector('.sm-btn-1');
const D30 = document.querySelector('.sm-btn-2');
const D7 = document.querySelector('.sm-btn-3');
const H24 = document.querySelector('.sm-btn-4');
// Importing functions
import { fetchData, filterUserData, updateColor } from "./common/common-functions.mjs";
import { AreaGraphDraw } from './common/Area-graph.mjs';
import { stack_chart } from "./common/stack-chart.mjs";
import { mapHighChart } from './common/map.mjs';
import { PieChart } from './common/Pie-Chart.mjs';


const getCountries = async () => {
    const res = await fetch("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/activeusers-by-country")
    const data = await res.json()
    // alert(data.countries[0].country)
    div.innerText = `${data.totalUsers}k`;
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
filterButton.addEventListener('click', function () {
    filterButton.style.color = "white";
    filterButton.style.backgroundColor = "#0937B2";
}
);


const updateUserData = async () => {
    try {
        filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/userstatus")
    } catch (err) {
        console.log(err);
    }
}

const filterData = async () => {
    try {
        M12.addEventListener('click', async () => {
            updateColor(M12);
            // M12.style
            D30.style.backgroundColor = "white";
            D30.style.color = "#181F33";
            D7.style.backgroundColor = "white";
            D7.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            D30.style.opacity = "0.6";
            D7.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-12M")
        })
        D30.addEventListener('click', async () => {
            updateColor(D30)
            D30.style.borderRadius = "0px";
            M12.style.backgroundColor = "white";
            M12.style.color = "#181F33";
            D7.style.backgroundColor = "white";
            D7.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            M12.style.opacity = "0.6";
            D7.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-30D")
        })
        D7.addEventListener('click', async () => {
            updateColor(D7)
            D30.style.borderRadius = "0px";
            M12.style.backgroundColor = "white";
            M12.style.color = "#181F33";
            D30.style.backgroundColor = "white";
            D30.style.color = "#181F33";
            H24.style.backgroundColor = "white";
            H24.style.color = "#181F33";
            M12.style.opacity = "0.6";
            D30.style.opacity = "0.6";
            H24.style.opacity = "0.6";
            filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-7D")
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
            filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-24H")
        })
    } catch (err) {
        console.log(err);
    }
}

const main = () => {
    getCountries()
    updateUserData()
    filterData()
    AreaGraphDraw()
    stack_chart()
    mapHighChart()
    PieChart()
}

main()