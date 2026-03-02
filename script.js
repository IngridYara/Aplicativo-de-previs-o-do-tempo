const apiKey = window.ENV.API_KEY
const apiKey2 = window.ENV.API_KEY2

const menu1 = document.querySelector("#menu1")
const menu2 = document.getElementById("menu2")
const opcoes1 = document.getElementById("opcoes1")
const opcoes2 = document.getElementById("opcoes2")
const items = document.querySelectorAll(".item")
const items2 = document.querySelectorAll(".item2")

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const cityElement = document.getElementById("city")
const dayElement = document.getElementById("day")
const temperatureElement = document.getElementById("temperature")
const humidityElement = document.getElementById("humidity")
const windElement = document.getElementById("windElement")
const feelslike = document.getElementById("feelslike")
const iconTempo = document.getElementById("iconTempo")
const precepitationElement = document.getElementById("precepitationElement")
const divDias = document.getElementById("divDias")
const pHora = document.querySelectorAll(".hora")
const divHorarios = document.getElementById("horarios")

const dataAtual = new Date()
let tempHorariosDia = []

let imagens = ["icon-drizzle.webp", "icon-fog.webp", "icon-clouds.webp", "icon-partly-clouds.webp", "icon-rain.webp", 
    "icon-rain.webp", "icon-snow.webp", "icon-storm.webp", "icon-clear.webp"]

menu1.addEventListener("click", () => {

    menu1.classList.toggle("open")

    if (menu1.classList.contains("open")) {
        opcoes1.style.zIndex = 99
        
    }else{

        opcoes1.style.zIndex = -1
    }
})

menu2.addEventListener("click", () => {

    menu2.classList.toggle("open")

    if (menu2.classList.contains("open")) {
        opcoes2.style.zIndex = 99
        
    }else{

        opcoes2.style.zIndex = -1
    }
})

items.forEach((item => {

    item.addEventListener("click", () => {

        if (!(item.classList.contains("nochecked"))) {
            item.classList.toggle("checked")
        }   

        if (item.classList.contains("checked")) {

            let retiraChecked

            if (item.id == "celcius") {
                
                retiraChecked = document.getElementById("fahrenheit")
                retiraChecked.classList.remove("checked")

                converteTemperatura()
            }

            if (item.id == "fahrenheit") {
                
                retiraChecked = document.getElementById("celcius")
                retiraChecked.classList.remove("checked")

                converteTemperatura()
            }

            if (item.id == "km/h") {
                
                retiraChecked = document.getElementById("mph")
                retiraChecked.classList.remove("checked")

                converteVelocidade()
            }

            if (item.id == "mph") {
                
                retiraChecked = document.getElementById("km/h")
                retiraChecked.classList.remove("checked")

                converteVelocidade()
            }

            if (item.id == "mm") {
                
                retiraChecked = document.getElementById("in")
                retiraChecked.classList.remove("checked")

                converteComprimento()
            }

            if (item.id == "in") {
                
                retiraChecked = document.getElementById("mm")
                retiraChecked.classList.remove("checked")

                converteComprimento()
            }
        }
    }) 
}))

items2.forEach((item =>{

    item.addEventListener("click", () =>{

        items2.forEach((item2 => {

            if(item != item2){
                item2.classList.remove("checked")
            }
        }))

        showWeatherData(cityInput.value)
    })
}))

async function converteTemperatura(){

    let verificaChecked = document.getElementById("fahrenheit")
    const pTempMax = document.querySelectorAll(".tempMax")
    const pTempMin = document.querySelectorAll(".tempMin")
    const ptempHora = document.querySelectorAll(".tempHora")

    const data = await getWheatherData(cityInput.value)
    const data2 = await getOpenMeteoData2(data.coord.lon, data.coord.lat)

    if (verificaChecked.classList.contains("checked")) {  
        
        if (cityInput.value == "") {
            
            temperatureElement.innerText = "68°"
            feelslike.innerText = "64°"

            pTempMax.forEach(element => {
                element.innerText = "68°"
            });

            pTempMin.forEach(element => {
                element.innerText = "58°"
            });

            ptempHora.forEach(element =>{
                element.innerText = "20°"
            })

        }else{

            temperatureElement.innerText = Math.trunc((Number(data.main.temp) * (9/5)) + 32) + "°"
            feelslike.innerText = Math.trunc((Number(data.main.feels_like) * (9/5)) + 32) + "°"

            for (let i = 0; i < pTempMax.length; i++) {
               
                pTempMax[i].innerText = Math.trunc((Number(data2.daily.temperature_2m_max[i]) * (9/5)) + 32) + "°"
            }

            for (let i = 0; i < pTempMin.length; i++) {
               
                pTempMin[i].innerText = Math.trunc((Number(data2.daily.temperature_2m_min[i]) * (9/5)) + 32) + "°"
            }

            for (let i = 0; i < ptempHora.length; i++) {
                
                let tempNum = ptempHora[i].innerText.slice(0, -1)
                ptempHora[i].innerText = Math.trunc((Number(tempNum) * (9/5)) + 32) + "°"
            }
        }

    }else{

        if (cityInput.value == "") {
            
            temperatureElement.innerText = "20°"
            feelslike.innerText = "18°"

            pTempMax.forEach(element => {
                element.innerText = "20°"
            });

            pTempMin.forEach(element => {
                element.innerText = "12°"
            });

        }else{

            temperatureElement.innerText = Math.trunc(data.main.temp) + "°"
            feelslike.innerText = Math.trunc(data.main.feels_like) + "°"

            for (let i = 0; i < pTempMax.length; i++) {
               
                pTempMax[i].innerText = Math.trunc(Number(data2.daily.temperature_2m_max[i])) + "°"
            }

            for (let i = 0; i < pTempMin.length; i++) {
               
                pTempMin[i].innerText = Math.trunc(Number(data2.daily.temperature_2m_min[i])) + "°"
            }

            for (let i = 0; i < ptempHora.length; i++) {
                
                ptempHora[i].innerText = Math.trunc(Number(tempHorariosDia[[i]])) + "°"
            }
        }
    }
}

