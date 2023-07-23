// Ваша задача написать приложение, показывающее погоду. 
// Для этого мы будем использовать возможности 2 сервисов:
// - https://open-meteo.com/ - 
// сервис присылает JSON с данными о погоде по заданной широте и долготе.
// - https://www.geojs.io/docs/v1/endpoints/geo/ 
// сервис умеет определять ваше местоположение и присылать координаты широты и долготы.
 
// Итак, вам нужно сделать следующее:
// 1.Получить данные вашей широты и долготы. 
// Для этого отправить запрос по адресу: https://get.geojs.io/v1/ip/geo.json .  
// Из полученного ответа взять поля: "latitude", "longitude", "city"

// 2.Из первого запроса взять значения: latitude, longitude 
// и подставить их в  строку запроса на сервер погоды, по следующему примеру:
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true

// 3.Из полученного ответа взять поля “temperature” , "windspeed", "weathercode". 
// Для последнего поля получить текстовое описание.
//  4. Отобразить полученные данные используя HTML\CSS. Можно использовать шрифты и картинки
//  5. Задеплоить проект на gitPages и написать readme 

let city;
let latitude;
let longitude;

fetch('https://get.geojs.io/v1/ip/geo.json')
.then(response => response.json())
.then(data => {
    latitude = data.latitude;
    longitude = data.longitude;
    city = data.city;
    const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true';
    return fetch(weatherUrl);
})
.then(response => response.json())
.then(weatherData => {
    const temperature = weatherData.current_weather.temperature;
    const windspeed = weatherData.current_weather.windspeed;
    const weathercode = weatherData.current_weather.weathercode.toString();
    const weatherDescription = getWeatherDescription(weathercode);
    displayWeatherData(city, temperature, windspeed, weatherDescription);
})
.catch(error => {
    console.log('Ошибка: ', error)
});

function getWeatherDescription(weathercode) {
    switch(weathercode) {
        case 'o' :
            return 'Clear sky';
            break;
        case '1' :
            return 'Mainly clear';
            break;
        case '2' :
            return 'Partly cloudy';
            break;
        case '3' :
            return 'Overcast';
            break;    
        case '45' :
            return 'Fog';
            break;   
        case '48' :
            return 'Depositing rime fog';
            break;   
        case '51' :
            return 'Drizzle: light';
            break;   
        case '53' :
            return 'Drizzle: moderate';
            break;   
        case '55' :
            return 'Drizzle: intensity';
            break;   
        case '56' :
            return 'Freezing Drizzle: light';
            break;   
        case '57' :
            return 'Freezing Drizzle: dense intensity';
            break;   
        case '61' :
            return 'Rain: slight';
            break;   
        case '63' :
            return 'Rain: moderate';
            break;   
        case '65' :
            return 'Rain: heavy intensity';
            break;   
        case '66' :
            return 'Freezing Rain: light';
            break; 
        case '67' :
            return 'Freezing Rain: heavy intensity';
            break; 
        case '71' :
            return 'Snow fall: slight';
            break; 
        case '73' :
            return 'Snow fall: moderate';
            break; 
        case '75' :
            return 'Snow fall: heavy intensity';
            break; 
        case '77' :
            return 'Snow grains';
            break; 
        case '80' :
            return 'Rain showers: slight';
            break; 
        case '81' :
            return 'Rain showers: moderate';
            break; 
        case '82' :
            return 'Rain showers: violent';
            break; 
        case '85' :
            return 'Snow showers slight';
            break; 
        case '86' :
            return 'Snow showers heavy';
            break; 
        case '95 *' :
            return 'Thunderstorm: Slight or moderate';
            break; 
        case '96 *' :
            return 'Thunderstorm with slight hail';
            break; 
        case '99 *' :
            return 'Thunderstorm with heavy hail';
            break;
        default :
        return `Sorry, we are out of data.`;
        break;
    }
}

function displayWeatherData(city, temperature, windspeed, weatherDescription) {
    const cityData = document.getElementById('city');
    const temperatureData = document.getElementById('temperature');
    const windspeedData = document.getElementById('windspeed');
    const weatherDescriptionData = document.getElementById('weatherDescription');

    cityData.textContent = city;
    temperatureData.textContent = temperature;
    windspeedData.textContent = windspeed;
    weatherDescriptionData.textContent = weatherDescription;
}