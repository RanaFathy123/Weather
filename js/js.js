// Define Variables
const cityInput = document.querySelector("input");
// console.log("🚀 ~ cityInput:", cityInput)
const showBtn = document.querySelector("button");
// console.log("🚀 ~ showBtn:", showBtn)
const weatherDetails = document.querySelector(".weather-details");
// console.log("🚀 ~ weatherDetails:", weatherDetails)
const temperture = document.querySelector(".temperture");
// console.log("🚀 ~ temperture:", temperture)
const wind = document.querySelector(".wind");
// console.log("🚀 ~ wind:", wind)
const humidity = document.querySelector(".humidity");
// console.log("🚀 ~ humidity:", humidity)
const pressure = document.querySelector(".pressure");
// console.log("🚀 ~ pressure:", pressure)
const country = document.querySelector(".country");
const time = document.querySelector(".time");


showBtn.addEventListener("click", async () => {
  if (cityInput.value == "") {
    weatherDetails.innerHTML = `
      <p class="validation text-danger mt-3 fw-bold">Please Enter City Name</p>
      `;
      temperture.innerHTML = "";
      wind.innerHTML = "";
      humidity.innerHTML = "";
      pressure.innerHTML = "";
      country.innerHTML = "";
      time.innerHTML = "";
  }else{
    try {
      const promData = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=f2e43b7b1d15dbb13299ef7d49523466`
      );
      console.log(promData);
      const res = await promData.json();
      console.log(res);
      let weatherData = res.weather;
      //   console.log(weatherData);
      let tempData = res.main.temp;
      console.log(tempData);
      temperture.innerHTML = `${Math.ceil(tempData)}°`;
      let windSpeed = res.wind.speed;
      console.log(windSpeed);
      wind.innerHTML = windSpeed;
      let humidityData = res.main.humidity;
      console.log(humidityData);
      humidity.innerHTML = humidityData;
      let pressureData = res.main.pressure;
      console.log(pressureData);
      pressure.innerHTML = pressureData;
      weatherData.map((main) => {
        let weatherDetailsUi = `
         <img src =${
           main.main == "Clear"
             ? "images/sun.png"
             : main.main == "Clouds"
             ? "images/clouds.png"
             : "images/rainy.png"
         } />
          <h1 class="text-center">${main.main}</h1> `;
        weatherDetails.innerHTML = weatherDetailsUi;
      });
      const longtiude = res.coord.lon;
      const latitude = res.coord.lat;
      const promtime = await fetch(
        `https://api.timezonedb.com/v2.1/get-time-zone?key=51ZGXY087FNY&format=json&by=position&lat=${latitude}&lng=${longtiude}`
      );
      console.log(promtime);
      const resTime = await promtime.json();
      console.log(resTime);
      country.innerHTML = `${resTime.cityName} / ${resTime.countryName}`;
      time.innerHTML = `Time : ${resTime.formatted}`;
    } catch (err) {
      console.log(err);
      weatherDetails.innerHTML = `
      <p class="validation text-danger mt-3 fw-bold">Please Enter valid city</p>
      `;
      temperture.innerHTML = "";
      wind.innerHTML = "";
      humidity.innerHTML = "";
      pressure.innerHTML = "";
      country.innerHTML = "";
      time.innerHTML = "";
    }
  }

  
});