async function telaInicial() {
    
    let url = `https://ipinfo.io/json?token=${apiKey2}`

    let response = await fetch(url)
    let data = await response.json()

    await showWeatherData(data.city)
}

telaInicial()

async function converteVelocidade(){

    let verificaChecked = document.getElementById("mph")
    const data = await getWheatherData(cityInput.value)

    if (verificaChecked.classList.contains("checked")) {  
        
        if (cityInput.value == "") {
            
            windElement.innerText = "9 mph"

        }else{

            windElement.innerText = (Number(data.wind.speed) / 1.60934).toFixed(1) + " mph"
        }

    }else{

        if (cityInput.value == "") {
            
            windElement.innerText = "14 km/h"

        }else{

            windElement.innerText = (data.wind.speed).toFixed(1) + " km/h"
        }
    }
}

async function converteComprimento(){

    let verificaChecked = document.getElementById("in")
    const data = await getWheatherData(cityInput.value)

    console.log(data.coord.lon)

    const data2 = await getOpenMeteoData2(data.coord.lon, data.coord.lat)

    if (verificaChecked.classList.contains("checked")) {  
        
        if (cityInput.value == "") {
            
            precepitationElement.innerText = "0 in"

        }else{

            precepitationElement.innerText = (Number(data2.current.precipitation) / 25.4).toFixed(1) + " in"
        }

    }else{

        if (cityInput.value == "") {
            
            precepitationElement.innerText = "0 mm"

        }else{

            precepitationElement.innerText = Math.trunc(data2.current.precipitation).toFixed(1) + " mm"
        }
    }
}

const getWheatherData = async(city) =>{

    const apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`

    const res = await fetch(apiWheatherURL)
    const data = await res.json()

    console.log(data)
    return data
}

const getOpenMeteoData2 = async(lon, lat) =>{

    const apiOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code`

    const res = await fetch(apiOpenMeteo)
    const data = await res.json()

    console.log(data)

    return data
}

