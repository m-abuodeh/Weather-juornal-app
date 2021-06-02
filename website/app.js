// Create variables
const date = document.querySelector("#date");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");
const desc = document.querySelector("#description");
const content = document.querySelector("#content");
const Button = document.querySelector("#generate");
const error = document.querySelector("#error");
const apiURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=425cea3149120f436a398569f5d19b20";
const port = 3000;
const server = `http://localhost:${port}`;

// Get the current date
let currentDate = new Date();
let newDate = currentDate.toDateString();

const generateInfoObject = () => {
    //Clear the data from the screen
    error.innerHTML = "";
    city.innerHTML = "";
    temp.innerHTML = "";
    desc.innerHTML = "";
    content.innerHTML = "";
    date.innerHTML = "";
    //Save form values into variables
    const zipCode = document.querySelector("#zip").value;
    const feelings = document.querySelector("#feelings").value;

    // Create new object from API and form data, Post the new data and update the UI
    WeatherData(zipCode).then((data) => {
        if (data) {
            const city = data.name;
            const temp = data.main.temp;
            const description = data.weather[0].description;
            const information = {
                temp: Math.round(temp - 273.15),
                city: city,
                feelings: feelings,
                description: description,
                newDate: newDate,
            };
            postData(server + "/add", information);
            updateUI();
        }
    });
};

// Call generateInfoObject when clicking the button
Button.addEventListener("click", generateInfoObject);

//Get Web API Data
const WeatherData = async (zipKey) => {
    try {
        const res = await fetch(apiURL + zipKey + apiKey);
        const getData = await res.json();
        if (getData.cod != 200) {
            error.innerHTML = getData.message;
        }
        return getData;
    } catch (e) {
        console.log(e);
    }
};

//  POST data
const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });

    try {
        const Data = await res.json();
        return Data;
    } catch (e) {
        console.log(e);
    }
};

//Get project data and update UI

const updateUI = async () => {
    const res = await fetch(server + "/all");
    try {
        const Data = await res.json();
        city.innerHTML = Data.city;
        temp.innerHTML = Data.temp + "&deg" + "C";
        desc.innerHTML = Data.description;
        date.innerHTML = Data.newDate;
        content.innerHTML = Data.feelings;
    } catch (e) {
        console.log(e);
    }
};
