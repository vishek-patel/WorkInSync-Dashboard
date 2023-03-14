// Imports
const user_count = document.querySelector('.user-count');
const user_dataPercent = document.querySelector('.user-data-percent');
const user_sessions = document.querySelector('.main-sessions');
const user_sessions_percent = document.querySelector('.session-percent');
const user_session_duration = document.querySelector('.session-duration');
const user_session_duration_percent = document.querySelector('.session-duration-percent');
const div = document.querySelector(".total-users")
const countryDiv = document.querySelector(".countries")

const filterButton = document.getElementById('filterButton')
// filter button
const sm_btn = document.querySelectorAll('.sm-btn');
const loader = document.querySelectorAll('.loader');
const information_container = document.querySelectorAll('.information-container');
const grid_secton = document.querySelectorAll('.grid-secton');

const duration_arrow = document.querySelector('.duration-arrow');
const session_arrow = document.querySelector('.sessions-arrow');
const user_arrow = document.querySelector('.user-arrow');


// Constants
const PRIMARY_FILTER_BUTTON_BG_COLOR = "#0937B2";
const SECONDARY_FILTER_BUTTON_COLOR = "#FFFFFF";
const DATA_ARROW_UP_COLOR = "#38AF49";
const DATA_ARROW_DOWN_COLOR = '#B00020';
const UPDATED_OPACITY = "0.6";
const UPDATED_COLOR = "#181F33";
const UPDATED_BORDER_RADIUS = "0PX";
const DOWN_ARROW = "/assets/downArrow.svg";
const UP_ARROW = "/assets/upArrow.svg";

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
        for (let i = 0; i < 3; i++) {
            information_container[i].style.display = "none";
            loader[i].style.display = "block";
            grid_secton[i].classList.add("center")
        }
        const data = await fetchData(url);
        for (let i = 0; i < 3; i++) {
            loader[i].style.display = "none";
            information_container[i].style.display = "block";
            grid_secton[i].classList.remove("center")
        }

        user_count.innerHTML = data?.users[0]?.active_user?.totalUser + "k";
        user_dataPercent.innerHTML = data?.users[0]?.active_user?.percent + "%";
        user_session_duration.innerHTML = secToMin(data?.users[2]?.sessionDuration?.duration);
        user_sessions.innerHTML = data?.users[1]?.active_session?.totalSession + "k";
        user_sessions_percent.innerHTML = data?.users[1]?.active_session?.percent + "%";
        if (data?.users[0]?.active_user?.incriment) {
            user_arrow.src = UP_ARROW;
            user_dataPercent.style.color = DATA_ARROW_UP_COLOR;
        }
        else {
            user_arrow.src = DOWN_ARROW;
            user_dataPercent.style.color = DATA_ARROW_DOWN_COLOR;
        }
        if (data?.users[1]?.active_session?.incriment) {
            session_arrow.src = UP_ARROW;
            user_sessions_percent.style.color = DATA_ARROW_UP_COLOR;
        }
        else {
            session_arrow.src = DOWN_ARROW;
            user_sessions_percent.style.color = DATA_ARROW_DOWN_COLOR;
        }
        if (data?.users[2]?.sessionDuration?.incriment) {
            duration_arrow.src = UP_ARROW;
            user_session_duration_percent.style.color = DATA_ARROW_UP_COLOR;
        }
        else {
            duration_arrow.src = DOWN_ARROW;
            user_session_duration_percent.style.color = DATA_ARROW_DOWN_COLOR;
        }
    } catch (err) {
        console.log(err);
        alert("Something went wrong")
    }
}

export const updateColor = (selector) => {
    selector.style.backgroundColor = PRIMARY_FILTER_BUTTON_BG_COLOR;
    selector.style.color = SECONDARY_FILTER_BUTTON_COLOR;
}
const updateButton = (selector) => {

    filterUserData(`https://acf062d9-1952-483b-bee7-6bcf38c36621.mock.pstmn.io/user-status-${selector.textContent}`)
    selector.style.backgroundColor = PRIMARY_FILTER_BUTTON_BG_COLOR;
    selector.style.color = SECONDARY_FILTER_BUTTON_COLOR;
    const updated_filter_button = Array.from(sm_btn).filter((btn) => btn !== selector);
    updated_filter_button.forEach((btn) => {
        btn.style.backgroundColor = SECONDARY_FILTER_BUTTON_COLOR;
        btn.style.color = UPDATED_COLOR;
        btn.style.opacity = UPDATED_OPACITY;
        btn.style.borderRadius = UPDATED_BORDER_RADIUS;
    })
}
export
    const filterData = async () => {
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

export
    const getCountries = async () => {
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