const showWeatherData = async (city) =>{

    const data = await getWheatherData(city)
    const data2 = await getOpenMeteoData2(data.coord.lon, data.coord.lat)

    const diasDaSemana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const nomeDia = diasDaSemana[dataAtual.getDay()];
    const dia = dataAtual.getDay()
    const mes = dataAtual.toLocaleDateString('en', { month: 'short' });
    const ano = dataAtual.getFullYear();

    const pais = new Intl.DisplayNames(['en'], { type: 'region' });
    
    cityElement.innerText = `${data.name}, ${pais.of(data.sys.country)}`
    temperatureElement.innerText = Math.trunc(data.main.temp) + "°"
    converteTemperatura()

    humidityElement.innerText = data.main.humidity + "%"
    windElement.innerText = (data.wind.speed).toFixed(1) + " km/h"
    converteVelocidade()

    feelslike.innerText = Math.trunc(data.main.feels_like) + "°"
    dayElement.innerText = `${nomeDia}, ${mes.charAt(0).toUpperCase() + mes.slice(1)} ${dia}, ${ano}`

    imagens.forEach(element => {
        
        const tempoAtual = data.weather[0].main
        const descricaoTempoAtual = data.weather[0].description

        if (element.includes(tempoAtual.toLowerCase())) {

            if (tempoAtual.toLowerCase().includes("clouds")) {

                if (descricaoTempoAtual.toLowerCase() == "few clouds" || descricaoTempoAtual.toLowerCase() == "scattered clouds") {
                    iconTempo.src = `assets/images/icon-partly-clouds.webp`
                
                }else{

                    iconTempo.src = `assets/images/icon-clouds.webp`
                }

            }else{

                iconTempo.src = `assets/images/${element}`
            }       
        }
    });

    precepitationElement.innerText = (data2.current.precipitation).toFixed(1) + " mm"

    let aux2 = ""
    let aux3 = ""
    let diaHorario
    let horario 

    for (let i = 0; i < data2.daily.time.length; i++) {
        
        let dataSemanal = data2.daily.time[i] + "T00:00:00"
        let aux = new Date(dataSemanal).toLocaleDateString('en', { weekday: 'short' })
        let imgDiaSemanal

        switch (data2.daily.weather_code[i]) {
            
            case 0:
                imgDiaSemanal = "icon-clear.webp"
                break;

            case 1: 
                imgDiaSemanal = "icon-partly-clouds.webp"
                break;

            case 2: case 3:
                imgDiaSemanal = "icon-clouds.webp"
                break;

            case 45: case 48:
                imgDiaSemanal = "icon-fog.webp"
                break;
                
            case 51: case 53: case 55: case 56: case 57:
                imgDiaSemanal = "icon-drizzle.webp"
                break;

            case 61: case 63: case 65: case 66: case 67:
                imgDiaSemanal = "icon-rain.webp"
                break;

            case 71: case 73: case 75: case 77: case 85: case 86:
                imgDiaSemanal = "icon-snow.webp"
                break;

            case 80: case 81: case 82: case 95: case 96: case 99:
                imgDiaSemanal = "icon-storm.webp"
                break;
        
            default:
                break;
        }

        aux2 += `<div class="dia">
                    <p>${aux.charAt(0).toUpperCase() + aux.slice(1)}</p>
                    <img src="./assets/images/${imgDiaSemanal}" alt="">
                    <div class="temperaturas">
                    <p class="tempMax">${Math.trunc(data2.daily.temperature_2m_max[i])}°</p>
                    <p class="tempMin">${Math.trunc(data2.daily.temperature_2m_min[i])}°</p>
                    </div>
                </div>`

        items2.forEach(element => {
        
            if (element.firstChild.id == aux && element.classList.contains("checked")) {

                diaHorario = dataSemanal
            }
        });
    }

    divDias.innerHTML = aux2

    if (diaHorario == undefined) {

        for (let i = 0; i < data2.daily.time.length; i++) {

            let dataSemanal = data2.daily.time[i] + "T00:00:00"
            let aux = new Date(dataSemanal).toLocaleDateString('en', { weekday: 'short' })
        
            if (aux == "Tue") {
                diaHorario = dataSemanal
            }
        }
    }

    diaHorario = diaHorario.split("T")[0]

    for (let i = 0; i < data2.hourly.time.length; i++) {
           
        if ((data2.hourly.time[i]).includes(diaHorario)) {

            horario = data2.hourly.time[i].split("T")[1]
            horario = horario.split(":")[0]

            pHora.forEach(element => {

                if (horario == (Number(element.innerText.split(" ")[0]) + 12)) {

                    let imgDiaHorario

                    switch (data2.hourly.weather_code[i]) {
                        
                        case 0:
                            imgDiaHorario = "icon-clear.webp"
                            break;

                        case 1: 
                            imgDiaHorario = "icon-partly-clouds.webp"
                            break;

                        case 2: case 3:
                            imgDiaHorario = "icon-clouds.webp"
                            break;

                        case 45: case 48:
                            imgDiaHorario = "icon-fog.webp"
                            break;
                            
                        case 51: case 53: case 55: case 56: case 57:
                            imgDiaHorario = "icon-drizzle.webp"
                            break;

                        case 61: case 63: case 65: case 66: case 67:
                            imgDiaHorario = "icon-rain.webp"
                            break;

                        case 71: case 73: case 75: case 77: case 85: case 86:
                            imgDiaHorario = "icon-snow.webp"
                            break;

                        case 80: case 81: case 82: case 95: case 96: case 99:
                            imgDiaHorario = "icon-storm.webp"
                            break;
                    
                        default:
                            break;
                    }

                    aux3 += `<div class="horario">
                                <div>
                                    <img src="./assets/images/${imgDiaHorario}" alt="">
                                    <p class="hora">${element.innerText}</p>
                                    
                                </div>
                                <p class="tempHora">${Math.trunc(data2.hourly.temperature_2m[i])}°</p>
                            </div>`

                    tempHorariosDia.push(Math.trunc(data2.hourly.temperature_2m[i]))
                } 
            });
        } 
    }

    divHorarios.innerHTML = aux3
    
}

searchBtn.addEventListener("click", (e) => {

    e.preventDefault()
    
    const city = cityInput.value
    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) =>{

    if (e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)
    }
})