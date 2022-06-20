
const userInput = document.querySelector('#user-input');
const search = document.querySelector('#btn-search');
const cityName = (city) => {    
    
}


 // getting the longitude and latitude using mapbox API
async function getLocation(query){
    const response = await fetch(query)
    const data = await response.json();
    const longitude = data.features[0].center[0];
    const latitude = data.features[0].center[1];

    
    return {
        longitude,
        latitude,
        location: data.features[0].place_name
    }
}


// getting the weather info using weatherstack API
async function getWeather(latitude,longitude){
    const url = `https://api.weatherapi.com/v1/current.json?key=c214ea6f8a0040a98d4113420220306&q=${latitude},${longitude}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.current;
   

}


search.addEventListener('click', (e) => {

   
    e.preventDefault();
    
    const query = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + userInput.value + ".json?access_token=pk.eyJ1IjoicmFnaGF2MDExMCIsImEiOiJjbDNzMXh6OXYxbWtkM2NwZWVubWMxZzliIn0.t-Ynx1fjinTKE7r-FZjmLQ"
   
    getLocation(query).then(data => {
        const {longitude,latitude,location} = data;
        getWeather(latitude,longitude).then(current => {
            updateUI({current,location});
        })
    });

   
})

const updateUI = (data) => {
    

    const {current,location} = data;
    console.log(current);

    const cityName = document.querySelector('#city-name');
    cityName.innerHTML = location;

    const temperature = document.querySelector('#temp');
    temperature.innerHTML = current.temp_c + '&deg; C';

    const weatherDesc = document.querySelector('#weather-desc');
    weatherDesc.innerHTML = `<p> ${current.condition.text}</p>`;

    const feelsLike = document.querySelector('#feels-like');
    feelsLike.innerHTML = "Feels Like "+ current.feelslike_c + '&deg; C';

    
    const icon = document.querySelector('#icon');
    icon.setAttribute('src', current.condition.icon);
    

    // console.log(data.c);
}