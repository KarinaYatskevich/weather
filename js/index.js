function getRealTime(){
    var date = new Date()
    var minutes=date.getMinutes();
    var hours=date.getHours();

    var time = `${hours}:${minutes}`;
    return time
}   
function updateClockTextElement(time){
    var element = document.getElementById("time")
    element.innerHTML = time;
}
function updateTime(){
    var time = getRealTime();
    updateClockTextElement(time);    
}

function getRealDay(){
    var date = new Date();
    document.getElementById("day").innerHTML = date.toLocaleDateString('en-US', { weekday: 'long' });
}

function getRealMonth(){
    var date = new Date();
    document.getElementById("month").innerHTML = date.toLocaleDateString('en-us', { day:"numeric", month:"long" });
}




updateTime();
getRealDay();
getRealMonth();
window.setInterval(updateTime,1000);
window.setInterval(getRealDay, 1000);
window.setInterval(getRealMonth, 1000);





// Openweathermap API. Do not share it publicly.
const api = '6099b6337fe1f59ff85e7fbb40459164'; //Replace with your API

const weatherCart = document.querySelector(".weather_cart");
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const desc = document.querySelector('.desc');


function ll(){
    const weatherCart = document.querySelector(".weather_cart");
    if (desc == "snow"){
        weatherCart.addClass('snow');
    } else if (desc == "rain"){
        weatherCart.addClass('rain');
    } else if (desc == "overcast clouds"){
        weatherCart.addClass('clouds');
    };
};

ll()


window.addEventListener('load', () => {
    let long;
    let lat;
    // Accesing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

        // Using fetch to get data
        fetch(base)
            .then((response) => {
            return response.json();
            })
            .then((data) => {
            const { temp } = data.main;
            const place = data.name;
            const { description, icon } = data.weather[0];

            const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            // Interacting with DOM to show data
            iconImg.src = iconUrl;
            loc.textContent = `${place}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${temp} °C`;
            });
        });
    }
});


