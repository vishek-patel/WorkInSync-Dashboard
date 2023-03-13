// Imports
const user_count = document.querySelector('.user-count');
const user_dataPercent = document.querySelector('.user-data-percent');
const user_sessions = document.querySelector('.main-sessions');
const user_sessions_percent = document.querySelector('.session-percent');
const user_session_duration = document.querySelector('.session-duration');
const user_session_duration_percent = document.querySelector('.session-duration-percent');
const fill = document.querySelector(".fill")
const div = document.querySelector(".total-users")
const btn = document.querySelector(".real-time-report")
const countryDiv = document.querySelector(".countries")

const filterButton = document.getElementById('filterButton')
// filter button
const M12 = document.querySelector('.sm-btn-1');
const D30 = document.querySelector('.sm-btn-2');
const D7 = document.querySelector('.sm-btn-3');
const H24 = document.querySelector('.sm-btn-4');

const duration_arrow = document.querySelector('.duration-arrow');
const session_arrow = document.querySelector('.sessions-arrow');
const user_arrow = document.querySelector('.user-arrow');


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

        const data = await fetchData(url);
        user_count.innerHTML = data?.users[0]?.active_user?.totalUser + "k";
        user_dataPercent.innerHTML = data?.users[0]?.active_user?.percent + "%";
        user_session_duration.innerHTML = secToMin(data?.users[2]?.sessionDuration?.duration);
        user_sessions.innerHTML = data?.users[1]?.active_session?.totalSession + "k";
        user_sessions_percent.innerHTML = data?.users[1]?.active_session?.percent + "%";
        // Incriment or Decriment
        console.log(data?.users);
        if (data?.users[0]?.active_user?.incriment) {
            user_arrow.src = "/assets/upArrow.svg";
            user_dataPercent.style.color = "#38AF49";
        }
        else {
            user_arrow.src = "/assets/downArrow.svg";
            user_dataPercent.style.color = "#B00020";
        }
        if (data?.users[1]?.active_session?.incriment) {
            session_arrow.src = "/assets/upArrow.svg";
            user_sessions_percent.style.color = "#38AF49";
        }
        else {
            session_arrow.src = "/assets/downArrow.svg";
            user_sessions_percent.style.color = "#B00020";
        }
        if (data?.users[2]?.sessionDuration?.incriment) {
            duration_arrow.src = "/assets/upArrow.svg";
            user_session_duration_percent.style.color = "#38AF49";
        }
        else {
            duration_arrow.src = "/assets/downArrow.svg";
            user_session_duration_percent.style.color = "#B00020";
        }
    } catch (err) {
        console.log(err);
        alert("Something went wrong")
    }
}

export const updateColor = (selector) => {
    selector.style.backgroundColor = "#0937B2";
    selector.style.color = "white";
}

export
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
        } catch (err) {
            alert("Something went wrong")
            console.log(err);
        }
    }
filterButton.addEventListener('click', function () {
    filterButton.style.color = "white";
    filterButton.style.backgroundColor = "#0937B2";
}
);
