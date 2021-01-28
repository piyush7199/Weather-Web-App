// b7c52b26b3cc90b44bf9919ae6089fb5
// "https://api.openweathermap.org/data/2.5/weather?q=Kolkata&appid=b7c52b26b3cc90b44bf9919ae6089fb5&units=metric"

const apiurl = {
    apiid: "b7c52b26b3cc90b44bf9919ae6089fb5",
    baseurl: "https://api.openweathermap.org/data/2.5/weather?"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getRes(searchbox.value);
   }
}

function getRes(query){
    fetch(`${apiurl.baseurl}q=${query}&units=metric&APPID=${apiurl.apiid}`)
    .then(weather =>{
        if(weather.status == 200){
            return weather.json();
        }
        else{
            return undefined
        }
    }).then(displayRes)
}

function displayRes(weather){
    if(weather != undefined){

    document.querySelector(".notfound").style.display = "none";

    let city = document.querySelector('.location .city');
    city.innerHTML= `${weather.name},${weather.sys.country}`;

    let today = new Date();
    let date = document.querySelector('.location .data');
    date.innerHTML = getDayRes(today);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_ele = document.querySelector('.current .weather');
    weather_ele.innerHTML = weather.weather[0].main;

    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML = `Humidity: ${weather.main.humidity}%`
    }
    else{
        document.querySelector(".notfound").style.display = "block";
    }

}

function getDayRes(today){
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    let day = days[today.getDay()];
    let date = today.getDate();
    let mon = months[today.getMonth()];
    let year = today.getFullYear();

    return `${day} ${date} ${mon} ${year}`

}