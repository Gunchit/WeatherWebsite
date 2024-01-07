// // URL
const api_url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`
const api_key = `3b269045cc57bd7814bf49a8023a3a50`

// // Selecting Componenets

const dataSection = document.querySelector(".section")
const databody = document.querySelector(".dataBody")
const submit = document.querySelector(".btn")
const inputField1 = document.querySelector(".inputField")
const errorBlock = document.querySelector(".error")
const weatherImage = document.querySelector(".weatherImg")

// Fetching Data

const fetchData = async (val) => {
  const resp = await fetch(api_url + `${val}` + `&appid=${api_key}`)
  displayData(resp.status)
  const data = await resp.json()
  showval(data)
}

// Function of App

function reset() {
  errorBlock.style.display = "none"
  databody.classList.remove("show-data")
  dataSection.classList.remove("data")
}
function getInput() {
  reset()
  let val = inputField1.value
  //   if (val == "Error") {
  //     console.log("Error")
  //     displayData("Error")
  //   } else {
  //     displayData("No Error")
  //   }
  fetchData(val)
  inputField1.value = ""
}

function displayData(status) {
  if (status == 404) {
    dataSection.classList.add("Error")
    errorBlock.style.display = "flex"
  } else {
    errorBlock.style.display = "none"
    dataSection.classList.add("data")
    databody.classList.add("show-data")
  }
}

function showval(data) {
  console.log(data)
  document.querySelector(".city").textContent = data.name
  document.querySelector("#humid").textContent = `${data.main.humidity}%`
  document.querySelector("#wind").textContent = `${data.wind.speed}km/h`
  document.querySelector(".temprature").textContent = `${Math.round(
    data.main.temp
  )}°C`
  const weather = data.weather[0].main

  if (weather == "Clouds") {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/cloud.png"
  } else if (weather == "Clear") {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/clear.png"
  } else if (weather == "Rain") {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/rain.png"
  } else if (weather == "Mist") {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/Mist.png"
  } else if (weather == "Snow") {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/Snow.png"
  } else {
    weatherImage.src = "/WeatherWebsite/Assets(Images)/Snow.png"
  }
}

submit.addEventListener("click", getInput)
