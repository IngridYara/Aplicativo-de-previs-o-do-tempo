const apiKey = window.ENV.API_KEY
const apiKey2 = window.ENV.API_KEY2

const conteudo = document.getElementById("conteudo")
const secao2 = document.querySelector(".secao2")
const aside = document.getElementById("aside")
const menu1 = document.querySelector("#menu1")
const menu2 = document.getElementById("menu2")
const opcoes1 = document.getElementById("opcoes1")
const opcoes2 = document.getElementById("opcoes2")
const items = document.querySelectorAll(".item")
const items2 = document.querySelectorAll(".item2")
const nomeSelecionado = document.getElementById("nomeSelecionado")
const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")

const divDias = document.getElementById("divDias")
const pHora = document.querySelectorAll(".hora")
const divHorarios = document.getElementById("horarios")

const dataAtual = new Date()
let tempHorariosDia = []
let celciusAtivo = 1
let fahrenheitAtivo = 0
let mphAtivo = 0
let kmhAtivo = 1
let inAtivo = 0
let mmAtivo = 1

let citys = [

    "Contagem",
    "Belo Horizonte",
    "Recife",
    "Tokyo",
    "São Paulo",
    "Rio de Janeiro",
    "Manaus"
]

let sortedCitys = citys.sort()

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

menu2.addEventListener("click", (e) => {

    menu2.classList.toggle("open")

    if (menu2.classList.contains("open")) {
        opcoes2.style.zIndex = 99
        
    }else{

        opcoes2.style.zIndex = -1
    }
})

items.forEach((item => {

    item.addEventListener("click", () => {

        let retiraChecked

        if (item.id == "celcius") {
            
            retiraChecked = document.getElementById("fahrenheit")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")
            converteTemperatura()
        }

        if (item.id == "fahrenheit") {
            
            retiraChecked = document.getElementById("celcius")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")

            converteTemperatura()
        }

        if (item.id == "km/h") {
            
            retiraChecked = document.getElementById("mph")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")
            converteVelocidade()
        }

        if (item.id == "mph") {
            
            retiraChecked = document.getElementById("km/h")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")
            converteVelocidade()
        }

        if (item.id == "mm") {
            
            retiraChecked = document.getElementById("in")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")
            converteComprimento()
        }

        if (item.id == "in") {
            
            retiraChecked = document.getElementById("mm")
            retiraChecked.classList.remove("checked")
            item.classList.add("checked")
            converteComprimento()
        }
    }) 
}))

items2.forEach((item =>{

    
    item.addEventListener("click", () =>{

        item.classList.toggle("checked")
        
        items2.forEach((item2 => {

            if(item != item2){
                item2.classList.remove("checked")
            }
        }))

        if (item.classList.contains("checked")) {
            nomeSelecionado.innerText = item.innerText
            
        }else{
            nomeSelecionado.innerText = "Tuesday"
        }

        if(cityInput.value){
            
            showWeatherData(cityInput.value)
            converteTemperatura()
        }
        else
            telaInicial()
    })

}))

