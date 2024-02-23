// URL de la API
const apiUrl = 'http://api.weatherapi.com/v1';
// Clave de API
const apiKey = 'dd7b160280684a3b9cd05952242202';

//////////////////////parametros adicionales /////////////////////////////////////////////
const q = 'San Javier, Santa Fe';
const method = 'forecast.json';
const days = 3;
//////////////////////////////////////////////////////////////////////////////////////


// Construir la URL de la solicitud con la clave de API
const apiUrlWithApiKey = `${apiUrl}/${method}?key=${apiKey}&q=${q}&days=${days}&aqi=no&alerts=no`;

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
        console.log(data);
    })
    .catch(error => {
        // Capturar y manejar cualquier error que ocurra durante la solicitud
        console.error('Error al obtener los datos:', error);
    });