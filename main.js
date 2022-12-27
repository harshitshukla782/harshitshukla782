let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchinput = document.getElementById("search-input");
const searchbutton = document.getElementById("search-button");

searchbutton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(searchinput.value);
    searchinput.value = '';
});

const getWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b4c0e49ed50cd074f75dbf894fa502f`, { mode: 'cors' });
        const weatherData = await response.json();
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];

        loc.textContent = name;
        debugger;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);

        if (id < 300 && id >= 200) {
            tempicon.setAttribute("src", "./icons/thunderstorm.png");
            climate.innerText = "Thunderstorm";
        }
        else if (id < 400 && id >= 300) {
            tempicon.setAttribute("src", "./icons/drizzle.png");
            climate.innerText = "Drizzle";
        }
        else if (id < 600 && id >= 500) {
            tempicon.setAttribute("src", "./icons/rain.png");
            climate.innerText = "Rain";
        }
        else if (id < 700 && id >= 600) {
            tempicon.setAttribute("src", "./icons/snow.png");
            climate.innerText = "Snow";
        }
        else if (id < 800 && id >= 700) {
            tempicon.setAttribute("src", "./icons/atmosphere.png");
            climate.innerText = "Atmosphere";
        }
        else if (id == 800) {
            tempicon.setAttribute("src", "./icons/clear.png");
            climate.innerText = "Clear";

        }
        else {
            tempicon.setAttribute("src", "./icons/clouds.png");
            climate.innerText = "Clouds";

        }
    }

    catch (err) {
        console.log(err);
        alert('city not found');
    }
}

window.addEventListener("load", () => {
    let long;
    let lat;
    // const proxy = "http://cors.herokuapp.com/";

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5b4c0e49ed50cd074f75dbf894fa502f`

            fetch(api).then((response) => {
                return response.json();
            })

                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);

                    if (id < 300 && id >= 200) {
                        tempicon.setAttribute("src", "./icons/thunderstorm.png");
                        climate.innerText = "Thunderstorm";
                    }
                    else if (id < 400 && id >= 300) {
                        tempicon.setAttribute("src", "./icons/drizzle.png");
                        climate.innerText = "Drizzle";
                    }
                    else if (id < 600 && id >= 500) {
                        tempicon.setAttribute("src", "./icons/rain.png");
                        climate.innerText = "Rain";

                    }
                    else if (id < 700 && id >= 600) {
                        tempicon.setAttribute("src", "./icons/snow.png");
                        climate.innerText = "Snow";
                    }
                    else if (id < 800 && id >= 700) {
                        tempicon.setAttribute("src", "./icons/atmosphere.png");
                        climate.innerText = "Atmosphere";
                    }
                    else if (id == 800) {
                        tempicon.setAttribute("src", "./icons/clear.png");
                        climate.innerText = "Clear";

                    }
                    else {
                        tempicon.setAttribute("src", "./icons/clouds.png");
                        climate.innerText = "Clouds";

                    }

                })

        })

    }
})

