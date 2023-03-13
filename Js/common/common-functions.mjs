// Imports
const user_count = document.querySelector('.user-count');
const user_dataPercent = document.querySelector('.user-data-percent');
const user_sessions = document.querySelector('.main-sessions');
const user_sessions_percent = document.querySelector('.session-percent');
const user_session_duration = document.querySelector('.session-duration');
const user_session_duration_percent = document.querySelector('.session-duration-percent');
const fill = document.querySelector(".fill")


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
}

export const updateColor = (selector) => {
    selector.style.backgroundColor = "#0937B2";
    selector.style.color = "white";
}