async function converteTemperatura(){

    let verificaChecked = document.getElementById("fahrenheit")
    const temperatureElement = document.getElementById("temperature")
    const pTempMax = document.querySelectorAll(".tempMax")
    const pTempMin = document.querySelectorAll(".tempMin")
    const ptempHora = document.querySelectorAll(".tempHora")

    const data = await getWheatherData(cityInput.value)
    let data2 = ""

    if(data != 400 && data != 404)
        data2 = await getOpenMeteoData2(data.coord.lon, data.coord.lat)

    if (verificaChecked.classList.contains("checked")) {  
        
        if (cityInput.value == "" && fahrenheitAtivo != 1) {
            
            temperatureElement.innerText = Math.trunc((Number(temperatureElement.innerText.slice(0, -1)) * (9/5)) + 32) + "°"
            feelslike.innerText = Math.trunc((Number(feelslike.innerText.slice(0, -1)) * (9/5)) + 32) + "°"

            pTempMax.forEach(element => {
                element.innerText = Math.trunc((Number(element.innerText.slice(0, -1)) * (9/5)) + 32) + "°"
            });

            pTempMin.forEach(element => {
                element.innerText = Math.trunc((Number(element.innerText.slice(0, -1)) * (9/5)) + 32) + "°"
            });

            ptempHora.forEach(element =>{
                element.innerText = Math.trunc((Number(element.innerText.slice(0, -1)) * (9/5)) + 32) + "°"
            })

        }else if (fahrenheitAtivo != 1){

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

        fahrenheitAtivo = 1
        celciusAtivo = 0

    }else{

        if (cityInput.value == "" && celciusAtivo != 1) {
            
            temperatureElement.innerText = Math.trunc(Number(temperatureElement.innerText.slice(0, -1) - 32) * 5/9) + "°"
            feelslike.innerText = Math.trunc(Number(feelslike.innerText.slice(0, -1) - 32) * 5/9) + "°"

            pTempMax.forEach(element => {
                element.innerText = Math.trunc(Number(element.innerText.slice(0, -1) - 32) * 5/9) + "°"
            });

            pTempMin.forEach(element => {
                element.innerText = Math.trunc(Number(element.innerText.slice(0, -1) - 32) * 5/9) + "°"
            });

            ptempHora.forEach(element => {
                element.innerText = Math.trunc(Number(element.innerText.slice(0, -1) - 32) * 5/9) + "°"
            });

        }else if (celciusAtivo != 1){

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

        celciusAtivo = 1
        fahrenheitAtivo = 0
    }
}

async function converteVelocidade(){

    let verificaChecked = document.getElementById("mph")
    const data = await getWheatherData(cityInput.value)

    if (verificaChecked.classList.contains("checked")) {  

        if (cityInput.value == "" && mphAtivo != 1) {
            
            windElement.innerText = (Number(windElement.innerText.split(" ")[0]) / 1.60934).toFixed(1) + " mph"

        }else if(mphAtivo != 1){

            windElement.innerText = (Number(data.wind.speed) / 1.60934).toFixed(1) + " mph"
        }

        mphAtivo = 1
        kmhAtivo = 0

    }else{

        if (cityInput.value == "" && kmhAtivo != 1) {
            
            windElement.innerText = (Number(windElement.innerText.split(" ")[0]) * 1.60934).toFixed(1) + " mph"

        }else if(kmhAtivo != 1){

            windElement.innerText = (data.wind.speed).toFixed(1) + " km/h"
        }

        mphAtivo = 0
        kmhAtivo = 1
    }
}

async function converteComprimento(){

    let verificaChecked = document.getElementById("in")
    const data = await getWheatherData(cityInput.value)
    let data2 = ""

    if(data != 400 && data != 404)
        data2 = await getOpenMeteoData2(data.coord.lon, data.coord.lat)

    if (verificaChecked.classList.contains("checked")) {  
        
        if (cityInput.value == "" && inAtivo != 1) {
            
            precepitationElement.innerText = (Number(precepitationElement.innerText.split(" ")[0]) / 25.4).toFixed(1) + " in"

        }else if (inAtivo != 1){

            precepitationElement.innerText = (Number(data2.current.precipitation) / 25.4).toFixed(1) + " in"
        }

        inAtivo = 1
        mmAtivo = 0

    }else{

        if (cityInput.value == "" && mmAtivo != 1) {
            
            precepitationElement.innerText = (Number(precepitationElement.innerText.split(" ")[0]) * 25.4).toFixed(1) + " mm"

        }else if (mmAtivo != 1){

            precepitationElement.innerText = Math.trunc(data2.current.precipitation).toFixed(1) + " mm"
        }

        inAtivo = 0
        mmAtivo = 1
    }
}

async function telaInicial() {
    
    let url = `https://ipinfo.io/json?token=${apiKey2}`
    let mainErro = document.getElementsByClassName("main-erro")

    try {
        
        let response = await fetch(url)
        let data = await response.json()

        await showWeatherData(data.city)

    } catch (error) {   
        
        if(mainErro[0] == undefined)
            apiErro()

        else{

            mainErro.remove()
            apiErro()
        }
    }
}

telaInicial()

function apiErro() {
    
    let body = document.getElementsByTagName("body")
    let main = document.getElementById("conteudo")
    main.style.display = "none"

    let mainErro = document.createElement("main")
    mainErro.classList.add("main-erro")
    mainErro.innerHTML = `<img class="img-erro" src='./assets/images/icon-error.svg'>
                          <h1 class="titulo-erro">Something went wrong</h1>
                          <p class="texto-erro">We couldn't connect to the server (API error). Please
                          try again in a few moments.</p>
                          <button class="button-erro" onclick="telaInicial()">
                            <img src="./assets/images/icon-retry.svg" alt=""> Retry
                          </button>`

    body[0].appendChild(mainErro)
}

const getWheatherData = async(city) =>{

    let mainErro = document.getElementsByClassName("main-erro")

    const apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=en`

    const res = await fetch(apiWheatherURL)
    const data = await res.json()

    if (data.cod == 200) {
        
        return data

    }else if (data.cod == 400 || data.cod == 404){

        return data.cod

    }else{

        if(mainErro[0] == undefined)
            apiErro()

        else{

            mainErro.remove()
            apiErro()
        }
    }
}

const getOpenMeteoData2 = async(lon, lat) =>{

    let mainErro = document.getElementsByClassName("main-erro")

    if (lon != "") {

        const apiOpenMeteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,apparent_temperature,is_day,precipitation,weather_code`

        const res = await fetch(apiOpenMeteo)
        const data = await res.json()
        
        return data

    }else{

          if(mainErro[0] == undefined)
            apiErro()

        else{

            mainErro.remove()
            apiErro()
        }
    }

    return ""
    
}

const showWeatherData = async (city) =>{

    const cityElement = document.getElementById("city")
    const dayElement = document.getElementById("day")
    const temperatureElement = document.getElementById("temperature")
    const humidityElement = document.getElementById("humidity")
    const windElement = document.getElementById("windElement")
    const feelslike = document.getElementById("feelslike")
    const iconTempo = document.getElementById("iconTempo")
    const precepitationElement = document.getElementById("precepitationElement")

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

    humidityElement.innerText = data.main.humidity + "%"
    windElement.innerText = (data.wind.speed).toFixed(1) + " km/h"

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

function createSkeletonSection2() {
    
    let aux 
    
    aux = `<div id="skeleton"> 
    
                <div class="skeleton skeleton-dots">
                    <p>Loading</p>

                    <div class="dots">`
    
    for (let i = 0; i < 15; i++) {
        
        aux += `<span style="--i:${i};"></span>`
    }
    
        aux += `    </div>
                </div>
                
                <div class="skeleton-cards">
                    <div class="skeleton skeleton-card">
                        <p>Feels Like</p>
                        <p>-</p>
                    </div>
                    <div class="skeleton skeleton-card">
                        <p>Humidity</p>
                        <p>-</p>
                    </div>
                    <div class="skeleton skeleton-card">
                        <p>Wind</p>
                        <p>-</p>
                    </div>
                    <div class="skeleton skeleton-card">
                        <p>Precepitation</p>
                        <p>-</p>
                    </div>
                </div>

                <p class="text-skeleton">Daily forecast</p>

                <div class="skeleton-cards2">
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                    <div class="skeleton skeleton-card2">
                    </div>
                </div>
            </div>
        
            `

    return aux
}

function createSkeletonAside() {
    
    return `
    
                <p>Hourly forecast</p>
                
                        <div class="container">
                            <div class="select-btn" id="menu2">

                                <span class="btn-text">-</span>
                                <span class="arrow-dwn">
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                            </div>
                        </div>
            
                <div class="skeleton-cards3">
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                    <div class="skeleton skeleton-card3"></div>
                </div>
           `

}

function loadData() {
    
    const conteudo = document.getElementById("conteudo")
    const articleSketch = document.createElement("section")
    const asideSketch = document.createElement("aside")

    articleSketch.classList.add("espacamentoSection")
    articleSketch.innerHTML += createSkeletonSection2() 
    asideSketch.innerHTML += createSkeletonAside()

    secao2.style.display = "none"
    aside.style.display = "none"
    
    conteudo.appendChild(articleSketch)
    conteudo.appendChild(asideSketch)

    showWeatherData(cityInput.value)

    setTimeout(() =>{
        
        const secao2 = document.querySelector(".secao2")
        const aside = document.getElementById("aside")

        secao2.style.display = "block"
        aside.style.display = "flex"

        if(articleSketch)
            articleSketch.remove()

        if(asideSketch)
            asideSketch.remove()

        

    }, 2000)
}

async function cidadeNaoEncontrada() {

    let aux = await getWheatherData(cityInput.value)

    if (cityInput.value && aux != 400 && aux != 404) {

        loadData()

    }else{

        secao2.style.display = "none"
        aside.style.display = "none"

        const sectionErroFound = document.createElement("section")
        sectionErroFound.classList.add("section-erro-found")
        sectionErroFound.innerHTML = "<p class='erro-found'>No search result found!</p>"

        conteudo.appendChild(sectionErroFound)
    }
}

searchBtn.addEventListener("click", (e) => {

    e.preventDefault()

    const sectionErroFound = document.querySelector(".section-erro-found")

    if(sectionErroFound)
        sectionErroFound.remove()
    cidadeNaoEncontrada()

    removeElements()

    let items = document.querySelectorAll(".list-items2")

    if (items[0] == undefined){

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "0px"

    }else{

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "10px"
    }
        
})

cityInput.addEventListener("keyup", (e) =>{

    removeElements()

    for(let i of sortedCitys){

        if(i.toLocaleLowerCase().startsWith(cityInput.value.toLowerCase()) && cityInput.value != ""){

            let listItem = document.createElement("li")

            listItem.classList.add("list-items2")
            listItem.style.cursor = "pointer"
            listItem.setAttribute("onclick", "displayCity('" + i + "')")
        
            let word = "<span class='city-bold'>" + i.substr(0, cityInput.value.length) + "</span>"
            
            word += i.substr(cityInput.value.length)

            listItem.innerHTML = word
            document.querySelector(".list-city").appendChild(listItem)
        }
    }

    let items = document.querySelectorAll(".list-items2")

    if (items[0] == undefined){

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "0px"

    }else{

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "10px"
    }
        
    if (e.code === "Enter") {

        removeElements()

        let items = document.querySelectorAll(".list-items2")

        if (items[0] == undefined){

            let ulCity = document.querySelector(".list-city")
            ulCity.style.padding = "0px"

        }else{

            let ulCity = document.querySelector(".list-city")
            ulCity.style.padding = "10px"
        }

        const sectionErroFound = document.querySelector(".section-erro-found")

        if(sectionErroFound)
            sectionErroFound.remove()
        cidadeNaoEncontrada()
    }
})

function displayCity(value) {
    
    cityInput.value = value
    removeElements()

    let items = document.querySelectorAll(".list-items2")

    if (items[0] == undefined){

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "0px"

    }else{

        let ulCity = document.querySelector(".list-city")
        ulCity.style.padding = "10px"
    }
}

function removeElements() {
    
    let items = document.querySelectorAll(".list-items2")

    items.forEach((item) => {

        item.remove()
    })   
}