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

const obj ={};
const json = "";

const getData = async() => {
 const res = await fetch("https://2dd982c6-48ee-49d4-83e5-ab759a365c0c.mock.pstmn.io/countries")
    const data = await res.json()
    // alert(data.countries[0].country)

 div.innerText =`${data.totalUsers}k`;
}


const getCountries = async ()=> {
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

      countryDiv.innerHTML +=(el);


    }

}


btn.addEventListener("click",()=>{
  getData();
  getCountries();
})

getData();
getCountries();



const filterButton = document.getElementById('filterButton')
filterButton.addEventListener('click', function() {

    filterButton.style.color="white";
    filterButton.style.backgroundColor="#0937b2";

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
const updateUserData = async () => {
    try {
        const data = await fetchData("https://d858c184-0058-4be6-8826-d26b9bd5e0b0.mock.pstmn.io/user-status");
        user_count.innerHTML = data?.users[0]?.active_user?.totalUser + "k";
        user_dataPercent.innerHTML = data?.users[0]?.active_user?.percent + "%";
        user_session_duration.innerHTML = secToMin(data?.users[2]?.sessionDuration?.duration);
        user_sessions.innerHTML = data?.users[1]?.active_session?.totalSession + "k";
        user_sessions_percent.innerHTML = data?.users[1]?.active_session?.percent + "%";
        // Incriment or Decriment
        if (data?.users[0]?.active_user?.incriment) {
            duration_arrow.src = "/assets/upArrow.svg";
        } else {
            duration_arrow.src = "/assets/downArrow.svg";
        }

    } catch (err) {
        console.log(err);
    }

}
updateUserData()
