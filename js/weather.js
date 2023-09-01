const API_KEY = "12fa9bd8cdbe305e2c98b0896ec39228";
const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather?";

const weather = document.querySelector(".weather .weather_text");

function getWeather(coords) {
    fetch(`${WEATHER_API}lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(json => {
        const name = json.name;
        const temperature = json.main.temp;
        weather.innerHTML = `${Math.floor(temperature)}° @ ${name}`;
    });
}

function handleGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const coords = {
        lat,
        lon
    };
    localStorage.setItem("coords", JSON.stringify(coords));
    getWeather(coords);
}

function handleGeoFail() {
    console.log("위치를 찾을 수 없습니다.")
}

function loadWeather() {
    const currentCoords = localStorage.getItem("coords");
    if (currentCoords !== null) {
        const parseCoords = JSON.parse(currentCoords);
        getWeather(parseCoords);
        return;
    } else {
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoFail);
    }
}

function init() {
    loadWeather();
}

init();
