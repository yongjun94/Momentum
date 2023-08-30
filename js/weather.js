const API_KEY = "tokenKey";

function onGeoOK(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`위도 : ${lat}, 경도 : ${lon}`);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    console.log(url);
    fetch(url).then(Response => Response.json().then((data)=> {
        const city = document.querySelector("#weather span:nth-child(1)");
        const weather = document.querySelector("#weather span:nth-child(2)");
        city.innerText = data.name;
        weather.innerText = `날씨 : ${data.weather[0].main} / 온도 : ${data.main.temp}'C`;
    }));
}

function onGeoError() {
    alert("위치를 찾을 수 없습니다.")
}

navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);
