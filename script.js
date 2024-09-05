let submit = document.getElementById("submit");
let city = document.getElementById("city");

submit.addEventListener("click", async ()=>{
    console.log(city.value);
    if(city.value == "") {
        alert("Enter the city");
        return;
    }
    let file = await fetch("weatherdata.html");
    let content = await file.text();
    let weatherFile = ""
    try {
        weatherFile = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=746ea7e0035361e7f0b9e383080eb095`);
    } catch (error) {
        console.log(error);
        alert("Can't get the details!!!")
    }
    
    let weatherData = await weatherFile.json();

    document.documentElement.innerHTML = content;

    console.log(city.value);
    let body = document.getElementsByTagName("body")[0];
    document.getElementById("cityName").innerHTML = city.value;
    document.getElementById("countryName").innerHTML = weatherData.sys.country;
    document.getElementById("description").innerHTML = weatherData.weather[0].main;
    document.getElementById("lat").innerHTML = weatherData.coord.lat;
    document.getElementById("lon").innerHTML = weatherData.coord.lon;
    document.querySelector(".visibility").innerHTML = weatherData.visibility/1000 + "Km";

    document.querySelector(".temp").innerHTML = Math.floor(weatherData.main.temp - 273.15) + "℃";
    let temp =  Math.floor(weatherData.main.temp - 273.15);
    document.querySelector(".temp2").innerHTML = Math.floor(weatherData.main.temp - 273.15) + "℃";
    document.querySelector(".tempMax").innerHTML =Math.floor(weatherData.main.temp_max - 273.15) + "℃";
    document.querySelector(".tempMin").innerHTML = Math.floor(weatherData.main.temp_min - 273.15) + "℃";
    document.querySelector(".tempFeel").innerHTML = Math.floor(weatherData.main.feels_like - 273.15) + "℃";

    document.querySelector(".windSpeed").innerHTML = weatherData.wind.speed + "m/s";
    document.querySelector(".windDeg").innerHTML = weatherData.wind.deg + "°";
    document.querySelector(".windGust").innerHTML = weatherData.wind.gust + "m/s";

    document.querySelector(".humidity").innerHTML = weatherData.main.humidity + "%";
    document.querySelector(".seaLevelPressure").innerHTML = weatherData.main.sea_level + "hPa";
    document.querySelector(".groundLevelPressure").innerHTML = weatherData.main.grnd_level + "hPa";

    if(weatherData.weather[0].main == "Rain"){
        body.classList = "rainy";
    }
    else if(weatherData.weather[0].main == "Snow"){
        body.classList = "cold";
    }
    else if(weatherData.weather[0].main == "Clouds"){
        body.classList = "cloudy";
    }
    else if(temp > 30){
        body.classList = "hot";
    }
    else if(temp < 25){
        body.classList = "cold";
    }
    else {
        body.classList = "cloudy";
    }
})