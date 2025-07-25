
// Integrating with a public weather API.

const apiKey = "d3b9ee137492d445c18ddb9c9354281a";
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityinput");
const weatherResult = document.getElementById("weatherresult");
const errorMessage = document.getElementById("errormsg");



// async function


// asynchronous JavaScript (Promises or async/await)

async function getWeather() {
    const city = cityInput.value.trim();
//error that checks if the city input is empty
    if (!city) {
        showError("Please enter a city name.");
        return;
    }
//async tells to await fetch the data from the API
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("City not found or API error.");
        }
        const data = await response.json();


        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        const cityName = data.name;


        weatherResult.innerHTML = `
            <h2>${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Weather: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <img src="${icon}" alt="Weather icon">
        `;
        errorMessage.textContent = "";
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorMessage.textContent = message;
    weatherResult.innerHTML = "";
}

// event on click buuton tag

getWeatherBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});
