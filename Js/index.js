const div = document.querySelector(".total-users")
const btn = document.querySelector(".real-time-report")
const fill = document.querySelector(".fill")
const countryDiv = document.querySelector(".countries")


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
    const countryArrayLength = 5;
    for (let i = 0; i < countryArrayLength; i++) {
        const country = countryArray[i].country;
        const percent = countryArray[i].percent;

        const el = `<div class="country-values">
        <div class="country-img">
            <img src="assets/United Kingdom (GB).svg" alt="">
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
