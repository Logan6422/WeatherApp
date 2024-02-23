let wallpaper;
let query = 'Santa Fe, Santa Fe';
function apis(){
    // URL de la API
    const apiUrl = 'https://api.weatherapi.com/v1';
    const apiNasaUrl = "https://api.nasa.gov/planetary/apod?api_key=";
    // Clave de API
    const apiKey = 'dd7b160280684a3b9cd05952242202';
    const apiKeyNasa = "XOuU942d64bKXImUyQtsuZfJtRGNpEVCCd78IkuV";

    //////////////////////parametros adicionales /////////////////////////////////////////////
    const q = query;
    const method = 'forecast.json';
    const days = 3;
    //////////////////////////////////////////////////////////////////////////////////////


    // Construir la URL de la solicitud con la clave de API
    const apiUrlWithApiKey = `${apiUrl}/${method}?key=${apiKey}&q=${q}&days=${days}&aqi=no&alerts=no`;
    const apiUrlNaswithApiKey = `${apiNasaUrl}${apiKeyNasa}`;
    // Realizar la solicitud a la API utilizando fetch()
    fetch(apiUrlWithApiKey)
        .then(response => {
            // Verificar si la solicitud fue exitosa (código de estado HTTP 200)
            if (response.ok) {
                // Convertir la respuesta a formato JSON
                return response.json();
            }
            // Si la solicitud no fue exitosa, lanzar un error
            throw new Error('La solicitud no fue exitosa');
        })
        .then(data => {
            // Hacer algo con los datos recibidos de la API
            
          cargarDatosClima(data);
        })
        .catch(error => {
            // Capturar y manejar cualquier error que ocurra durante la solicitud
            console.error('Error al obtener los datos:', error);
        });

    fetch(apiUrlNaswithApiKey)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            throw new Error('La solicitud no fue exitosa');
        })
        .then(data => {
            cargarWallpaper(data);
        })
        .catch(error => {
            console.log('Error al obtener los datos:', error);
        });

        
}

function cargarDatosClima(data){
    climaHoy(data);
    clima1(data);
    clima2(data);
}

function climaHoy(data){
    let climaIcon = document.querySelector('.clima-icon');
    let descripcionClima = document.querySelector('.descripcion-clima-hoy');
    let avrg_temp = document.querySelector('.avrg-temp');
    let avg_hum = document.querySelector('.avrg-hum');
    let chance_rain = document.querySelector('.chance-rain');
    let chance_snow = document.querySelector('.chance-snow');
    let max_wind = document.querySelector('.max-wind');

    climaIcon.src = `http:${data.forecast.forecastday[0].day.condition.icon}`;
    descripcionClima.innerHTML = `${data.forecast.forecastday[0].day.condition.text}`
    avrg_temp.innerHTML = `Temperature: ${data.forecast.forecastday[0].day.avgtemp_c}C / ${data.forecast.forecastday[0].day.avgtemp_f}F`;
    avg_hum.innerHTML = `Humidity: ${data.forecast.forecastday[0].day.avghumidity}%`;
    chance_rain.innerHTML = `Rain Chance: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    chance_snow.innerHTML = `Snow Chance: ${data.forecast.forecastday[0].day.daily_chance_of_snow}`;
    max_wind.innerHTML = `Max Wind Velocity: ${data.forecast.forecastday[0].day.maxwind_kph}kmh/${data.forecast.forecastday[0].day.maxwind_mph}mph`;
}

function clima1(data){
    let locationTitle = document.querySelector('.locationTitle');
    let descripcionClima = document.querySelector('.title1');
    let avrg_temp = document.querySelector('.avrg-temp1');
    let avg_hum = document.querySelector('.avrg-hum1');
    let chance_rain = document.querySelector('.chance-rain1');
    let chance_snow = document.querySelector('.chance-snow1');
    let max_wind = document.querySelector('.max-wind1');

    locationTitle.innerHTML = `${data.location.name}, ${data.location.country}`;
    descripcionClima.innerHTML = `${data.forecast.forecastday[1].date} WEATHER`
    avrg_temp.innerHTML = `Temperature: ${data.forecast.forecastday[1].day.avgtemp_c}C / ${data.forecast.forecastday[0].day.avgtemp_f}F`;
    avg_hum.innerHTML = `Humidity: ${data.forecast.forecastday[1].day.avghumidity}%`;
    chance_rain.innerHTML = `Rain Chance: ${data.forecast.forecastday[1].day.daily_chance_of_rain}%`;
    chance_snow.innerHTML = `Snow Chance: ${data.forecast.forecastday[1].day.daily_chance_of_snow}`;
    max_wind.innerHTML = `Max Wind Velocity: ${data.forecast.forecastday[1].day.maxwind_kph}kmh/${data.forecast.forecastday[0].day.maxwind_mph}mph`;
}

function clima2(data){

    let descripcionClima = document.querySelector('.title2');
    let avrg_temp = document.querySelector('.avrg-temp2');
    let avg_hum = document.querySelector('.avrg-hum2');
    let chance_rain = document.querySelector('.chance-rain2');
    let chance_snow = document.querySelector('.chance-snow2');
    let max_wind = document.querySelector('.max-wind2');

    descripcionClima.innerHTML = `${data.forecast.forecastday[2].date} WEATHER`
   
    avrg_temp.innerHTML = `Temperature: ${data.forecast.forecastday[2].day.avgtemp_c}C / ${data.forecast.forecastday[0].day.avgtemp_f}F`;
    avg_hum.innerHTML = `Humidity: ${data.forecast.forecastday[2].day.avghumidity}%`;
    chance_rain.innerHTML = `Rain Chance: ${data.forecast.forecastday[2].day.daily_chance_of_rain}%`;
    chance_snow.innerHTML = `Snow Chance: ${data.forecast.forecastday[2].day.daily_chance_of_snow}`;
    max_wind.innerHTML = `Max Wind Velocity: ${data.forecast.forecastday[2].day.maxwind_kph}kmh/${data.forecast.forecastday[0].day.maxwind_mph}mph`;
}

function cargarWallpaper(data){
    wallpaper = data.hdurl;
    let body = document.querySelector('.background');
    body.style.backgroundImage = `url('${wallpaper}')`;
}

function realizarBusqueda(){
    let input = document.getElementById('q');
    input.addEventListener('keypress',(e)=>{
        if(e.key === "Enter"){
            query = input.value; 
            apis(query);
        }
      
    })
    
   
}

apis()
realizarBusqueda();
