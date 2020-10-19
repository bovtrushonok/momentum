class Momentum {
    constructor () {
        this.time = '';
        this.day = '';
        this.greeting =  '';
        this.name = '';
        this.focus = '';
    }

    getTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let sec = now.getSeconds();
        if(sec < 10) sec= '0' + sec;
        if(minutes < 10) minutes= '0' + minutes;
        this.time = `${hours}:${minutes}:${sec}`;
        time.textContent = this.time;
        setInterval (this.getTime, 1000); 
    }

    getDay() {
        let now = new Date();
        let weekDay = function() {
            switch(now.getDay()) {
                case 0:
                    return "Воскресенье";
                break;
                case 1:
                    return "Понедельник";
                break;
                case 2:
                    return "Вторник";
                break;
                case 3:
                    return "Среда";
                break;
                case 4:
                    return "Четверг";
                break;
                case 5:
                    return "Пятница";
                break;
                case 6:
                    return "Суббота";
                break;
                default:
                    return "Здесь всегда воскресенье";
                break;
            };
        }();

        let month = function() {
            switch(now.getMonth()) {
                case 0:
                    return "января";
                break;
                case 1:
                    return "февраля";
                break;
                case 2:
                    return "марта";
                break;
                case 3:
                    return "апреля";
                break;
                case 4:
                    return "мая";
                break;
                case 5:
                    return "июня";
                break;
                case 6:
                    return "июля";
                break;
                case 7:
                    return "августа";
                break;
                case 8:
                    return "сентября";
                break;
                case 9:
                    return "октября";
                break;
                case 10:
                    return "ноября";
                break;
                case 11:
                    return "декабря";
                break;
               
                default:
                    return "Здесь всегда июль";
                break;
            };
        }();

        let date = now.getDate();
        this.day = `${weekDay}, ${date} ${month}`;
        day.textContent = this.day;
        setInterval (this.getDay, 1000); 
    }

    setGreeting() {
        let now = new Date();
        let hours = now.getHours();
        if(hours < 12) this.greeting = 'Доброе утро,';
        else if (hours < 18) this.greeting = 'Добрый день,';
        else this.greeting = 'Добрый вечер,';

        greeting.textContent = this.greeting;
    }

    getName() {
        if(localStorage.getItem('name')) name.textContent = localStorage.getItem('name');
        else name.textContent = '[Enter Name]';
    }

    setName(e) {
        if( (e.type === 'keydown' && e.keyCode == 13) || e.type === 'blur') {
            localStorage.setItem('name', e.target.innerText);
            name.blur();
        }
    }

    getFocus() {
        if(localStorage.getItem('focus')) focus.textContent = localStorage.getItem('focus');
        else focus.textContent = '[Enter Plan]';
    }

    setFocus(e) {
        if( (e.type === 'keydown' && e.keyCode == 13) || e.type === 'blur') {
            localStorage.setItem('focus', e.target.innerText);
            focus.blur();
        }
    }

    async getQuote() {  
        const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
        const res = await fetch(url);
        const data = await res.json(); 
        phrase.textContent = data.quoteText;
        phraseAuthor.textContent = data.quoteAuthor;
    }

    async getWeather() {  
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=88029370652b5b8a53deaeebff191a8e&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        let roundedTemp = Math.round(data.main.temp)
        temperature.textContent = `${roundedTemp}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed}m/s`;
        //weatherDescription.textContent = data.weather[0].description;
    }

    

    init() {
        this.getTime();
        this.getDay();
        this.setGreeting();
        this.getName();
        this.getFocus();
        this.getWeather();
    }

};

//get DOM elements

const time = document.querySelector('.time');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const phrase = document.querySelector('.phrase');
const phraseAuthor = document.querySelector('.phraseAuthor');
const phraseChangeBtn = document.querySelector('.phraseChangeBtn');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');



const momentum = new Momentum();
momentum.init();

name.addEventListener('blur', momentum.setName);
name.addEventListener('keydown', momentum.setName);

focus.addEventListener('blur', momentum.setFocus);
focus.addEventListener('keydown', momentum.setFocus);

document.addEventListener('DOMContentLoaded', momentum.getQuote);
phraseChangeBtn.addEventListener('click', momentum.getQuote);

document.addEventListener('DOMContentLoaded', momentum.getWeather);
city.addEventListener('blur', momentum.getWeather);
city.addEventListener('keydown', (e) => {
    if (e.keyCode == 13) {
        city.blur();
        momentum.getWeather;
    }
});

