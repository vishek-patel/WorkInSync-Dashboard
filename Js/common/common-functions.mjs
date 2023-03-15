// Imports
const user_count = document.querySelector('.user-count');
const user_dataPercent = document.querySelector('.user-data-percent');
const user_sessions = document.querySelector('.main-sessions');
const user_sessions_percent = document.querySelector('.session-percent');
const user_session_duration = document.querySelector('.session-duration');
const div = document.querySelector(".total-users")
const countryDiv = document.querySelector(".countries")

const filterButton = document.getElementById('filterButton')
// filter button
const sm_btn = document.querySelectorAll('.sm-btn');
const loader = document.querySelectorAll('.loader');
const information_container = document.querySelectorAll('.information-container');
const grid_secton = document.querySelectorAll('.grid-secton');

// arrows
const arrow = document.querySelectorAll('.arrow-svg');
const data_percent = document.querySelectorAll('.data-percent');



// Constants
import {
    PRIMARY_FILTER_BUTTON_BG_COLOR,
    SECONDARY_FILTER_BUTTON_COLOR,
    DATA_ARROW_UP_COLOR,
    DATA_ARROW_DOWN_COLOR,
    UPDATED_OPACITY,
    UPDATED_COLOR,
    UPDATED_BORDER_RADIUS,
    DOWN_ARROW,
    UP_ARROW
} from '../Constants/constants.mjs'

// Fetching data from API
export const fetchData = async (url) => {
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

export const filterUserData = async (url) => {
    try {
        // Loader start
        for (let i = 0; i < 3; i++) {
            information_container[i].style.display = "none";
            loader[i].style.display = "block";
            grid_secton[i].classList.add("center")
        }
        const data = await fetchData(url);
        const isIncriment = [data?.users[0]?.active_user?.incriment, data?.users[1]?.active_session?.incriment, data?.users[2]?.sessionDuration?.incriment]
        for (let i = 0; i < 3; i++) {
            // Stop loader
            loader[i].style.display = "none";
            information_container[i].style.display = "block";
            grid_secton[i].classList.remove("center")

            // Arrow Color
            if (isIncriment[i]) {
                data_percent[i].style.color = DATA_ARROW_UP_COLOR;
                arrow[i].src = UP_ARROW;
            } else {
                data_percent[i].style.color = DATA_ARROW_DOWN_COLOR;
                arrow[i].src = DOWN_ARROW;
            }
        }
        user_count.innerHTML = data?.users[0]?.active_user?.totalUser + "k";
        user_dataPercent.innerHTML = data?.users[0]?.active_user?.percent + "%";
        user_session_duration.innerHTML = secToMin(data?.users[2]?.sessionDuration?.duration);
        user_sessions.innerHTML = data?.users[1]?.active_session?.totalSession + "k";
        user_sessions_percent.innerHTML = data?.users[1]?.active_session?.percent + "%";
    } catch (err) {
        console.log(err);
        alert("Something went wrong")
    }
}

export const updateColor = (selector) => {
    selector.style.backgroundColor = PRIMARY_FILTER_BUTTON_BG_COLOR;
    selector.style.color = SECONDARY_FILTER_BUTTON_COLOR;
}


const updateButton = async (selector) => {
    try {
        await filterUserData(`https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-${selector.textContent}`)
        selector.style.backgroundColor = PRIMARY_FILTER_BUTTON_BG_COLOR;
        selector.style.color = SECONDARY_FILTER_BUTTON_COLOR;
        const updated_filter_button = Array.from(sm_btn).filter((btn) => btn !== selector);
        updated_filter_button.forEach((btn) => {
            btn.style.backgroundColor = SECONDARY_FILTER_BUTTON_COLOR;
            btn.style.color = UPDATED_COLOR;
            btn.style.opacity = UPDATED_OPACITY;
            btn.style.borderRadius = UPDATED_BORDER_RADIUS;
        })

    } catch (err) {
        console.log(err);
    }
}


export const filterData = async () => {
    try {
        sm_btn.forEach((btn) => {
            btn.addEventListener('click', async () => {
                updateColor(btn)
                updateButton(btn)
            })
        })
    } catch (err) {
        alert("Something went wrong")
        console.log(err);
    }
}


export const updateUserData = async () => {
    try {
        filterUserData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/userstatus")
    } catch (err) {
        alert("Something went wrong")
        console.log(err);
    }
}

export const getCountries = async () => {
    try {
        const data = await fetchData("https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/activeusers-by-country")
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
    } catch (err) {
        alert("Something went wrong")
        console.log(err);
    }
}


filterButton.addEventListener('click', function () {
    filterButton.style.color = SECONDARY_FILTER_BUTTON_COLOR;
    filterButton.style.backgroundColor = PRIMARY_FILTER_BUTTON_BG_COLOR;
}
);
